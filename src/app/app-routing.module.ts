import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExpressionBesoinCreateComponent} from "./expression-besoins/expression-besoin-create/expression-besoin-create.component";
import {ExpressionBesoinListComponent} from "./expression-besoins/expression-besoin-list/expression-besoin-list.component";

const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
