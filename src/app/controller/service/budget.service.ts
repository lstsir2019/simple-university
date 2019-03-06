import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BudgetFaculte} from '../model/budget/budget-faculte.model';
import {BudgetSousProjet} from '../model/budget/budget-sous-projet.model';
import {BudgetEntiteAdministratif} from '../model/budget/budget-entite-administratif.model';
import {BudgetCompteBudgitaire} from '../model/budget/budget-compte-budgitaire.model';
import {CompteBudgitaire} from '../model/budget/compte-budgitaire.model';
import {DetaillesBudget} from '../model/budget/detailles-budget.model';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private http: HttpClient) {
  }

  // Les urls
  public _host = 'http://localhost:8099/budget_api/';
  public _url_bf = this._host + 'budget_api_facultes/';
  public _url_bsp = this._host + 'budget_sous_projet/';
  public _url_bea = this._host + 'budget_entite_admin/';
  public _url_bcb = this._host + 'budget_compte_budgitaires/';

  //variables du pointage sur les formulaires
  public budgetFaculteCreate: BudgetFaculte = new BudgetFaculte(0, 0);
  public budgetSousProjetCreate: BudgetSousProjet = new BudgetSousProjet(0);
  public budgetSousProjetCreateClone1: BudgetSousProjet = new BudgetSousProjet(0);
  public budgetSousProjetCreateClone2: BudgetSousProjet = new BudgetSousProjet(0);
  public budgetEntiteAdministratifCreate: BudgetEntiteAdministratif = new BudgetEntiteAdministratif(0);
  public budgetEntiteAdministratifCreateClone: BudgetEntiteAdministratif = new BudgetEntiteAdministratif(0);
  public budgetCompteBudgitaireCreate: BudgetCompteBudgitaire = new BudgetCompteBudgitaire(0);
  public compteBudgitaireCreate: CompteBudgitaire = new CompteBudgitaire(0);

  //Arrays
  public budgetEnAdmins: Array<BudgetEntiteAdministratif> = [];
  public budgetCbs: Array<BudgetCompteBudgitaire> = [];

  //detailles budget vo pour chaque composant
  public detaillesBudgetVo0: DetaillesBudget = new DetaillesBudget();
  public detaillesBudgetVo1: DetaillesBudget = new DetaillesBudget();
  public detaillesBudgetVo2: DetaillesBudget = new DetaillesBudget();
  public detaillesBudgetVo3: DetaillesBudget = new DetaillesBudget();



  //les varibles qui contient les rĂ©sultats de la recherche
  private _bf: BudgetFaculte = new BudgetFaculte();

  get bf(): BudgetFaculte {
    return this._bf;
  }

  private _bsps: Array<BudgetSousProjet> = [];

  get bsps(): Array<BudgetSousProjet> {
    return this._bsps;
  }

  private _beas: Array<BudgetEntiteAdministratif> = [];

  get beas(): Array<BudgetEntiteAdministratif> {
    return this._beas;
  }

  private _bcbs: Array<BudgetCompteBudgitaire> = [];

  get bcbs(): Array<BudgetCompteBudgitaire> {
    if (this._bcbs == null) {
      this._bcbs = [];
    }
    return this._bcbs;
  }

  public addBudgetSousProjet() {
    const bspClone: BudgetSousProjet = new BudgetSousProjet(0, this.budgetSousProjetCreate.referenceSousProjet);
    bspClone.detaillesBudgetVo = this.detaillesBudgetVo1;
    this.budgetFaculteCreate.detaillesBudgetVo = this.detaillesBudgetVo0;
    this.budgetFaculteCreate.budgetSousProjetVo.push(bspClone);
    this.detaillesBudgetVo1 = new DetaillesBudget();
  }

  public addBudgetEntiteAdministratif() {
    this.budgetFaculteCreate.budgetSousProjetVo.forEach(bsp => {
      if (bsp.referenceSousProjet === this.budgetSousProjetCreateClone1.referenceSousProjet) {
        let beaClone: BudgetEntiteAdministratif = new BudgetEntiteAdministratif(0, this.budgetEntiteAdministratifCreate.referenceEntiteAdministratif);
        beaClone.detaillesBudgetVo = this.detaillesBudgetVo2;
        bsp.budgetEntiteAdministratifVo.push(beaClone);
        //beaClone.budgetSousProjetVo=bsp;
        this.budgetEnAdmins.push(beaClone);
        //beaClone=new BudgetEntiteAdministratif();
        this.detaillesBudgetVo2 = new DetaillesBudget();
      }
    });
  }

  public addBudgetCompteBudgitaireCreate() {
    this.budgetFaculteCreate.budgetSousProjetVo.forEach(bsp => {
      if (bsp.referenceSousProjet == this.budgetSousProjetCreateClone2.referenceSousProjet) {
        bsp.budgetEntiteAdministratifVo.forEach(bea => {
          if (bea.referenceEntiteAdministratif == this.budgetEntiteAdministratifCreateClone.referenceEntiteAdministratif) {
            let bcbClone: BudgetCompteBudgitaire = new BudgetCompteBudgitaire();
            bcbClone.detaillesBudgetVo = this.detaillesBudgetVo3;
            bcbClone.compteBudgitaireVo = this.compteBudgitaireCreate;
            bea.budgetCompteBudgitaireVo.push(bcbClone);
            //bcbClone.budgetEntiteAdministratifVo=bea;
            this.budgetCbs.push(bcbClone);
            //bcbClone=new BudgetCompteBudgitaire();
            this.detaillesBudgetVo3 = new DetaillesBudget();
            this.compteBudgitaireCreate = new CompteBudgitaire();
          }
        });
      }
    });
  }

  public saveAllInBudgetFaculte() {
    this.http.post<BudgetFaculte>(this._url_bf, this.budgetFaculteCreate).subscribe(
      data => {
        console.log('Ok');
      },
      error => {
        console.log('Error');
      }
    );
  }

  /* DELETE: delete the budgetFaculte from the server */
  deleteBudgetFaculte(annee: number) {
    return this.http.delete(this._url_bf + 'suppression/annee/' + annee).pipe(
      tap(_ => console.log('Deleted budget faculte with annee = ' + annee)),
      catchError(error => of(null))
    );
  }

  deleteBudgetSousProjet(annee: number) {
    return this.http.delete(this._url_bsp + 'suppression/annee/' + annee).pipe(
      tap(_ => console.log('Deleted budget sous projet with annee = ' + annee)),
      catchError(error => of(null))
    );
  }

  deleteBudgetEntiteAdmin(refSousProjet: string, annee: number) {
    return this.http.delete(this._url_bea + 'suppression/refSousProjet/' + refSousProjet + '/annee/' + annee).pipe(
      tap(_ => console.log('Deleted budget entite admin with annee = ' + annee)),
      catchError(error => of(null))
    );
  }

  deleteBudgetCompteBudgitaire(refSousProjet: string, refEntitAdmin: string, annee: number) {
    return this.http.delete(this._url_bcb + 'suppression/referenceEntiteAdministratif/' + refEntitAdmin + '/referenceSousProjet/' + refSousProjet + 'annee/' + annee).pipe(
      tap(_ => console.log('Deleted budget compte budgitaire with annee = ' + annee)),
      catchError(error => of(null))
    );
  }

  public findAllByAnnee() {
    this.http.get<BudgetFaculte>(this._url_bf + 'annee/' + this.budgetFaculteCreate.annee).subscribe(
      data => {
        this._bf = data;
      }, error => {
        console.log('error');
      }
    );
    this.http.get<Array<BudgetSousProjet>>(this._url_bsp + 'annee/' + this.budgetFaculteCreate.annee).subscribe(
      data => {
        this._bsps = data;
      }, error => {
        this._bsps = [];
        console.log('error');
      }
    );
    this.http.get<Array<BudgetEntiteAdministratif>>(this._url_bea + 'annee/' + this.budgetFaculteCreate.annee).subscribe(
      data => {
        this._beas = data;
      }, error => {
        console.log('error');
      }
    );
    this.http.get<Array<BudgetCompteBudgitaire>>(this._url_bcb + 'annee/' + this.budgetFaculteCreate.annee).subscribe(
      data => {
        this._bcbs = data;
      }, error => {
        this._bcbs = [];
        console.log('error');
      }
    );
  }

  public findAllByAnneeAndBudgetSousProjet() {
    this.http.get<BudgetSousProjet>(this._url_bsp + 'reference/' + this.budgetSousProjetCreate.referenceSousProjet + '/annee/' + this.budgetFaculteCreate.annee).subscribe(
      data => {
        this._bsps = [];
        this._bsps.push(data);
      }, error => {
        console.log('error');
      }
    );
    this.http.get<Array<BudgetEntiteAdministratif>>(this._url_bea + 'refSousProjet/' + this.budgetSousProjetCreate.referenceSousProjet + '/annee/' + this.budgetFaculteCreate.annee).subscribe(
      data => {
        this._beas = [];
        this._beas = data;
      }, error => {
        console.log('error');
      }
    );
    this.http.get<Array<BudgetCompteBudgitaire>>(this._url_bcb + 'reference/' + this.budgetSousProjetCreate.referenceSousProjet + '/annee/' + this.budgetFaculteCreate.annee).subscribe(
      data => {
        this._bcbs = [];
        this._bcbs = data;
      }, error => {
        console.log('error');
      }
    );
  }

  public findAllByAnneeAndBudgetSousProjetAndBudgetEntitiAdmin() {
    this.http.get<BudgetEntiteAdministratif>(this._url_bea + 'referenceEntiteAdmin/' + this.budgetEntiteAdministratifCreate.referenceEntiteAdministratif + '/refSousProjet/' + this.budgetSousProjetCreate.referenceSousProjet + '/annee/' + this.budgetFaculteCreate.annee).subscribe(
      data => {
        this._beas = [];
        this._beas.push(data);
      }, error => {
        console.log('error');
      }
    );
    this.http.get<Array<BudgetCompteBudgitaire>>(this._url_bcb + 'refEntite/' + this.budgetEntiteAdministratifCreate.referenceEntiteAdministratif + '/refsousProjet/' + this.budgetSousProjetCreate.referenceSousProjet + '/annee/' + this.budgetFaculteCreate.annee).subscribe(
      data => {
        this._bcbs = [];
        this._bcbs = data;
      }, error => {
        console.log('error');
      }
    );
  }
}
