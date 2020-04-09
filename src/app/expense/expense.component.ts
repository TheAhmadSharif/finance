import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { catchError, first, last, map, reduce, find, skipWhile, tap } from 'rxjs/operators';


import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

interface Expense {
  amount: string,
  date: object,
  category: string,
  subcategory: string,
  subcategory_others: string,
  note: string
}

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})

export class ExpenseComponent implements OnInit {

  single: any[] = [
    {
      "name": "Utility",
      "value": 1400,
    },
    {
      "name": "Foods",
      "value": 3500
    },
    {
      "name": "Salary",
      "value": 15000
    }
  ];

  view: any[] = [350, 200];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Expenditure Category';
  showYAxisLabel = true;
  yAxisLabel = 'Expenditure';

  colorScheme = {
    domain: ['#ffc107', '#28a745', '#8BC34A']
  };

  chartdata:any;
  expenses:any;
  totalExpense:any = 0;
  notification:any;
  subcategory:string;
  sub_others:boolean = false;
  selected_day:any = {
    year: new Date().getFullYear(), 
    month: new Date().getMonth() + 1, 
    day: new Date().getDate()
  };
  p: number = 1;
  placement = 'bottom';
  range:any = {
    prevdate: {
      year: new Date().getFullYear(), 
      month: new Date().getMonth() + 1, 
      day: new Date().getDate()
    },
    nextdate: {
      year: new Date().getFullYear(), 
      month: new Date().getMonth() + 1, 
      day: new Date().getDate() + 7
    }
  }

  expense:Expense = {
    amount: '',
    date: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()},
    category: '',
    subcategory: '',
    subcategory_others: '',
    note: '',
  }
  
  constructor(
    private firestore: AngularFirestore,
    private router: Router
    ) {
      Object.assign(this.single)
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit(): void {
    this.totalExpense = 0;
    this.firestore.collection('Tally', ref => ref.orderBy('expense.datetime')).valueChanges().subscribe(object=> {
      this.expenses = object;
      this.expenses.forEach(element => {
        this.totalExpense = element.expense.amount + parseInt(this.totalExpense);
       });
   }, error => {

   });
   this.getTotalExpense();
   
}


getByDay(date:any) {
  this.totalExpense = 0;
  var givendate = date.year + '/' + date.month + '/' + date.day;  
  this.firestore.collection('Tally', ref => ref.where('expense.userdate', '==', givendate)).valueChanges().subscribe(object=> {
        this.expenses = object; 
        this.expenses.forEach(element => {
          this.totalExpense = parseInt(element.expense.amount) + this.totalExpense;
        });
    },
    error => {

    });
}

getPrevDate(date:any) {
  var day = new Date(date.year + '-' + date.month + '-' + date.day);
  var nextDay = new Date(day);
  var nd = nextDay.setDate(day.getDate() - 1); 
  var d1 = new Date(nd);
  this.selected_day = {
    year: d1.getFullYear(),
    month: d1.getMonth() + 1,
    day: d1.getDate()
  };
}

getNextDate(date:any) {
  var day = new Date(date.year + '-' + date.month + '-' + date.day);
  var nextDay = new Date(day);
  var nd = nextDay.setDate(day.getDate() + 1); 

  var d1 = new Date(nd);
 
  this.selected_day = {
    year: d1.getFullYear(),
    month: d1.getMonth() + 1,
    day: d1.getDate()
  };

}

getByRange(range:any) {

  var prevdate = range.prevdate.year + '-' + range.prevdate.month + '-' + range.prevdate.day;
  var prevdate_ms = new Date(prevdate).getTime();

  var nextdate = range.nextdate.year + '-' + range.nextdate.month + '-' + range.nextdate.day;
  var nextdate_ms = new Date(nextdate).getTime();


  console.log(prevdate_ms, nextdate_ms, 'prevdate_ms', 'nextdate_ms');

  if(prevdate_ms > nextdate_ms) {
      this.firestore.collection('Tally', ref => ref.where('expense.userdate_ms', '>=', prevdate_ms).where('expense.userdate_ms', '<=', nextdate_ms)).valueChanges().subscribe(object=> {
        console.log(object, 'object');
        this.expenses = object;
        this.expenses.forEach(element => {
        this.totalExpense = element.expense.amount + this.totalExpense;
        });
    });
  }
}
getTotalExpense() {

    this.firestore.collection('TallyExpense').doc('TotalExpense').get().subscribe(object => {
      this.totalExpense = object.data().totalExpense.amount;
  
    }, (error)=> {
      this.totalExpense = 0;
      console.log(error, 'error44');
    });

}

addExpense(expense:any) {
    this.notification = null;
    var datetime = new Date().getTime();
    var d = datetime.toString(); 
    var userdate = expense.date.year + '-' + expense.date.month + '-' + expense.date.day;
    var userdate_ms = new Date(userdate).getTime();
    if(expense.amount > 0 && expense.category.length > 1) {
      this.firestore.collection('Tally').doc(d).set({
          expense: {
            id: datetime,
            amount: expense.amount,
            category: expense.category,
            subcategory: expense.subcategory,
            subcategory_others: expense.subcategory_others,
            transaction_type: "expense",
            datetime: datetime,
            userdate: userdate,
            userdate_ms: userdate_ms,
            note: expense.note,
          }

      });

      var expenseAmount = parseInt(expense.amount) + parseInt(this.totalExpense); 
      var datetime_hr = new Date(datetime).toUTCString();
      this.firestore.collection('TallyExpense').doc('TotalExpense').set({
        totalExpense: {
            amount: expenseAmount,
            datetime: d,
            datetime_hr: datetime_hr,
            last_amount: parseInt(expense.amount),
            last_total: parseInt(this.totalExpense)
          }
      }).then(result => {
        this.getTotalExpense();
      });
      this.expense.amount = null;
      this.expense.note = null;
    }
    else {
        this.notification = 'Please put the financial information correctly.'
    }
  }
getCategory(category:string) {
    this.expense.category = category;
}
getSubCategory(subcategory:string) {
  console.log(subcategory, 'subcategory');
  this.expense.subcategory = subcategory;
  if(subcategory=== 'Others'){
      this.sub_others = true;
  }
  else {
    this.sub_others = false;
  }
}

}
