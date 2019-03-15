import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ExpressionBesoinsComponent} from './expression-besoins/expression-besoins.component';
import {ExpressionBesoinCreateComponent} from './expression-besoins/expression-besoin-create/expression-besoin-create.component';
import {ExpressionBesoinListComponent} from './expression-besoins/expression-besoin-list/expression-besoin-list.component';
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
import {BudgetComponent} from './budget/budget.component';
import {BudgetSousProjetComponent} from './budget/budget-sous-projet/budget-sous-projet.component';
import {BudgetEntiteAdministratifComponent} from './budget/budget-entite-administratif/budget-entite-administratif.component';
import {BudgetCompteBudgitaireComponent} from './budget/budget-compte-budgitaire/budget-compte-budgitaire.component';
import {ConfirmationComponent} from './budget/confirmation/confirmation.component';
import {BudgetFaculteComponent} from './budget/budget-faculte/budget-faculte.component';
import {EvaluationPersonnelComponent} from './evaluation-personnel/evaluation-personnel.component';
import {EvaluationNavbarComponent} from './evaluation-personnel/evaluation-navbar/evaluation-navbar.component';
import {ElementsComponent} from './evaluation-personnel/elements/elements.component';
import {ElementListComponent} from './evaluation-personnel/elements/element-list/element-list.component';
import {ElementCreateComponent} from './evaluation-personnel/elements/element-create/element-create.component';
import {MentionsComponent} from './evaluation-personnel/mentions/mentions.component';
import {MentionCreateComponent} from './evaluation-personnel/mentions/mention-create/mention-create.component';
import {MentionListComponent} from './evaluation-personnel/mentions/mention-list/mention-list.component';
import {NotesComponent} from './evaluation-personnel/notes/notes.component';
import {NoteCreateComponent} from './evaluation-personnel/notes/note-create/note-create.component';
import {NoteListComponent} from './evaluation-personnel/notes/note-list/note-list.component';
import {CommandesComponent} from './commandes/commandes.component';
import {CommandeCreateComponent} from './commandes/commande-create/commande-create.component';
import {CommandeListComponent} from './commandes/commande-list/commande-list.component';

import {ProduitCreateComponent} from "./produits/produit-create/produit-create.component";
import {CategorieTypeCreateComponent} from "./produits/categorie-type-create/categorie-type-create.component";
import {TypeCreateComponent} from "./produits/type-create/type-create.component";
import {ProduitsComponent} from "./produits/produits.component";
import {LivraisonsComponent} from "./livraisons/livraisons.component";
import {LivraisonCreateComponent} from "./livraisons/livraison-create/livraison-create.component";
import {LivraisonListComponent} from "./livraisons/livraison-list/livraison-list.component";
import {EvolutionsPersonnelComponent} from './evolutions/evolutions-personnel/evolutions-personnel.component';
import {EvolutionPersonnelCreateComponent} from './evolutions/evolutions-personnel/evolution-personnel-create/evolution-personnel-create.component';
import {EvolutionPersonnelListComponent} from './evolutions/evolutions-personnel/evolution-personnel-list/evolution-personnel-list.component';
import {EchelleCreateComponent} from './evolutions/echelles/echelle-create/echelle-create.component';
import {EchelleListComponent} from './evolutions/echelles/echelle-list/echelle-list.component';
import {EchellesComponent} from './evolutions/echelles/echelles.component';
import {EchelonListComponent} from './evolutions/echelons/echelon-list/echelon-list.component';
import {EchelonCreateComponent} from './evolutions/echelons/echelon-create/echelon-create.component';
import {EvolutionsComponent} from './evolutions/evolutions.component';
import {EchelonComponent} from "./evolutions/echelons/echelon.component";
import {LoiEvolutionListComponent} from "./evolutions/lois-evolution/loi-evolution-list/loi-evolution-list.component";
import {LoisEvolutionComponent} from "./evolutions/lois-evolution/lois-evolution.component";
import {LoiEvolutionCreateComponent} from "./evolutions/lois-evolution/loi-evolution-create/loi-evolution-create.component";
import {LoiEvolutionTypePersonnelCreateComponent} from "./evolutions/lois-evolution/loi-evolution-type-personnel-create/loi-evolution-type-personnel-create.component";
import {LoiEvolutionTypePersonnelListComponent} from "./evolutions/lois-evolution/loi-evolution-type-personnel-list/loi-evolution-type-personnel-list.component";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
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
    //Evolution components
    EvolutionsPersonnelComponent,
    EvolutionPersonnelCreateComponent,
    EvolutionPersonnelListComponent,
    EchelleCreateComponent,
    EchelleListComponent,
    EchellesComponent,
    EchelonListComponent,
    EchelonCreateComponent,
    EchelonComponent,
    EvolutionsComponent,
    LoiEvolutionListComponent,
    LoisEvolutionComponent,
    LoiEvolutionCreateComponent,
    LoiEvolutionTypePersonnelCreateComponent,
    LoiEvolutionTypePersonnelListComponent,
    //Evaluation components
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
    HttpClientModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
