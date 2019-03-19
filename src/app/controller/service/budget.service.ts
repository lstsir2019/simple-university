import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BudgetFaculteVo} from '../model/budget/budget-faculte.model';
import {BudgetSousProjetVo} from '../model/budget/budget-sous-projet.model';
import {BudgetEntiteAdministratifVo, BudgetEntiteAdministratifVo} from '../model/budget/budget-entite-administratif.model';
import {BudgetCompteBudgitaireVo} from '../model/budget/budget-compte-budgitaire.model';
import {CompteBudgitaireVo} from '../model/budget/compte-budgitaire.model';
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
  private _budgetFaculteCreate: BudgetFaculteVo = new BudgetFaculteVo(0, new Date().getFullYear()-1);
  private _budgetFaculteCreate1: BudgetFaculteVo = new BudgetFaculteVo(0, new Date().getFullYear());
  public budgetSousProjetCreate: BudgetSousProjetVo = new BudgetSousProjetVo(0);
  public budgetSousProjetCreateClone1: BudgetSousProjetVo = new BudgetSousProjetVo(0);
  public budgetSousProjetCreateClone2: BudgetSousProjetVo = new BudgetSousProjetVo(0);
  public budgetEntiteAdministratifCreate: BudgetEntiteAdministratifVo = new BudgetEntiteAdministratifVo(0);
  public budgetEntiteAdministratifCreateClone: BudgetEntiteAdministratifVo = new BudgetEntiteAdministratifVo(0);
  public budgetCompteBudgitaireCreate: BudgetCompteBudgitaireVo = new BudgetCompteBudgitaireVo(0);
  public compteBudgitaireCreate: CompteBudgitaireVo = new CompteBudgitaireVo(0);

  //Arrays
  public budgetEnAdmins: Array<BudgetEntiteAdministratifVo> = [];
  public budgetCbs: Array<BudgetCompteBudgitaireVo> = [];

  //Arrays between two dates
  public budgetFacultes:Array<BudgetFaculteVo>=[];
  public budgetSousProjets:Array<BudgetSousProjetVo>=[];

  //detailles budget vo pour chaque composant
  public detaillesBudgetVo1: DetaillesBudget = new DetaillesBudget();
  public detaillesBudgetVo2: DetaillesBudget = new DetaillesBudget();
  public detaillesBudgetVo3: DetaillesBudget = new DetaillesBudget();

  //selected objects
  public selectdeBudgetSp:BudgetSousProjetVo=new BudgetSousProjetVo();

  private _bsps: Array<BudgetSousProjetVo> = [];

  //findAll
  private _allSousProjet:Array<BudgetSousProjetVo>=[];
  private _allEntiteAdministratif:Array<BudgetEntiteAdministratifVo>=[];

  get bsps(): Array<BudgetSousProjetVo> {
    return this._bsps;
  }

  private _beas: Array<BudgetEntiteAdministratifVo> = [];

  get beas(): Array<BudgetEntiteAdministratifVo> {
    if (this._beas==null){
      this._beas=[];
    }
    return this._beas;
  }

  private _bcbs: Array<BudgetCompteBudgitaireVo> = [];

  get bcbs(): Array<BudgetCompteBudgitaireVo> {
    if (this._bcbs == null) {
      this._bcbs = [];
    }
    return this._bcbs;
  }

  public addBudgetSousProjet() {
    const bspClone: BudgetSousProjetVo = new BudgetSousProjetVo(0, this.budgetSousProjetCreate.referenceSousProjet);
    bspClone.detaillesBudgetVo = this.detaillesBudgetVo1;
    this._budgetFaculteCreate.budgetSousProjetVo.push(bspClone);
    this.detaillesBudgetVo1 = new DetaillesBudget();
  }

  public addBudgetEntiteAdministratif() {
    this._budgetFaculteCreate.budgetSousProjetVo.forEach(bsp => {
      if (bsp.referenceSousProjet === this.budgetSousProjetCreateClone1.referenceSousProjet) {
        let beaClone: BudgetEntiteAdministratifVo = new BudgetEntiteAdministratifVo(0, this.budgetEntiteAdministratifCreate.referenceEntiteAdministratif);
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
    this._budgetFaculteCreate.budgetSousProjetVo.forEach(bsp => {
      if (bsp.referenceSousProjet == this.budgetSousProjetCreateClone2.referenceSousProjet) {
        bsp.budgetEntiteAdministratifVo.forEach(bea => {
          if (bea.referenceEntiteAdministratif == this.budgetEntiteAdministratifCreateClone.referenceEntiteAdministratif) {
            let bcbClone: BudgetCompteBudgitaireVo = new BudgetCompteBudgitaireVo();
            bcbClone.detaillesBudgetVo = this.detaillesBudgetVo3;
            bcbClone.compteBudgitaireVo = this.compteBudgitaireCreate;
            bea.budgetCompteBudgitaireVo.push(bcbClone);
            //bcbClone.budgetEntiteAdministratifVo=bea;
            this.budgetCbs.push(bcbClone);
            //bcbClone=new BudgetCompteBudgitaire();
            this.detaillesBudgetVo3 = new DetaillesBudget();
            this.compteBudgitaireCreate = new CompteBudgitaireVo();
          }
        });
      }
    });
  }

  public saveAllInBudgetFaculte() {
    this.http.post<BudgetFaculteVo>(this._url_bf, this._budgetFaculteCreate).subscribe(
      data => {
        this._budgetFaculteCreate=new BudgetFaculteVo();
        console.log('Ok');
      },
      error => {
        console.log('Error');
      }
    );
  }

  /* DELETE: delete the budgetFaculte from the server */
  public deleteBudgetFaculte(annee: number) {
    return this.http.delete(this._url_bf + 'suppression/annee/' + annee).pipe(
      tap(_ => console.log('Deleted budget faculte with annee = ' + annee)),
      catchError(error => of(null))
    );
  }

  public deleteBudgetSousProjet(bsp:BudgetSousProjetVo) {
    return this.http.delete(this._url_bsp + 'suppression/referenceSousProjet/'+bsp.referenceSousProjet+'/annee/' + bsp.budgetFaculteVo.annee).pipe(
      tap(_ => console.log('Deleted budget sous projet with annee = ' + bsp.budgetFaculteVo.annee)),
      catchError(error => of(null))
    );
  }
  public deleteBudgetEntiteAdmin(refSousProjet: string, refEntitAdmin: string, annee: number) {
    return this.http.delete(this._url_bcb + 'suppression/referenceEntiteAdmin/' + refEntitAdmin + '/referenceSousProjet/' + refSousProjet + '/annee/' + annee).pipe(
      tap(_ => console.log('Deleted budget compte budgitaire with annee = ' + annee)),
      catchError(error => of(null))
    );
  }
  public deleteBudgetCompteBudgitaire(code:string, referenceEntiteAdministratif:string, referenceSousProjet: string, annee: number) {
    return this.http.delete(this._url_bea + 'suppression/code/'+code+'/referenceEntiteAdmin/'+referenceEntiteAdministratif+'/referenceSousProjet/'+referenceSousProjet+'/annee/'+annee).pipe(
      tap(_ => console.log('Deleted budget entite admin with annee = ' + annee)),
      catchError(error => of(null))
    );
  }

  public findAllByAnnee() {
    if (this._budgetFaculteCreate!=null){
      this.http.get<BudgetFaculteVo>(this._url_bf + 'annee/' + this._budgetFaculteCreate.annee).subscribe(
        data => {
          this._budgetFaculteCreate=new BudgetFaculteVo();
          this._budgetFaculteCreate = data;
        }, error => {
          console.log('error');
        }
      );
    this._budgetFaculteCreate.budgetSousProjetVo=[];
    this.http.get<Array<BudgetSousProjetVo>>(this._url_bsp + 'annee/' + this._budgetFaculteCreate.annee).subscribe(
      data => {
        this._budgetFaculteCreate.budgetSousProjetVo = data;
        console.log(this._budgetFaculteCreate.budgetSousProjetVo);
      }, error => {
        this._bsps = [];
        console.log('error');
      }
    );
    this._beas=[];
    this.http.get<Array<BudgetEntiteAdministratifVo>>(this._url_bea + 'annee/' + this._budgetFaculteCreate.annee).subscribe(
      data => {
        this._beas=data;
      }, error => {
        console.log('error');
      }
    );
      this._bcbs=[];
    this.http.get<Array<BudgetCompteBudgitaireVo>>(this._url_bcb + 'annee/' + this._budgetFaculteCreate.annee).subscribe(
      data => {
        this._bcbs=data
      }, error => {
        this._bcbs = [];
        console.log('error');
      }
    );
    this.budgetFaculteCreate.budgetSousProjetVo.forEach(bsp=>{
      this._beas.forEach(bea=>{
        if (bea.budgetSousProjetVo.referenceSousProjet==bsp.referenceSousProjet){
          this._bcbs.forEach(bcb=>{
            if (bcb.budgetEntiteAdministratifVo.referenceEntiteAdministratif==bea.referenceEntiteAdministratif){
              bea.budgetCompteBudgitaireVo.push(bcb);
            }
          })
        } 
      })
    });
      //console.log(this.budgetFaculteCreate);
  }}

  public findAllByAnneeAndBudgetSousProjet() {
    this._budgetFaculteCreate.budgetSousProjetVo = [];
    this._beas = [];
    this._bcbs = [];
    if (this.budgetFaculteCreate!=null && this.budgetSousProjetCreate!=null){
      this.http.get<BudgetSousProjetVo>(this._url_bsp + 'reference/' + this.budgetSousProjetCreate.referenceSousProjet + '/annee/' + this._budgetFaculteCreate.annee).subscribe(
        data => {
          this._budgetFaculteCreate.budgetSousProjetVo.push(data);
        }, error => {
          console.log('error');
        }
      );
      this.http.get<Array<BudgetEntiteAdministratifVo>>(this._url_bea + 'refSousProjet/' + this.budgetSousProjetCreate.referenceSousProjet + '/annee/' + this._budgetFaculteCreate.annee).subscribe(
        data => {
          this._beas = data;
        }, error => {
          console.log('error');
        }
      );
      this.http.get<Array<BudgetCompteBudgitaireVo>>(this._url_bcb + 'reference/' + this.budgetSousProjetCreate.referenceSousProjet + '/annee/' + this._budgetFaculteCreate.annee).subscribe(
        data => {
          this._bcbs = data;
        }, error => {
          console.log('error');
        }
      );
    }
  }

  public findAllByAnneeAndBudgetSousProjetAndBudgetEntitiAdmin() {
    this._beas = [];
    this._bcbs = [];
    if (this.budgetEntiteAdministratifCreate!=null && this.budgetSousProjetCreate.referenceSousProjet!=null && this._budgetFaculteCreate!=null){
      this.http.get<BudgetEntiteAdministratifVo>(this._url_bea + 'referenceEntiteAdmin/' + this.budgetEntiteAdministratifCreate.referenceEntiteAdministratif + '/refSousProjet/' + this.budgetSousProjetCreate.referenceSousProjet + '/annee/' + this._budgetFaculteCreate.annee).subscribe(
        data => {
          this._beas.push(data);
        }, error => {
          console.log('error');
        }
      );
      this.http.get<Array<BudgetCompteBudgitaireVo>>(this._url_bcb + 'refEntite/' + this.budgetEntiteAdministratifCreate.referenceEntiteAdministratif + '/refsousProjet/' + this.budgetSousProjetCreate.referenceSousProjet + '/annee/' + this._budgetFaculteCreate.annee).subscribe(
        data => {
          this._bcbs = data;
        }, error => {
          console.log('error');
        }
      );
    }
  }

  public findAllSousProjet(){
    return this.http.get<Array<BudgetSousProjetVo>>(this._url_bsp+"all/sousprojet").subscribe(
      data=>{
        this._allSousProjet=data;
        console.log("find any sous projet success");
      },error1 => {
        console.log("can't find any sous projet");
      }
    )
  }

  public findAllByAnneeMinAndAnneeMax(){
       this.http.get<Array<BudgetFaculteVo>>(this._url_bf+"anneeMin/"+this.budgetFaculteCreate.annee+"/anneeMax/"+this.budgetFaculteCreate1.annee).subscribe(
        data=>{
          this.budgetFacultes=data;
          console.log("Data between found");
        },error1 => {
          console.log("No data between");
        }
      );

     this.http.get<Array<BudgetSousProjetVo>>(this._url_bsp+"anneeMin/"+this.budgetFaculteCreate.annee+"/anneeMax/"+this.budgetFaculteCreate1.annee).subscribe(
      data=>{
        this.budgetFaculteCreate.budgetSousProjetVo=data;
        console.log(data);
      },error1 => {
        console.log("No data between");
      }
    );

    this.http.get<Array<BudgetEntiteAdministratifVo>>(this._url_bea+"anneeMin/"+this.budgetFaculteCreate.annee+"/anneeMax/"+this.budgetFaculteCreate1.annee).subscribe(
      data=>{
        this._beas=data;
        console.log(data);
      },error1 => {
        console.log("No data between");
      }
    );

    this.http.get<Array<BudgetCompteBudgitaireVo>>(this._url_bcb+"anneeMin/"+this.budgetFaculteCreate.annee+"/anneeMax/"+this.budgetFaculteCreate1.annee).subscribe(
      data=>{
        this._bcbs=data;
        console.log(data);
      },error1 => {
        console.log("No data between");
      }
    );
  }
  public findAllEntiteAdministratif(){
    return this.http.get<Array<BudgetEntiteAdministratifVo>>(this._url_bea+"all/entiteadministratif").subscribe(
      data=>{
        this._allEntiteAdministratif=data;
        console.log("find any sous projet success");
      },error1 => {
        console.log("can't find any sous projet");
      }
    )
  }

  public refreshAllFromBf(){
    this.budgetFaculteCreate=new BudgetFaculteVo();
    this._budgetFaculteCreate.budgetSousProjetVo = [];
    this._beas = [];
    this._bcbs = [];
  }

  public refreshAllFromBsp(){
    this.budgetFaculteCreate=new BudgetFaculteVo();
    this._budgetFaculteCreate.budgetSousProjetVo = [];
    this._beas = [];
    this._bcbs = [];
  }

  public refreshAllFromBea(){
    this.budgetFaculteCreate=new BudgetFaculteVo();
    this._budgetFaculteCreate.budgetSousProjetVo = [];
    this._beas = [];
    this._bcbs = [];
  }

  get budgetFaculteCreate(): BudgetFaculteVo {
    return this._budgetFaculteCreate;
  }

  set budgetFaculteCreate(value: BudgetFaculteVo) {
    this._budgetFaculteCreate = value;
  }

  get budgetFaculteCreate1(): BudgetFaculteVo {
    return this._budgetFaculteCreate1;
  }

  set budgetFaculteCreate1(value: BudgetFaculteVo) {
    this._budgetFaculteCreate1 = value;
  }

  public selectedBsp(bsp:BudgetSousProjetVo){
    this.selectdeBudgetSp=bsp;
  }


  get allSousProjet(): Array<BudgetSousProjetVo> {
    return this._allSousProjet;
  }

  set allSousProjet(value: Array<BudgetSousProjetVo>) {
    this._allSousProjet = value;
  }

  get allEntiteAdministratif(): Array<BudgetEntiteAdministratifVo> {
    return this._allEntiteAdministratif;
  }

  set allEntiteAdministratif(value: Array<BudgetEntiteAdministratifVo>) {
    this._allEntiteAdministratif = value;
  }
}
