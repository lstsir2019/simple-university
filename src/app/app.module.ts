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
    StockListComponent
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
