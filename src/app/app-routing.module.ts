import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryComponent } from './category/category.component';
import { ExpenseComponent } from './expense/expense.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { DepositComponent } from './deposit/deposit.component';
import { GraphExpenseComponent } from './graph/graph-expense/graph-expense.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'login', component: LoginComponent, pathMatch: 'full'},
  { path: 'expense', component: ExpenseComponent},
  { path: 'deposit', component: DepositComponent},
  { path: 'graph/expense', component: GraphExpenseComponent, pathMatch: 'full'},
  { path: ':category/:categoryname', component: CategoryComponent},
  { path: ':category/:categoryname/:objectId', component: DetailsComponent, pathMatch: 'full' },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
