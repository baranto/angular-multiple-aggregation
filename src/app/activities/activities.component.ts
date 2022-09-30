import {ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { groupBy, pick, isEmpty} from 'lodash';
import {Observable} from "rxjs";
import {map, tap} from 'rxjs/operators';
import { FieldType } from './enums/FieldType';
import {Activity} from "./models/activity";
import {ActivitiesService} from "./services/activities.service";

interface IField {
  id: number,
  name: string
}

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})

export class ActivitiesComponent implements OnInit {
  public activities$: Observable<Activity[]>;
  public defaultCol: Array<string> = [FieldType.PROJECT, FieldType.EMPLOYEE, FieldType.DATE, 'hours'];
  public tableCol: Array<string> = this.defaultCol;
  public activities: Array<any> = [];
  public fields: Array<IField> = [
    {id: 1, name: FieldType.PROJECT},
    {id: 2, name: FieldType.EMPLOYEE},
    {id: 3, name: FieldType.DATE},
  ];
  public selectedFields: Array<string> = [];

  constructor(public activityService: ActivitiesService,
              private cdr: ChangeDetectorRef) {
    this.activities$ = this.activityService.activities$;
  }

  async ngOnInit() {
    this.activities$.pipe(
      tap((data: Activity[]) => {
        this.activities = data;
      })
    ).subscribe();
  }

  selectedItemChange($event: any) {
    this.activities$.pipe(
      tap((data: Array<Activity>) => {
        if (isEmpty(this.selectedFields)) {
          this.activities = data;
          this.tableCol = this.defaultCol;
          return;
        }
          this.activities = this.customAggregation(data);
          this.activities.forEach(activity => {
            return pick(activity, this.tableCol);
          });
        this.activities = this.selectedFields.length > 0 ? this.customAggregation(data) : data;
        this.tableCol = this.selectedFields.concat(['hours']);
        this.cdr.detectChanges();
      })
    ).subscribe();
  }

  public getActivityInfo(activityElement: any, key: string) {
    if(key =='project' || key == 'employee') {
      return activityElement[key].name;
    } else {
      return activityElement[key];
    }
  }

  private customAggregation(data: Activity[]): Array<any> {
    let helper = {};
    const result = data.reduce((r: any, o: Activity) => {
      let key: string | undefined = undefined;
      this.selectedFields.forEach(field => {
        if (field == 'date') {
          key += o[field] + '-';
        } else {
          // @ts-ignore
          key += o[field].name + '-';
        }
        return key;
      })

      // @ts-ignore
      if (!helper[key]) {
        // @ts-ignore
        helper[key] = Object.assign({}, o); // create a copy of o
        // @ts-ignore
        r.push(helper[key]);
      } else {
        // @ts-ignore
        helper[key].hours += o.hours;
      }
      return r;
    }, []);

    return result;
  }

}
