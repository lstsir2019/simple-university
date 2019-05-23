import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BudgetFaculteVo} from '../model/budget/budget-faculte.model';
import {BudgetSousProjetVo} from '../model/budget/budget-sous-projet.model';
import {BudgetProjetVo} from '../model/budget/budget-projet.model';
import {BudgetCompteBudgitaireVo} from '../model/budget/budget-compte-budgitaire.model';
import {CompteBudgitaireVo} from '../model/budget/compte-budgitaire.model';
import {DetaillesBudgetVo} from '../model/budget/detailles-budget.model';
import Swal from 'sweetalert2';
import {forEach} from '@angular/router/src/utils/collection';
import {Projet} from '../model/projet.model';
import {SousProjet} from '../model/sous-projet.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private http: HttpClient) {
  }

  //---------------------- Les urls----------------------------------
  public url_mandat = 'http://localhost:9999/';


  public _host = 'http://localhost:8099/budget-api/';

  public _url_bf = this._host + 'budget-facultes/';

  public _url_bsp = this._host + 'budget-sous-projets/';

  public _url_bp = this._host + 'budget-projets/';

  private _url_bcb = this._host + 'budget-compte-budgitaires/';

  private _url_cb = this._host + 'compte-budgitaires/';

  //------------------------------------------------------------------

  public budgetFacultePrincipal: BudgetFaculteVo = new BudgetFaculteVo(null, null);

  public budgetProjetPrincipal: BudgetProjetVo = new BudgetProjetVo(null, '');

  public budgetSousProjetPrincipal: BudgetSousProjetVo = new BudgetSousProjetVo(null, '');

  public budgetCompteBudgitairePrincipal: BudgetCompteBudgitaireVo = new BudgetCompteBudgitaireVo(null, '');

  //------------------------List of removed items --------------------------------------------------

  public budgetProjetRemoved: Array<BudgetProjetVo> = new Array<BudgetProjetVo>();

  public budgetSousProjetRemoved: Array<BudgetSousProjetVo> = new Array<BudgetSousProjetVo>();

  public budgetCompteBudgitaireRemoved: Array<BudgetCompteBudgitaireVo> = new Array<BudgetCompteBudgitaireVo>();

  //-------------------------------------------------------------------------------------------


  //----------------- Variables du pointage [(ngModel)] sur les formulaires--------------------
  public budgetFaculteCreate: BudgetFaculteVo = new BudgetFaculteVo(null, 2018);
  //variables du pointage [(ngModel)] sur les formulaires
  public budgetProjetCreate: BudgetProjetVo = new BudgetProjetVo(null, '');
  //variables du pointage [(ngModel)] sur les formulaires
  public budgetSousProjetCreate: BudgetSousProjetVo = new BudgetSousProjetVo(null, '');
  //variables du pointage [(ngModel)] sur les formulaires
  public budgetCompteBudgitaireCreate: BudgetCompteBudgitaireVo = new BudgetCompteBudgitaireVo(null, '');
  //---------------------------------------------------------------------------------------------

  //----------------------LIST of Compte Budgitaire ----------------------

  public compteBudgitaireList: Array<CompteBudgitaireVo> = new Array<CompteBudgitaireVo>();

  //---------------------------------------------------

  public allBudgetFaculte: Array<BudgetFaculteVo> = new Array<BudgetFaculteVo>();

  public AllProjet: Array<Projet> = new Array<Projet>();

  public sousProjetsByProjet: Array<SousProjet> = new Array<SousProjet>();

  //---------------------------------------------------

  //resultat de recheres par Annee Min and Max s'enregistrent dans ces variables
  public budgetFaculteList: Array<BudgetFaculteVo> = new Array<BudgetFaculteVo>();
  //variable de pointage [(ngModel)] du formulaire Search By Annee Min Max
  public budgetFaculteSearchByAnneeMinMax: BudgetFaculteVo = new BudgetFaculteVo(0);


  // ----------------------------- Methodes Find --------------------------

  public findAllBudgetFaculte() {
    this.http.get<Array<BudgetFaculteVo>>(this._url_bf).subscribe(
      data => {
        if (data == null || data.length == 0) {
          Swal.fire({
            type: 'error',
            title: 'Aucun informations trouvés',
            text: 'Something went wrong!'
          });
        }
        this.allBudgetFaculte = data;
      }, error1 => {
        Swal.fire({
          type: 'error',
          title: 'Aucun informations trouvés',
          text: 'Something went wrong!'
        });
        console.log('errrrrrrror ' + error1);
      }
    );
  }

  public findByAnneeMinAndMax() {
    this.http.post<Array<BudgetFaculteVo>>(this._url_bf + '/anneemin/anneemax/', this.budgetFaculteSearchByAnneeMinMax).subscribe(
      data => {
        if (data == null || data.length == 0) {
          Swal.fire({
            type: 'error',
            title: 'Aucun informations trouvés',
            text: 'Something went wrong!'
          });
        }
        this.budgetFaculteList = data;
      }, error1 => {
        Swal.fire({
          type: 'error',
          title: 'Aucun informations trouvés',
          text: 'Something went wrong!'
        });
        console.log('errrrrrrror ' + error1);
      }
    );
  }

  public findBudgetProjet(bf: BudgetFaculteVo) {
    this.budgetProjetPrincipal = new BudgetProjetVo();
    this.budgetSousProjetPrincipal = new BudgetSousProjetVo();
    this.budgetCompteBudgitairePrincipal = new BudgetCompteBudgitaireVo();
    this.budgetFacultePrincipal = bf;
    if (bf.budgetProjetVos == null || bf.budgetProjetVos.length == 0) {
      this.http.get<Array<BudgetProjetVo>>(this._url_bp + '/annee/' + bf.annee).subscribe(
        data => {
          if (data != null) {
            this.budgetFacultePrincipal.budgetProjetVos = data;
          } else {
            this.budgetFacultePrincipal.budgetProjetVos = new Array<BudgetProjetVo>();
          }
        }, error => {
          console.log('error');
        }
      );
    }
  }

  public findBudgetSousProjet(bp: BudgetProjetVo) {
    this.budgetSousProjetPrincipal = new BudgetSousProjetVo();
    this.budgetCompteBudgitairePrincipal = new BudgetCompteBudgitaireVo();
    this.budgetProjetPrincipal = bp;

    let index = this.budgetFacultePrincipal.budgetProjetVos.indexOf(this.budgetProjetPrincipal);
    if (bp.budgetSousProjetVos == null || bp.budgetSousProjetVos.length == 0) {
      this.http.get<Array<BudgetSousProjetVo>>(this._url_bsp + '/referenceprojet/' + bp.referenceProjet + '/annee/' + this.budgetFacultePrincipal.annee).subscribe(
        data => {
          if (data != null) {
            this.budgetFacultePrincipal.budgetProjetVos[index].budgetSousProjetVos = data;
            //this.budgetProjetPrincipal.budgetSousProjetVos = data;
          }
        }, error => {
          console.log('error');
        }
      );
    }


  }

  public findBudgetCompteBudgitaire(bsp: BudgetSousProjetVo) {
    this.budgetSousProjetPrincipal = bsp;
    this.budgetCompteBudgitairePrincipal = new BudgetCompteBudgitaireVo();

    let index = this.budgetFacultePrincipal.budgetProjetVos.indexOf(this.budgetProjetPrincipal);

    let indexSou = this.budgetFacultePrincipal.budgetProjetVos[index].budgetSousProjetVos.indexOf(this.budgetSousProjetPrincipal);


    if (bsp.budgetCompteBudgitaireVos == null || bsp.budgetCompteBudgitaireVos.length == 0) {
      this.http.get<Array<BudgetCompteBudgitaireVo>>(this._url_bcb + '/referenceprojet/' + this.budgetProjetPrincipal.referenceProjet + '/referencesousprojet/' + bsp.referenceSousProjet + '/annee/' + this.budgetFacultePrincipal.annee).subscribe(
        data => {
          if (data != null) {
            this.budgetFacultePrincipal.budgetProjetVos[index].budgetSousProjetVos[indexSou].budgetCompteBudgitaireVos = data;
            //   bsp.budgetCompteBudgitaireVos = data;
          }
        }, error => {
          console.log('error');
        }
      );
    }
  }

  //---------------------------Find All --------------------

  public findAllCompteBudgitaire() {
    this.http.get<Array<CompteBudgitaireVo>>(this._url_cb).subscribe(
      data => {
        if (data != null) {
          this.compteBudgitaireList = data;
          console.log(data);
        }
      }, error => {
        console.log('error');
      }
    );
  }

  public findAllProjet() {
    this.http.get<Array<Projet>>(this.url_mandat + 'projet/projets/projetAll/').subscribe(
      data => {
        if (data != null) {
          this.AllProjet = data;
          console.log(data);
        }
      }, error => {
        console.log('error');
      }
    );

  }

  public findSousProjetByProjet() {
    let p = this.AllProjet.find(a => a.libelleP == this.budgetProjetPrincipal.referenceProjet);
    this.sousProjetsByProjet = p.sousProjetsVo;
  }


  // ------------------------- Ajouter New Budget -------------------------

  public saveBudgetFaculte() {
    this.http.post<BudgetFaculteVo>(this._url_bf, this.budgetFaculteCreate).subscribe(
      data => {
        console.log('new Budget Create' + data.annee);
        Swal.fire({
          type: 'success',
          title: 'succés',
          text: 'Sauvegardé avec succées!'
        });
        //this.budgetFaculteList.push(data);
      }, error1 => {
        console.log('errror');
      }
    );
  }

  public ajouterNewBudgetProjet() {
    let bp = new BudgetProjetVo(null, this.budgetProjetCreate.referenceProjet);
    let detaills = new DetaillesBudgetVo(this.budgetProjetCreate.detaillesBudgetVo.antecedent, this.budgetProjetCreate.detaillesBudgetVo.creditOuvertEstimatif, this.budgetProjetCreate.detaillesBudgetVo.creditOuvertReel);
    detaills.engageNonPaye = this.budgetProjetCreate.detaillesBudgetVo.engageNonPaye;
    detaills.engagePaye = this.budgetProjetCreate.detaillesBudgetVo.engagePaye;
    detaills.id = null;
    bp.detaillesBudgetVo = detaills;
    this.budgetFacultePrincipal.budgetProjetVos.push(bp);
    this.calculedetailleBudgetFaculte(this.budgetFacultePrincipal, this.budgetFacultePrincipal.budgetProjetVos);
    this.budgetProjetCreate = new BudgetProjetVo();
  }

  public ajouterNewBudgetSousProjet() {
    let bsp = new BudgetSousProjetVo(null, this.budgetSousProjetCreate.referenceSousProjet);
    let detaills = new DetaillesBudgetVo(this.budgetSousProjetCreate.detaillesBudgetVo.antecedent, this.budgetSousProjetCreate.detaillesBudgetVo.creditOuvertEstimatif, this.budgetSousProjetCreate.detaillesBudgetVo.creditOuvertReel);
    detaills.engageNonPaye = this.budgetSousProjetCreate.detaillesBudgetVo.engageNonPaye;
    detaills.engagePaye = this.budgetSousProjetCreate.detaillesBudgetVo.engagePaye;
    detaills.id = null;
    bsp.detaillesBudgetVo = detaills;
    console.log(this.budgetSousProjetCreate);
    let index = this.budgetFacultePrincipal.budgetProjetVos.indexOf(this.budgetProjetPrincipal);
    this.budgetFacultePrincipal.budgetProjetVos[index].budgetSousProjetVos.push(bsp);
    console.log(bsp);
    this.calculedetailleBudgetProjet(this.budgetFacultePrincipal.budgetProjetVos[index], this.budgetFacultePrincipal.budgetProjetVos[index].budgetSousProjetVos);
    this.budgetSousProjetCreate = new BudgetSousProjetVo();
    // this.budgetProjetPrincipal.budgetSousProjetVos.push(bsp);
  }

  public ajouterNewBudgetCompteBudegtaireProjet() {
    let bcb = new BudgetCompteBudgitaireVo(this.budgetCompteBudgitaireCreate.id, this.budgetCompteBudgitaireCreate.reference);
    //clone Detaills
    let detaills = new DetaillesBudgetVo(this.budgetCompteBudgitaireCreate.detaillesBudgetVo.antecedent, this.budgetCompteBudgitaireCreate.detaillesBudgetVo.creditOuvertEstimatif, this.budgetCompteBudgitaireCreate.detaillesBudgetVo.creditOuvertReel);
    detaills.engageNonPaye = this.budgetCompteBudgitaireCreate.detaillesBudgetVo.engageNonPaye;
    detaills.engagePaye = this.budgetCompteBudgitaireCreate.detaillesBudgetVo.engagePaye;
    detaills.id = null;
    //clone CompteBudgitaireVo
    let CompteBudgitaireVoClone = new CompteBudgitaireVo(this.budgetCompteBudgitaireCreate.compteBudgitaireVo.id, this.budgetCompteBudgitaireCreate.compteBudgitaireVo.code, this.budgetCompteBudgitaireCreate.compteBudgitaireVo.libelle);
    bcb.detaillesBudgetVo = detaills;
    bcb.compteBudgitaireVo = CompteBudgitaireVoClone;
    let index = this.budgetFacultePrincipal.budgetProjetVos.indexOf(this.budgetProjetPrincipal);
    let indexSou = this.budgetFacultePrincipal.budgetProjetVos[index].budgetSousProjetVos.indexOf(this.budgetSousProjetPrincipal);
    this.budgetFacultePrincipal.budgetProjetVos[index].budgetSousProjetVos[indexSou].budgetCompteBudgitaireVos.push(bcb);
    this.calculedetailleBudgetSousProjet(this.budgetFacultePrincipal.budgetProjetVos[index].budgetSousProjetVos[indexSou], this.budgetFacultePrincipal.budgetProjetVos[index].budgetSousProjetVos[indexSou].budgetCompteBudgitaireVos);
    this.budgetCompteBudgitaireCreate = new BudgetCompteBudgitaireVo();
    //this.budgetSousProjetPrincipal.budgetCompteBudgitaireVos.push(bcb);
  }

  //---------------------------  Budget Detailles --------------------------
  public detail: DetaillesBudgetVo = new DetaillesBudgetVo();

  public detaillBudgetFaculte(bf: BudgetFaculteVo) {
    this.detail = bf.detaillesBudgetVo;
  }

  public detaillBudgetProjet(bp: BudgetProjetVo) {
    this.detail = bp.detaillesBudgetVo;
  }

  public detaillBudgetSousProjet(bsp: BudgetSousProjetVo) {
    this.detail = bsp.detaillesBudgetVo;
  }

  public detaillBudgetCompteBudgitaire(bcb: BudgetCompteBudgitaireVo) {
    this.detail = bcb.detaillesBudgetVo;
  }

  //----------------------Remove Budget -----------------------------------

  public removeBudgetProjet(bp: BudgetProjetVo) {
    if (bp != null) {
      if (bp.id != null) {
        let bpClone = bp;
        this.budgetProjetRemoved.push(bpClone);
      }
      let index = this.budgetFacultePrincipal.budgetProjetVos.indexOf(bp);
      this.budgetFacultePrincipal.budgetProjetVos.splice(index, 1);
      this.calculedetailleBudgetFaculte(this.budgetFacultePrincipal, this.budgetFacultePrincipal.budgetProjetVos);
      console.log(this.budgetProjetRemoved);
      console.log(this.budgetFacultePrincipal.budgetProjetVos);
    }
  }

  public removeBudgetSousProjet(bsp: BudgetSousProjetVo) {
    if (bsp != null) {
      if (bsp.id != null) {
        let bspClone = bsp;
        this.budgetSousProjetRemoved.push(bspClone);
      }
      let index = this.budgetFacultePrincipal.budgetProjetVos.indexOf(this.budgetProjetPrincipal);
      let indexSP = this.budgetFacultePrincipal.budgetProjetVos[index].budgetSousProjetVos.indexOf(bsp);
      this.budgetFacultePrincipal.budgetProjetVos[index].budgetSousProjetVos.splice(indexSP, 1);
      this.calculedetailleBudgetProjet(this.budgetFacultePrincipal.budgetProjetVos[index], this.budgetFacultePrincipal.budgetProjetVos[index].budgetSousProjetVos);

      console.log(this.budgetProjetRemoved);
      console.log(this.budgetFacultePrincipal.budgetProjetVos);
    }
  }

  public removeBudgetCompteBudgitaire(bcb: BudgetCompteBudgitaireVo) {
    if (bcb != null) {
      if (bcb.id != null) {
        let bcbClone = bcb;
        this.budgetCompteBudgitaireRemoved.push(bcbClone);
      }
      let index = this.budgetFacultePrincipal.budgetProjetVos.indexOf(this.budgetProjetPrincipal);
      let indexSP = this.budgetFacultePrincipal.budgetProjetVos[index].budgetSousProjetVos.indexOf(this.budgetSousProjetPrincipal);
      let indexCB = this.budgetFacultePrincipal.budgetProjetVos[index].budgetSousProjetVos[indexSP].budgetCompteBudgitaireVos.indexOf(bcb);
      this.budgetFacultePrincipal.budgetProjetVos[index].budgetSousProjetVos[indexSP].budgetCompteBudgitaireVos.splice(indexCB, 1);
      this.calculedetailleBudgetSousProjet(this.budgetFacultePrincipal.budgetProjetVos[index].budgetSousProjetVos[indexSP], this.budgetFacultePrincipal.budgetProjetVos[index].budgetSousProjetVos[indexSP].budgetCompteBudgitaireVos);
      console.log(this.budgetProjetRemoved);
      console.log(this.budgetFacultePrincipal.budgetProjetVos);
    }

  }

  //-------------------------------- les Calcules --------------------------

  public calculedetailleBudgetFaculte(bf: BudgetFaculteVo, BudgetProjetVos: Array<BudgetProjetVo>) {
    let reliquatEstimatif = 0;
    let reliquatReel = 0;
    BudgetProjetVos.forEach(bsp => {
      reliquatEstimatif += parseFloat(bsp.detaillesBudgetVo.creditOuvertEstimatif);
      reliquatReel += parseFloat(bsp.detaillesBudgetVo.creditOuvertReel);
    });
    bf.detaillesBudgetVo.reliquatReel = reliquatReel.toString();
    bf.detaillesBudgetVo.reliquatEstimatif = reliquatEstimatif.toString();
  }

  public calculedetailleBudgetProjet(bp: BudgetProjetVo, budgetSousProjetVos: Array<BudgetSousProjetVo>) {
    let reliquatEstimatif = 0;
    let reliquatReel = 0;
    budgetSousProjetVos.forEach(bsp => {
      reliquatEstimatif += parseFloat(bsp.detaillesBudgetVo.creditOuvertEstimatif);
      reliquatReel += parseFloat(bsp.detaillesBudgetVo.creditOuvertReel);
    });
    bp.detaillesBudgetVo.reliquatReel = reliquatReel.toString();
    bp.detaillesBudgetVo.reliquatEstimatif = reliquatEstimatif.toString();
  }

  public calculedetailleBudgetSousProjet(bsp: BudgetSousProjetVo, budgetCompteBudgitaireVo: Array<BudgetCompteBudgitaireVo>) {
    let reliquatEstimatif = 0;
    let reliquatReel = 0;
    budgetCompteBudgitaireVo.forEach(bsp => {
      reliquatEstimatif += parseFloat(bsp.detaillesBudgetVo.creditOuvertEstimatif);
      reliquatReel += parseFloat(bsp.detaillesBudgetVo.creditOuvertReel);
    });
    bsp.detaillesBudgetVo.reliquatReel = reliquatReel.toString();
    bsp.detaillesBudgetVo.reliquatEstimatif = reliquatEstimatif.toString();
  }


  //-------------------------------------------------------------------

  public deleteBudgetFaculte(bf: BudgetFaculteVo) {
    Swal.fire({
      title: 'Etes-vous sure?',
      text: 'Vous ne pouvez pas revenir en arrière!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.value) {
        if (bf.annee != null) {
          this.http.delete(this._url_bf + 'annee/' + bf.annee).subscribe(
            data => {
            }, error => {
              console.log(error);
            }
          );
        }
        Swal.fire(
          'Supprimmé!',
          'Vos données ont été supprimés.',
          'success'
        );
      }
    });
  }

  private deleteBudgetProjet() {
    console.log('hello Let\'s remove');
    this.budgetProjetRemoved.forEach(bp => {
        console.log('hhhhhhhhhhhhhh' + bp.id);
        this.http.delete(this._url_bp + '/' + bp.id).subscribe(
          data => {
            console.log('removed' + bp.id);
          }
        );
      }
    );
  }

  private deleteBudgetSousProjet() {
    this.budgetSousProjetRemoved.forEach(bsp => {
        this.http.delete(this._url_bsp + '/' + bsp.id).subscribe(
          data => {
            console.log('removed' + bsp.id);
          }
        );
      }
    );
  }

  private deleteBudgetCompteBudgitaire() {
    this.budgetCompteBudgitaireRemoved.forEach(bcb => {
        this.http.delete(this._url_bcb + '/' + bcb.id).subscribe(
          data => {
            console.log('removed' + bcb.id);
          }
        );
      }
    );
    this.budgetCompteBudgitaireRemoved = new Array<BudgetCompteBudgitaireVo>();
  }


  //--------------------Confiramation----------------------------------

  public confirmeBudgetFaculte() {

    this.deleteBudgetCompteBudgitaire();
    this.deleteBudgetSousProjet();
    this.deleteBudgetProjet();

    this.http.post(this._url_bf, this.budgetFacultePrincipal).subscribe(
      data => {
        this.budgetCompteBudgitairePrincipal = new BudgetCompteBudgitaireVo(null, '');
        this.budgetSousProjetPrincipal = new BudgetSousProjetVo(null, '');
        this.budgetProjetPrincipal = new BudgetProjetVo(null, '');
        this.budgetFacultePrincipal = new BudgetFaculteVo();
        this.budgetFaculteList = new Array<BudgetFaculteVo>();
        Swal.fire({
          type: 'success',
          title: 'succés',
          text: 'Sauvegardé avec succées!'
        });
      }, error1 => {
        console.log('errrorr' + error1.toString());
      }
    );
  }


  //-------------------------------------------------------------------


  /* let bfClone=new BudgetFaculteVo(bf.id,bf.annee);
   let detaills=new DetaillesBudgetVo(bf.detaillesBudgetVo.antecedent,bf.detaillesBudgetVo.creditOuvertEstimatif,bf.detaillesBudgetVo.creditOuvertReel);
   detaills.engageNonPaye=bf.detaillesBudgetVo.engageNonPaye;
   detaills.engagePaye=bf.detaillesBudgetVo.engagePaye;
   detaills.reliquatEstimatif=bf.detaillesBudgetVo.reliquatEstimatif;
   detaills.reliquatReel=bf.detaillesBudgetVo.reliquatReel;
   detaills.reliquatPayeEstimatif=bf.detaillesBudgetVo.reliquatPayeEstimatif;
   detaills.reliquatPayereel=bf.detaillesBudgetVo.reliquatPayereel;
   detaills.reliquatNonPayeEstimatif=bf.detaillesBudgetVo.reliquatNonPayeEstimatif;
   detaills.reliquatNonPayReel=bf.detaillesBudgetVo.reliquatNonPayReel;
   detaills.id=bf.detaillesBudgetVo.id;
   bfClone.detaillesBudgetVo=detaills;*/


  //permet d'ajouter le budget entite administratif

  //permet d'ajouter le budget compte budgitaire

  //permet de sauvegarder l'objet tout entier


  /* DELETE: delete the budgetFaculte from the server */


  /* DELETE: delete the budget sous projet from the server */
  /*public deleteBudgetSousProjet(bsp:BudgetSousProjetVo) {
    if (bsp.id == 0) {
    const index: number ;//= this.budgetFacultePrincipal.budgetProjetVos..indexOf(bsp);
      if (index !== -1) {
      //  this._budgetFaculteCreate.budgetSousProjetVo.splice(index, 1);
      }
    } else {
      Swal({
        title: 'Etes-vous sure?',
        text: 'Vous ne pouvez pas revenir en arrière!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer!'
      }).then((result) => {
        if (result.value) {
          this.http.delete(this._url_bsp + 'referenceSousProjet/' + bsp.referenceSousProjet + '/annee/' + bsp.budgetFaculteVo.annee).subscribe(
            data => {
              Swal(
                'Supprimmé!',
                'Vos données ont été supprimés.',
                'success'
              );
              if (this._budgetSousProjetCreate.referenceSousProjet == undefined || null) {
                console.log('bonsoir');
                this.findAllByAnnee();
              } else if (this._budgetEntiteAdministratifCreate.referenceEntiteAdministratif == undefined || null) {
                this.findAllByAnneeAndBudgetSousProjet();
              } else {
                this.findAllByAnneeAndBudgetSousProjetAndBudgetEntitiAdmin();
              }
            }, error => {
              console.log(error);
            }
          );
        }
      });
    }
  }
*/
  /* DELETE: delete the budget sous entite administratif from the server */

  /* DELETE: delete the budget budget compte cudgitaire from the server */

  //find By creteria annee

  // find by annee et RefSousProjet

  //find by Annee et refSousProjet et refEntitéAdministratif

  //searchAllByCriteriaAnneMinAndAnneMax

  //find all info by annee min and annee max


  //permet de rafraichair les champs en se basant sur l'objet supprimmé

  //update budget Faculte
  /*public updateBudgetFaculte(){
    let _bfFind:BudgetFaculteVo=this._budgetFacultes.find(bf=>bf.annee==this._budgetFaculteCreate.annee);
    let budgetFaculteClone:BudgetFaculteVo=new BudgetFaculteVo();
    let reelConsomme=parseFloat(_bfFind.detaillesBudgetVo.creditOuvertReel)-parseFloat(_bfFind.detaillesBudgetVo.reliquatReel);
    let estimatifConsomme=parseFloat(_bfFind.detaillesBudgetVo.reliquatEstimatif)-parseFloat(_bfFind.detaillesBudgetVo.reliquatEstimatif);
    if (parseFloat(this._budgetFaculteCreate.detaillesBudgetVo.creditOuvertReel)<reelConsomme|| parseFloat(this._budgetFaculteCreate.detaillesBudgetVo.creditOuvertEstimatif)<estimatifConsomme){
      Swal({
        type: 'error',
        title: 'Error',
        text: 'Le reliquat Estimatif/Reel n\'est pas suffisant \n pour les sous projet!'
      });
    }
  }*/

  //update budget sous projet

  //update budget sous projet


}

