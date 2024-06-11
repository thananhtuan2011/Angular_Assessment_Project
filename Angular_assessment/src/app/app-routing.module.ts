import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetComponent } from './budget/budget/budget.component';

const routes: Routes = [

  {
    path: 'budget',
    component: BudgetComponent
  },

  {
    path: '',
    redirectTo: '/budget',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
