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
/*import {BudgetsComponent} from './budgets/budgets.component';
import {BudgetFaculteComponent} from './budgets/budget-faculte/budget-faculte.component';
import {BudgetEntiteAdministratifComponent} from './budgets/budget-entite-administratif/budget-entite-administratif.component';
import {BudgetCompteBudgitaireComponent} from './budgets/budget-compte-budgitaire/budget-compte-budgitaire.component';
import {BudgetSousProjetComponent} from './budgets/budget-sous-projet/budget-sous-projet.component';
import {BfCreateComponent} from './budgets/budget-faculte/bf-create/bf-create.component';
import {BspCreateComponent} from './budgets/budget-sous-projet/bsp-create/bsp-create.component';
import {BeaCreateComponent} from './budgets/budget-entite-administratif/bea-create/bea-create.component';
import {BcbCreateComponent} from './budgets/budget-compte-budgitaire/bcb-create/bcb-create.component';
import {ConfirmationComponent} from './budgets/confirmation/confirmation.component';*/

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
    /*BudgetsComponent,
    BudgetFaculteComponent,
    BudgetSousProjetComponent,
    BudgetEntiteAdministratifComponent,
    BudgetCompteBudgitaireComponent,
    BfCreateComponent,
    BspCreateComponent,
    BeaCreateComponent,
    BcbCreateComponent,
    ConfirmationComponent*/
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
