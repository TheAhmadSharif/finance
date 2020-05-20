import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';


interface Activity {
  date: {
    year: any,
    month: any,
    day: any,
  },
  list: any,
  note: string
}



@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  isCollapsed:boolean = true;
  activityCollapse:boolean = true;
  notification:any = null;


  activity:Activity = {
    date: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()},
    list: '',
    note: '',
  }

  constructor() { }

  ngOnInit(): void {
  }

  addActivity() {

  }

}
