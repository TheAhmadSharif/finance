import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as _ from 'lodash';
import * as moment from 'moment';


interface Activity {
  date: {
    year: any,
    month: any,
    day: any,
  },
  list: string[]
}

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  activityCollapse:boolean = false;
  notification:any = null;
  event:any = [];

  activity:Activity = {
    date: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()},
    list: []
  }

  constructor(private firestore: AngularFirestore) { 
  }

  ngOnInit(): void {
  }

  addActivity(activity) {

      var datetime = new Date().getTime();
      var d = datetime.toString(); 

      this.firestore.collection('Activity').doc(d).set({
  
            _id: datetime,
            activity_date: activity.date,
            activity_list: this.event,
            note: activity.note,


      });
  }
  listActivity(object) {
    this.event.push(object);
    this.activity.list = [];
    console.log(this.event);
  }

}
