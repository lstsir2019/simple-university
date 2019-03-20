import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MagasinComponent} from "./magasin/magasin.component";
import {ReceptionComponent} from "./reception/reception.component";
import {ExpressionBesoinsComponent} from "./expression-besoins/expression-besoins.component";
import {BudgetComponent} from './budget/budget.component';
import {MentionsComponent} from './evaluation-personnel/mentions/mentions.component';
import {NotesComponent} from './evaluation-personnel/notes/notes.component';
import {ElementsComponent} from './evaluation-personnel/elements/elements.component';
import {EvaluationPersonnelComponent} from './evaluation-personnel/evaluation-personnel.component';
import {CommandesComponent} from "./commandes/commandes.component";
import {ProduitsComponent} from "./produits/produits.component";
import {LivraisonsComponent} from "./livraisons/livraisons.component";
import {EvolutionsComponent} from "./evolutions/evolutions.component";
import {EtudiantAdminComponent} from './etudiant-admin/etudiant-admin.component';
import {CommandeCreateComponent} from './commandes/commande-create/commande-create.component';
import {CommandeListComponent} from './commandes/commande-list/commande-list.component';
import {ExpressionBesoinCreateComponent} from './expression-besoins/expression-besoin-create/expression-besoin-create.component';
import {ExpressionBesoinListComponent} from './expression-besoins/expression-besoin-list/expression-besoin-list.component';

const routes: Routes = [
  {path: 'etudiant-admin', component: EtudiantAdminComponent},
  { path: 'exepressionbesoins', component:ExpressionBesoinsComponent},
  { path:'reception',component:ReceptionComponent},
  { path: 'magasin',component:MagasinComponent},
  { path: 'budget',component:BudgetComponent},
  /*{ path: 'evaluation', component: EvaluationPersonnelComponent,
    children: [
      // { path: '', redirectTo: 'elements', pathMatch: 'full' },
      {path: 'elements', component: ElementsComponent, },

      {path: 'mentions', component: MentionsComponent},
      {path: 'notes', component: NotesComponent},


    ]
  },*/



  {path: 'elements', component: ElementsComponent, },

  {path: 'mentions', component: MentionsComponent},
  {path: 'notes', component: NotesComponent},
  { path: 'commande',component:CommandesComponent},

  { path: 'produit',component:ProduitsComponent},
  { path: 'Livraison',component:LivraisonsComponent},
  { path: 'evolution', component: EvolutionsComponent},

  //commandes

  { path: 'commandeCreate', component: CommandeCreateComponent},
  { path: 'commandeListe', component: CommandeListComponent},

  //expressionBesoin
  { path: 'expressionBesoinCreate', component: ExpressionBesoinCreateComponent},
  { path: 'expressionBesoinList', component: ExpressionBesoinListComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
