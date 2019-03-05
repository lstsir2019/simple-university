import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MagasinComponent} from "./magasin/magasin.component";
import {ReceptionComponent} from "./reception/reception.component";
import {ExpressionBesoinsComponent} from "./expression-besoins/expression-besoins.component";

const routes: Routes = [
  { path:'reception',component:ReceptionComponent},
  { path: 'magasin',component:MagasinComponent},
  { path: 'exepressionbesoins', component:ExpressionBesoinsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
