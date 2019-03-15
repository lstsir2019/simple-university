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
import { EvaluationPersonnelComponent } from './evaluation-personnel/evaluation-personnel.component';
import { EvaluationNavbarComponent } from './evaluation-personnel/evaluation-navbar/evaluation-navbar.component';
import { ElementsComponent } from './evaluation-personnel/elements/elements.component';
import {ElementListComponent} from './evaluation-personnel/elements/element-list/element-list.component';
import {ElementCreateComponent} from './evaluation-personnel/elements/element-create/element-create.component';
import { MentionsComponent } from './evaluation-personnel/mentions/mentions.component';
import { MentionCreateComponent } from './evaluation-personnel/mentions/mention-create/mention-create.component';
import { MentionListComponent } from './evaluation-personnel/mentions/mention-list/mention-list.component';
import { NotesComponent } from './evaluation-personnel/notes/notes.component';
import { NoteCreateComponent } from './evaluation-personnel/notes/note-create/note-create.component';
import { NoteListComponent } from './evaluation-personnel/notes/note-list/note-list.component';
import { CommandesComponent } from './commandes/commandes.component';
import { CommandeCreateComponent } from './commandes/commande-create/commande-create.component';
import { CommandeListComponent } from './commandes/commande-list/commande-list.component';

import {ProduitCreateComponent} from "./produits/produit-create/produit-create.component";
import {CategorieTypeCreateComponent} from "./produits/categorie-type-create/categorie-type-create.component";
import {TypeCreateComponent} from "./produits/type-create/type-create.component";
import {ProduitsComponent} from "./produits/produits.component";
import {LivraisonsComponent} from "./livraisons/livraisons.component";
import {LivraisonCreateComponent} from "./livraisons/livraison-create/livraison-create.component";
import {LivraisonListComponent} from "./livraisons/livraison-list/livraison-list.component";
import {EvolutionsPersonnelComponent} from './evolutions-personnel/evolutions-personnel.component';
import {EvolutionPersonnelCreateComponent} from './evolutions-personnel/evolution-personnel-create/evolution-personnel-create.component';
import {EvolutionPersonnelListComponent} from './evolutions-personnel/evolution-personnel-list/evolution-personnel-list.component';
import {EchelleCreateComponent} from './echelles/echelle-create/echelle-create.component';
import {EchelleListComponent} from './echelles/echelle-list/echelle-list.component';
import {EchellesComponent} from './echelles/echelles.component';
import {EchelonListComponent} from './echelons/echelon-list/echelon-list.component';
import {EchelonCreateComponent} from './echelons/echelon-create/echelon-create.component';
import {ExpressionBesoinItemManipComponent} from './expression-besoins/expression-besoin-item-manip/expression-besoin-item-manip.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ExpressionBesoinsComponent,
    ExpressionBesoinCreateComponent,
    ExpressionBesoinListComponent,
    ExpressionBesoinItemManipComponent,
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
    ConfirmationComponent,
    EvaluationPersonnelComponent,
    ElementCreateComponent,
    ElementListComponent,
    ProduitCreateComponent,
    CategorieTypeCreateComponent,
    TypeCreateComponent,
    ProduitsComponent,
    LivraisonsComponent,
    LivraisonCreateComponent,
    LivraisonListComponent,
EvolutionsPersonnelComponent,
    EvolutionPersonnelCreateComponent,
    EvolutionPersonnelListComponent,
    EchelleCreateComponent,
    EchelleListComponent,
    EchellesComponent,
    EchelonListComponent,
    EchelonCreateComponent,

    EvaluationNavbarComponent,
    ElementsComponent,
    MentionsComponent,
    MentionCreateComponent,
    MentionListComponent,
    NotesComponent,
    NoteCreateComponent,
    NoteListComponent,
    CommandesComponent,
    CommandeCreateComponent,
    CommandeListComponent,
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
