import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MagasinComponent} from "./magasin/magasin.component";
import {ReceptionComponent} from "./reception/reception.component";
import {ExpressionBesoinsComponent} from "./expression-besoins/expression-besoins.component";

const routes: Routes = [
  { path: 'exepressionbesoins', component:ExpressionBesoinsComponent},
  { path:'reception',component:ReceptionComponent},
  { path: 'magasin',component:MagasinComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
