import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BudgetFaculteVo} from '../model/budget/budget-faculte.model';
import {BudgetSousProjetVo} from '../model/budget/budget-sous-projet.model';
import {BudgetEntiteAdministratifVo} from '../model/budget/budget-entite-administratif.model';
import {BudgetCompteBudgitaireVo} from '../model/budget/budget-compte-budgitaire.model';
import {CompteBudgitaireVo} from '../model/budget/compte-budgitaire.model';
import {DetaillesBudget} from '../model/budget/detailles-budget.model';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import Swal from 'sweetalert2';

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

  public budgetSousProjets:Array<BudgetSousProjetVo>=[];
  //detailles budget vo pour chaque composant
  public detaillesBudgetVo1: DetaillesBudget = new DetaillesBudget();
  public detaillesBudgetVo2: DetaillesBudget = new DetaillesBudget();
  public detaillesBudgetVo3: DetaillesBudget = new DetaillesBudget();
  //selected objects
  public selectdeBudgetSp:BudgetSousProjetVo=new BudgetSousProjetVo();
  //resultat de recheres s'enregistrent dans ces variables
  public budgetFacultes:Array<BudgetFaculteVo> = [];
  private _bsps: Array<BudgetSousProjetVo> = [];
  private _beas: Array<BudgetEntiteAdministratifVo> = [];
  private _bcbs: Array<BudgetCompteBudgitaireVo> = [];
  //findAll
  private _allSousProjet:Array<BudgetSousProjetVo> = [];
  private _allEntiteAdministratif:Array<BudgetEntiteAdministratifVo> = [];

  //permet d'ajouter le budget Sous Projet
  public addBudgetSousProjet() {
    const bspClone: BudgetSousProjetVo = new BudgetSousProjetVo(0, this.budgetSousProjetCreate.referenceSousProjet);
    bspClone.detaillesBudgetVo = this.detaillesBudgetVo1;
    this._budgetFaculteCreate.budgetSousProjetVo.push(bspClone);
    this._bsps.push(bspClone);
    this.detaillesBudgetVo1 = new DetaillesBudget();
  }
  //permet d'ajouter le budget entite administratif
  public addBudgetEntiteAdministratif() {
    this._budgetFaculteCreate.budgetSousProjetVo.forEach(bsp => {
      if (bsp.referenceSousProjet === this.budgetSousProjetCreateClone1.referenceSousProjet) {
        let beaClone: BudgetEntiteAdministratifVo = new BudgetEntiteAdministratifVo(0, this.budgetEntiteAdministratifCreate.referenceEntiteAdministratif);
        beaClone.detaillesBudgetVo = this.detaillesBudgetVo2;
        bsp.budgetEntiteAdministratifVo.push(beaClone);
        //beaClone.budgetSousProjetVo=bsp;
        this._beas.push(beaClone);
        //beaClone=new BudgetEntiteAdministratif();
        this.detaillesBudgetVo2 = new DetaillesBudget();
      }
    });
  }
  //permet d'ajouter le budget compte budgitaire
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
            this._bcbs.push(bcbClone);
            //bcbClone=new BudgetCompteBudgitaire();
            this.detaillesBudgetVo3 = new DetaillesBudget();
            this.compteBudgitaireCreate = new CompteBudgitaireVo();
          }
        });
      }
    });
  }
  //permet de sauvegarder l'objet tout entier
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
    return this.http.delete(this._url_bf + 'annee/' + annee).pipe(
      tap(_ => console.log('Deleted budget faculte with annee = ' + annee)),
      catchError(error => of(null))
    );
  }
  /* DELETE: delete the budget sous projet from the server */
  public deleteBudgetSousProjet(bsp:BudgetSousProjetVo) {
    return this.http.delete(this._url_bsp + 'referenceSousProjet/'+bsp.referenceSousProjet+'/annee/' + bsp.budgetFaculteVo.annee).pipe(
      tap(_ => console.log('Deleted budget sous projet with annee = ' + bsp.budgetFaculteVo.annee)),
      catchError(error => of(null))
    );
  }
  /* DELETE: delete the budget sous entite administratif from the server */
  public deleteBudgetEntiteAdmin(refEntitAdmin: string,refSousProjet: string, annee: number) {
    return this.http.delete(this._url_bea + 'referenceEntiteAdmin/' + refEntitAdmin + '/referenceSousProjet/' + refSousProjet + '/annee/' + annee).pipe(
      tap(_ => console.log('Deleted budget compte budgitaire with annee = ' + annee)),
      catchError(error => of(null))
    );
  }
  /* DELETE: delete the budget budget compte cudgitaire from the server */
  public deleteBudgetCompteBudgitaire(referenceCompteBudgitaire:string) {
    return this.http.delete(this._url_bcb + 'referenceCompteBudgitaire/'+referenceCompteBudgitaire).pipe(
      tap(_ => console.log('Deleted budget entite admin with annee = ')),
      catchError(error => of(null))
    );
  }
  //find By creteria annee
  public findAllByAnnee() {
    if (this._budgetFaculteCreate == null || this._budgetFaculteCreate.annee>(new Date().getFullYear())) {
      Swal({
        type: 'error',
        title: 'Merci de saisir une année valide',
        text: 'Infos saisies invalide!'
      });
    } else {
      this.http.get<BudgetFaculteVo>(this._url_bf + 'annee/' + this._budgetFaculteCreate.annee).subscribe(
        data => {
          //this._budgetFaculteCreate=new BudgetFaculteVo();
          if (data != null) {
            this.budgetFacultes = [];
            this.budgetFacultes.push(data);
          } else {
            Swal({
              type: 'error',
              title: 'Aucun informations trouvés',
              text: 'Something went wrong!'
            });
            this.budgetFacultes = [];
          }
        }, error => {
          Swal({
            type: 'warning',
            title: 'Le serveur est implanté',
            text: 'Something went wrong!'
          });
          console.log(error);
        }
      );
      this.http.get<Array<BudgetSousProjetVo>>(this._url_bsp + 'annee/' + this._budgetFaculteCreate.annee).subscribe(
        data => {
          if (data != null) {
            this._bsps = [];
            this._bsps = data;
          } else {
            Swal({
              type: 'error',
              title: 'Aucun informations trouvés',
              text: 'Something went wrong!'
            });
            this._bsps = [];
          }
        }, error => {
          console.log(error);
        }
      );
      this.http.get<Array<BudgetEntiteAdministratifVo>>(this._url_bea + 'annee/' + this._budgetFaculteCreate.annee).subscribe(
        data => {
          if (data != null) {
            this._beas = [];
            this._beas = data;
          } else {
            Swal({
              type: 'error',
              title: 'Aucun informations trouvés',
              text: 'Something went wrong!'
            });
            this._beas = [];
          }
        }, error => {
          console.log(error);
        }
      );
      this.http.get<Array<BudgetCompteBudgitaireVo>>(this._url_bcb + 'annee/' + this._budgetFaculteCreate.annee).subscribe(
        data => {
          if (data != null) {
            this._bcbs = [];
            this._bcbs = data;
          } else {
            Swal({
              type: 'error',
              title: 'Aucun informations trouvés',
              text: 'Something went wrong!'
            });
            this._bcbs = [];
          }
        }, error => {
          console.log(error);
        }
      );
    }
  }
  // find by annee et RefSousProjet
  public findAllByAnneeAndBudgetSousProjet() {
    if (this.budgetFaculteCreate!=null && this.budgetSousProjetCreate!=null){
      this.http.get<BudgetSousProjetVo>(this._url_bsp + 'reference/' + this.budgetSousProjetCreate.referenceSousProjet + '/annee/' + this._budgetFaculteCreate.annee).subscribe(
        data => {
          if (data!=null){
            this._bsps=[];
            this._bsps.push(data);
          }else{
            Swal({
              type: 'error',
              title: 'Aucun informations trouvés',
              text: 'Something went wrong!'
            });
            this._bsps=[];
          }
        }, error => {
          console.log(error);
        }
      );
      this.http.get<Array<BudgetEntiteAdministratifVo>>(this._url_bea + 'refSousProjet/' + this.budgetSousProjetCreate.referenceSousProjet + '/annee/' + this._budgetFaculteCreate.annee).subscribe(
        data => {
          if (data!=null){
            this._beas = [];
            this._beas = data;
          }else{
            Swal({
              type: 'error',
              title: 'Aucun informations trouvés',
              text: 'Something went wrong!'
            });
            this._beas = [];
          }
        }, error => {
          console.log(error);
        }
      );
      this.http.get<Array<BudgetCompteBudgitaireVo>>(this._url_bcb + 'reference/' + this.budgetSousProjetCreate.referenceSousProjet + '/annee/' + this._budgetFaculteCreate.annee).subscribe(
        data => {
          if (data!=null){
            this._bcbs = [];
            this._bcbs = data;
          }else{
            Swal({
              type: 'error',
              title: 'Aucun informations trouvés',
              text: 'Something went wrong!'
            });
            this._bcbs = [];
          }
        }, error => {
          console.log(error);
        }
      );
    }
  }
  //find by Annee et refSousProjet et refEntitéAdministratif
  public findAllByAnneeAndBudgetSousProjetAndBudgetEntitiAdmin() {
    if (this.budgetEntiteAdministratifCreate!=null && this.budgetSousProjetCreate.referenceSousProjet!=null && this._budgetFaculteCreate!=null){
      this.http.get<BudgetEntiteAdministratifVo>(this._url_bea + 'referenceEntiteAdmin/' + this.budgetEntiteAdministratifCreate.referenceEntiteAdministratif + '/refSousProjet/' + this.budgetSousProjetCreate.referenceSousProjet + '/annee/' + this._budgetFaculteCreate.annee).subscribe(
        data => {
          if (data!=null){
            this._beas=[];
            this._beas.push(data);
          } else{
            Swal({
              type: 'error',
              title: 'Aucun informations trouvés',
              text: 'Something went wrong!'
            });
            this._beas=[];
          }
        }, error => {
          console.log(error);
        }
      );
      this.http.get<Array<BudgetCompteBudgitaireVo>>(this._url_bcb + 'refEntite/' + this.budgetEntiteAdministratifCreate.referenceEntiteAdministratif + '/refsousProjet/' + this.budgetSousProjetCreate.referenceSousProjet + '/annee/' + this._budgetFaculteCreate.annee).subscribe(
        data => {
          if (data!=null){
            this._bcbs=[];
            this._bcbs = data;
          } else{
            Swal({
              type: 'error',
              title: 'Aucun informations trouvés',
              text: 'Something went wrong!'
            });
            this._bcbs=[];
          }
        }, error => {
          console.log(error);
        }
      );
    }
  }
  //full in comboboxes with references sous projet and entite administratif
  public findAllSousProjet(){
    return this.http.get<Array<BudgetSousProjetVo>>(this._url_bsp+"all/sousprojet").subscribe(
      data=>{
        if (data!=null){
          this._allSousProjet=[];
          this._allSousProjet=data;
        } else{
          Swal({
            type: 'error',
            title: 'Aucun informations trouvés',
            text: 'Something went wrong!'
          });
          this._allSousProjet=[];
        }
      },error => {
        console.log(error);
      }
    )
  }
  public findAllEntiteAdministratif(){
    return this.http.get<Array<BudgetEntiteAdministratifVo>>(this._url_bea+"all/entiteadministratif").subscribe(
      data=>{
        if (data!=null){
          this._allEntiteAdministratif=[];
          this._allEntiteAdministratif=data;
        } else{
          Swal({
            type: 'error',
            title: 'Aucun informations trouvés',
            text: 'Something went wrong!'
          });
          this._allEntiteAdministratif=[];
        }
      },error => {
        console.log(error);
      }
    )
  }
  //find all info by annee min and annee max
  public findAllByAnneeMinAndAnneeMax(){
       this.http.get<Array<BudgetFaculteVo>>(this._url_bf+"anneeMin/"+this.budgetFaculteCreate.annee+"/anneeMax/"+this.budgetFaculteCreate1.annee).subscribe(
        data=>{
          if (data!=null){
            this.budgetFacultes=[];
            this.budgetFacultes=data;
          } else{
            Swal({
              type: 'error',
              title: 'Aucun informations trouvés',
              text: 'Something went wrong!'
            });
            this.budgetFacultes=[];
          }
          console.log("Data between found");
        },error1 => {
          console.log("No data between");
        }
      );
     this.http.get<Array<BudgetSousProjetVo>>(this._url_bsp+"anneeMin/"+this.budgetFaculteCreate.annee+"/anneeMax/"+this.budgetFaculteCreate1.annee).subscribe(
      data=>{
        if (data!=null){
          this._bsps=[];
          this._bsps=data;
        } else{
          Swal({
            type: 'error',
            title: 'Aucun informations trouvés',
            text: 'Something went wrong!'
          });
          this._bsps=[];
        }
      },error1 => {
        console.log(error1);
      }
    );

    this.http.get<Array<BudgetEntiteAdministratifVo>>(this._url_bea+"anneeMin/"+this.budgetFaculteCreate.annee+"/anneeMax/"+this.budgetFaculteCreate1.annee).subscribe(
      data=>{
        if (data!=null){
          this._beas=[];
          this._beas=data;
        } else{
          Swal({
            type: 'error',
            title: 'Aucun informations trouvés',
            text: 'Something went wrong!'
          });
          this._beas=[];
        }
      },error => {
        console.log(error);
      }
    );

    this.http.get<Array<BudgetCompteBudgitaireVo>>(this._url_bcb+"anneeMin/"+this.budgetFaculteCreate.annee+"/anneeMax/"+this.budgetFaculteCreate1.annee).subscribe(
      data=>{
        if (data!=null) {
          this._bcbs=[];
          this._bcbs=data;
        }else{
          Swal({
            type: 'error',
            title: 'Aucun informations trouvés',
            text: 'Something went wrong!'
          });
          this._bcbs=[];
        }
      },error => {
        console.log(error);
      }
    );
  }
  //permet de rafraichair les champs en se basant sur l'objet supprimmé
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
  //update budget sous projet
  public updateBudgetSousProjet(refSousProjet:string){
    this._bsps.forEach(bsp=>{
      if (bsp.referenceSousProjet==refSousProjet){
        bsp.detaillesBudgetVo=this.detaillesBudgetVo1;
        this.detaillesBudgetVo1=new DetaillesBudget();
      }
    });
  }
  //update budget sous projet
  public updateBudgetEntiteAdministratif(refEntiteAdministratif:string){
    this._beas.forEach(bea=>{
      if (bea.referenceEntiteAdministratif==refEntiteAdministratif){
        bea.detaillesBudgetVo=this.detaillesBudgetVo2;
        this.detaillesBudgetVo2=new DetaillesBudget();
      }
    });
  }
  public updateBudgetCompteBudgitaire(refCompteBudgitaire:string){
    this._bcbs.forEach(bcb=>{
      if (bcb.referenceCompteBudgitaire==refCompteBudgitaire){
        bcb.detaillesBudgetVo=this.detaillesBudgetVo3;
        bcb.compteBudgitaireVo=this.compteBudgitaireCreate;
        this.detaillesBudgetVo3=new DetaillesBudget();
        this.compteBudgitaireCreate=new CompteBudgitaireVo();
      }
    });
  }
  //gettters and setters
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
  get bsps(): Array<BudgetSousProjetVo> {
    return this._bsps;
  }
  get beas(): Array<BudgetEntiteAdministratifVo> {
    if (this._beas==null){
      this._beas=[];
    }
    return this._beas;
  }
  get bcbs(): Array<BudgetCompteBudgitaireVo> {
    if (this._bcbs == null) {
      this._bcbs = [];
    }
    return this._bcbs;
  }
}
