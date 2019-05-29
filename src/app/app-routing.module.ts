import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MagasinComponent} from './magasin/magasin.component';
import {ReceptionComponent} from './reception/reception.component';
import {ExpressionBesoinsComponent} from './expression-besoins/expression-besoins.component';
import {BudgetComponent} from './budget/budget.component';
import {MentionsComponent} from './evaluation-personnel/mentions/mentions.component';
import {NotesComponent} from './evaluation-personnel/notes/notes.component';
import {ElementsComponent} from './evaluation-personnel/elements/elements.component';
import {EvaluationPersonnelComponent} from './evaluation-personnel/evaluation-personnel.component';
import {CommandesComponent} from './commandes/commandes.component';
import {ProduitsComponent} from './produits/produits.component';
import {LivraisonsComponent} from './livraisons/livraisons.component';
import {EvolutionsComponent} from './evolutions/evolutions.component';
import {CommandeCreateComponent} from './commandes/commande-create/commande-create.component';
import {CommandeListComponent} from './commandes/commande-list/commande-list.component';
import {ExpressionBesoinCreateComponent} from './expression-besoins/expression-besoin-create/expression-besoin-create.component';
import {ExpressionBesoinListComponent} from './expression-besoins/expression-besoin-list/expression-besoin-list.component';
import {PaiementComponent} from './commandes/paiement/paiement.component';
import {PaiemmentModalComponent} from './commandes/paiemment-modal/paiemment-modal.component';
import {CommandeAffectationComponent} from './commandes/commande-affectation/commande-affectation.component';
import {FournisseurComponent} from './commandes/fournisseur/fournisseur.component';
import {AppelOffresComponent} from './appel-offre/appel-offres/appel-offres.component';
import {AppelOffreComponent} from './appel-offre/appel-offre.component';
import {PersonnelsComponent} from './faculte-mandat/personnels/personnels.component';
import {ProjetsComponent} from './faculte-mandat/projets/projets.component';
import {EntiteAdministratifsComponent} from './faculte-mandat/entite-administratifs/entite-administratifs.component';
import {ResponsabilitesComponent} from './faculte-mandat/responsabilites/responsabilites.component';
import {MandatsComponent} from './faculte-mandat/mandats/mandats.component';

const routes: Routes = [
  {path: 'exepressionbesoins', component: ExpressionBesoinsComponent},
  {path: 'reception', component: ReceptionComponent},
  {path: 'magasin', component: MagasinComponent},
  {path: 'budget', component: BudgetComponent},
  {path: 'appleoffre', component: AppelOffreComponent},

  {path: 'elements', component: ElementsComponent,},

  {path: 'mentions', component: MentionsComponent},
  {path: 'notes', component: NotesComponent},
  {path: 'commande', component: CommandesComponent},

  {path: 'produit', component: ProduitsComponent},
  {path: 'Livraison', component: LivraisonsComponent},
  {path: 'evolution', component: EvolutionsComponent},

  //commandes

  {path: 'commandeCreate', component: CommandeCreateComponent},
  {path: 'commandeListe', component: CommandeListComponent},
  {path: 'paiement', component: PaiementComponent},
  {path: 'affectation', component: CommandeAffectationComponent},
  {path: 'fournisseur', component: FournisseurComponent},

  //expressionBesoin
  {path: 'expressionBesoinCreate', component: ExpressionBesoinCreateComponent},
  {path: 'expressionBesoinList', component: ExpressionBesoinListComponent},

//mandats
  {path: 'personnelCreate', component: PersonnelsComponent},
  {path: 'projetSousProjetCreate', component: ProjetsComponent},
  {path: 'entiteAdministratifCreate', component: EntiteAdministratifsComponent},
  {path: 'responsabiliteCreate', component: ResponsabilitesComponent},
  {path: 'mandatCreate', component: MandatsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
