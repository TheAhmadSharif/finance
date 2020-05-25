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
  list: string[],
  visibility: string
}

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  activityCollapse:boolean = true;
  notification:any = null;
  event:any = [];
  activityList: any;
  p: number = 1;

  activity:Activity = {
    date: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()},
    list: [],
    visibility: 'Yes'
  }

  constructor(private firestore: AngularFirestore) { 
  }

  ngOnInit(): void {
       this.firestore.collection('PersonalActivity').valueChanges().subscribe(object=> {
         this.activityList = object;
    }, error => {

    });
  }

  addActivity(activity) {

      var date_ISO = this.activity.date.year + '-' + this.activity.date.month + '-' + this.activity.date.day;
      var creation_time = new Date().getTime().toString();
      var AD_toDateString = new Date(date_ISO).toDateString();
      var activityList = this.activity.list = this.event; 
      var visibility = this.activity.visibility;

      // throw new Error("Hi");
      this.firestore.collection('PersonalActivity').doc(creation_time).set({
            _id: creation_time,
            activity_date: date_ISO,
            AD_toDateString: AD_toDateString,
            activity_list: activityList,
            visibility: visibility
      });
  }
  listActivity(object) {
    this.event.push(object);
    this.activity.list = [];
    console.log(this.event);
  }
removeObject(id:any) {
   var id = id.toString();
   var r = confirm("Are you sure you want to delete this activity?");
     if (r == true) {
         this.firestore.collection("PersonalActivity").doc(id).delete().then(result => {
                console.log("Activity successfully deleted!");
                
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
     }
  }

}
