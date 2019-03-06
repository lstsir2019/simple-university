import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MagasinComponent} from "./magasin/magasin.component";
import {ReceptionComponent} from "./reception/reception.component";
import {ExpressionBesoinsComponent} from "./expression-besoins/expression-besoins.component";
import {BudgetsComponent} from './budgets/budgets.component';

const routes: Routes = [
  { path: 'exepressionbesoins', component:ExpressionBesoinsComponent},
  { path:'reception',component:ReceptionComponent},
  { path: 'magasin',component:MagasinComponent},
  { path: 'budget',component:BudgetsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
