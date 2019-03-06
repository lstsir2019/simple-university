import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpressionBesoinsComponent } from './expression-besoins/expression-besoins.component';
import { ExpressionBesoinCreateComponent } from './expression-besoins/expression-besoin-create/expression-besoin-create.component';
import { ExpressionBesoinListComponent } from './expression-besoins/expression-besoin-list/expression-besoin-list.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from "./header/header.component";
import {ReceptionComponent} from "./reception/reception.component";
import {ReceptionCreateComponent} from "./reception/reception-create/reception-create.component";
import {ReceptionListComponent} from "./reception/reception-list/reception-list.component";
import {MagasinComponent} from "./magasin/magasin.component";
import {MagasinCreateComponent} from "./magasin/magasin-create/magasin-create.component";
import {StockListComponent} from "./magasin/stock-list/stock-list.component";
import {StockUpdateComponent} from "./magasin/stock-update/stock-update.component";
import { BudgetComponent } from './budget/budget.component';
import { BudgetSousProjetComponent } from './budget/budget-sous-projet/budget-sous-projet.component';
import { BudgetEntiteAdministratifComponent } from './budget/budget-entite-administratif/budget-entite-administratif.component';
import { BudgetCompteBudgitaireComponent } from './budget/budget-compte-budgitaire/budget-compte-budgitaire.component';
import { ConfirmationComponent } from './budget/confirmation/confirmation.component';
import {BudgetFaculteComponent} from './budget/budget-faculte/budget-faculte.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ExpressionBesoinsComponent,
    ExpressionBesoinCreateComponent,
    ExpressionBesoinListComponent,
    ReceptionComponent,
    ReceptionCreateComponent,
    ReceptionListComponent,
    MagasinComponent,
    MagasinCreateComponent,
    StockUpdateComponent,
    StockListComponent,
    BudgetComponent,
    BudgetFaculteComponent,
    BudgetSousProjetComponent,
    BudgetEntiteAdministratifComponent,
    BudgetCompteBudgitaireComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
