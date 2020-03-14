import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'firebase/firestore';




@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  depositArray = [];
  deposits:any;
  today = new FormControl(new Date());



  constructor(private firestore: AngularFirestore) {
     firestore.collection('Tally').valueChanges().subscribe(object=> {
      this.deposits = object;

      console.log(object, 'object');

     });

  }

  ngOnInit(): void {
    
  }

  getDeposit(deposit:number, depositDate:any) {

    var d = new Date().getTime().toString(); 



    this.firestore.collection('Tally').doc(d).set({
        deposit: {
          amount: deposit,
          deposit_type: "savings",
          datetime: d,
          userdate: depositDate
        }

    });


  }

}
