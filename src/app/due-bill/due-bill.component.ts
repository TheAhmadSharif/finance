import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { TransactionService } from '../services/transaction.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-due-bill',
  templateUrl: './due-bill.component.html',
  styleUrls: ['./due-bill.component.css']
})
export class DueBillComponent implements OnInit {

  due = {
  	_id: null,
  	amount: null,
  	category: null,
  	transaction_type: "due",
  	due_date: null,
  	given_date: null,
  	note: null,
  	visibility: "Yes"
  }


  dueBills;any;

  constructor(
    private firestore: AngularFirestore,
    public angularFireAuth: AngularFireAuth,
    private router: Router,
    private transactionService: TransactionService
    ) {}

  ngOnInit(): void {
	  	this.firestore.collection('PersonalDueBill').valueChanges().subscribe(object=> {
	        this.dueBills = object;
	    }, error => {

	    });
  }


  addObject(activity) {


  	 var d = new Date().getTime().toString();
      
      // throw new Error("Hi");
      this.firestore.collection('PersonalDueBill').doc(d).set({
            _id: d,
            amount: due.amount,
            category: due.category,
            transaction_type: "due",
            due_date: due_date,
            given_date: given_date,
            visibility: visibility
      }).then(response => {

  
      });
      
  }

  removeObject(id:any) {
   var id = id.toString();
   var r = confirm("Are you sure you want to delete this activity?");
     if (r == true) {
         this.firestore.collection("PersonalDueBill").doc(id).delete().then(result => {
                console.log("Activity successfully deleted!");
                
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
     }
  }

}
