import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivitiesComponent} from "./activities.component";
import {ActivitiesRoutingModule} from "./activities-routing.module";
import {FormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";

@NgModule({
  declarations: [ActivitiesComponent],
  imports: [
    ActivitiesRoutingModule,
    FormsModule,
    CommonModule,
    NgSelectModule
  ]
})
export class ActivitiesModule { }
