import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {Activity} from "../models/activity";
import {Activities} from "../helpers/data";

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  constructor() {
  }

  get activities$(): Observable<Activity[]> {
    return of(Activities);
  }

}
