import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BudgetFaculteVo} from '../model/budget/budget-faculte.model';
import {BudgetSousProjetVo} from '../model/budget/budget-sous-projet.model';
import {BudgetProjetVo} from '../model/budget/budget-projet.model';
import {BudgetCompteBudgitaireVo} from '../model/budget/budget-compte-budgitaire.model';
import {CompteBudgitaireVo} from '../model/budget/compte-budgitaire.model';
import {DetaillesBudgetVo} from '../model/budget/detailles-budget.model';
import Swal from 'sweetalert2';
import {Projet} from '../model/projet.model';
import {SousProjet} from '../model/sous-projet.model';
import {BudgetCompteBudgitaireComponent} from '../../budget/Opperation/budget-compte-budgitaire/budget-compte-budgitaire.component';
import {BudgetFaculteComponent} from '../../budget/Opperation/budget-faculte/budget-faculte.component';
import {BudgetProjetComponent} from '../../budget/Opperation/budget-projet/budget-projet.component';
import {BudgetSousProjetComponent} from '../../budget/Opperation/budget-sous-projet/budget-sous-projet.component';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private http: HttpClient) {
  }

  //---------------------- Les urls----------------------------------
  public url_mandat = 'http://localhost:9999/';


  public _host = 'http://localhost:4883/budget-api/';

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
//-----------------------------------------------------------------
  public budgetFaculteExpo: BudgetFaculteVo = new BudgetFaculteVo(null, null);

  public budgetProjetExpo: BudgetProjetVo = new BudgetProjetVo(null, '');

  public budgetSousProjetExpo: BudgetSousProjetVo = new BudgetSousProjetVo(null, '');

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
  public compteBudgitaire: CompteBudgitaireVo = new CompteBudgitaireVo(null, '', '');

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

  public findBudgetProjetRest(annee: number) {
    return this.http.get<Array<BudgetProjetVo>>(this._url_bp + '/annee/' + annee);
  }

  public findBudgetProjet(bf: BudgetFaculteVo) {
    this.budgetProjetPrincipal = new BudgetProjetVo();
    this.budgetSousProjetPrincipal = new BudgetSousProjetVo();
    this.budgetCompteBudgitairePrincipal = new BudgetCompteBudgitaireVo();
    this.budgetFacultePrincipal = bf;
    if (bf.budgetProjetVos == null || bf.budgetProjetVos.length == 0) {
      this.findBudgetProjetRest(bf.annee).subscribe(
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

  public findBudgetProjetExpo(bf: BudgetFaculteVo) {
    this.budgetProjetExpo = new BudgetProjetVo();
    this.budgetSousProjetExpo = new BudgetSousProjetVo();
    this.budgetFaculteExpo = bf;
    if (bf.budgetProjetVos == null || bf.budgetProjetVos.length == 0) {
      this.findBudgetProjetRest(bf.annee).subscribe(
        data => {
          if (data != null) {
            this.budgetFaculteExpo.budgetProjetVos = data;
          } else {
            this.budgetFaculteExpo.budgetProjetVos = new Array<BudgetProjetVo>();
          }
        }, error => {
          console.log('error');
        }
      );
    }
  }

  public findBudgetSousProjetRest(referenceProjet: string, annee: number) {
    return this.http.get<Array<BudgetSousProjetVo>>(this._url_bsp + '/referenceprojet/' + referenceProjet + '/annee/' + annee);
  }

  public findBudgetSousProjet(bp: BudgetProjetVo) {
    this.budgetSousProjetPrincipal = new BudgetSousProjetVo();
    this.budgetCompteBudgitairePrincipal = new BudgetCompteBudgitaireVo();
    this.budgetProjetPrincipal = bp;
    let index = this.budgetFacultePrincipal.budgetProjetVos.indexOf(this.budgetProjetPrincipal);
    if (bp.budgetSousProjetVos == null || bp.budgetSousProjetVos.length == 0) {
      this.findBudgetSousProjetRest(bp.referenceProjet, this.budgetFacultePrincipal.annee).subscribe(
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

  public findBudgetSousProjetExpo(bp: BudgetProjetVo) {
    this.budgetSousProjetExpo = new BudgetSousProjetVo();
    this.budgetProjetExpo = bp;
    let index = this.budgetFaculteExpo.budgetProjetVos.indexOf(this.budgetProjetExpo);
    if (bp.budgetSousProjetVos == null || bp.budgetSousProjetVos.length == 0) {
      this.findBudgetSousProjetRest(bp.referenceProjet, this.budgetFaculteExpo.annee).subscribe(
        data => {
          if (data != null) {
            this.budgetFaculteExpo.budgetProjetVos[index].budgetSousProjetVos = data;
          }
        }, error => {
          console.log('error');
        }
      );
    }


  }

  public findBudgetCompteBudgitaireRest(referenceProjet, referenceSousProjet, annee) {
    return this.http.get<Array<BudgetCompteBudgitaireVo>>(this._url_bcb + '/referenceprojet/' + referenceProjet + '/referencesousprojet/' + referenceSousProjet + '/annee/' + annee);
  }

  public findBudgetCompteBudgitaire(bsp: BudgetSousProjetVo) {
    this.budgetSousProjetPrincipal = bsp;
    this.budgetCompteBudgitairePrincipal = new BudgetCompteBudgitaireVo();
    let index = this.budgetFacultePrincipal.budgetProjetVos.indexOf(this.budgetProjetPrincipal);
    let indexSou = this.budgetFacultePrincipal.budgetProjetVos[index].budgetSousProjetVos.indexOf(this.budgetSousProjetPrincipal);
    if (bsp.budgetCompteBudgitaireVos == null || bsp.budgetCompteBudgitaireVos.length == 0) {
      this.findBudgetCompteBudgitaireRest(this.budgetProjetPrincipal.referenceProjet, bsp.referenceSousProjet, this.budgetFacultePrincipal.annee).subscribe(
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


  ///------------------------------------- Gestion Commpte Buditiare-------------------------
  public createCommpteBuditiare() {

    let compte = this.compteBudgitaireList.find(c => c.code == this.compteBudgitaire.code);
    console.log(compte);
    if (compte != null) {

      Swal.fire({
        title: 'Erreur !',
        text: 'Compte Budgitaire existe déjà',
        type: 'error',
        confirmButtonText: 'ok'
      });
    } else {
      this.savaCompteBudgitiare();
    }

  }

  private savaCompteBudgitiare() {
    this.http.post(this._url_cb, this.compteBudgitaire).subscribe(
      data => {
        console.log('saved successfully');
        if (data != null) {
          this.compteBudgitaire = new CompteBudgitaireVo(null, '', '');
          Swal.fire({
            title: 'Succès !',
            text: ' crée avec succès',
            type: 'success',
            confirmButtonText: 'ok'
          });
        }
      }, error1 => {
        console.log('Errorrr');
      }
    );
  }

  public removeCompteBudgitiare(c: CompteBudgitaireVo) {
    this.http.delete<number>(this._url_cb + 'code/' + c.code).subscribe(
      data => {
        if (data == 1) {
          let index = this.compteBudgitaireList.indexOf(c);
          this.compteBudgitaireList.splice(index, 1);
          Swal.fire({
            title: 'succès',
            text: ' supprimée avec succès',
            type: 'success',
            confirmButtonText: 'ok'
          });
        }
      }, error1 => {
        Swal.fire({
          title: 'Erreur !',
          text: 'Erreur inconnue',
          type: 'error',
          confirmButtonText: 'ok'
        });
      }
    );
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
    if (p == null) {
      this.sousProjetsByProjet = new Array<SousProjet>();
    } else {
      this.sousProjetsByProjet = p.sousProjetsVo;
    }
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
    if (this.isBudgetProjetExist(this.budgetProjetCreate.referenceProjet)) {
      Swal.fire({
        title: 'Erreur !',
        text: 'BudgetProjet existe déjà',
        type: 'error',
        confirmButtonText: 'ok'
      });
    } else {
      let bp = new BudgetProjetVo(null, this.budgetProjetCreate.referenceProjet);
      let detaills = new DetaillesBudgetVo(this.budgetProjetCreate.detaillesBudgetVo.antecedent, this.budgetProjetCreate.detaillesBudgetVo.creditOuvertEstimatif, this.budgetProjetCreate.detaillesBudgetVo.creditOuvertReel);
      detaills.engageNonPaye = this.budgetProjetCreate.detaillesBudgetVo.engageNonPaye;
      detaills.engagePaye = this.budgetProjetCreate.detaillesBudgetVo.engagePaye;
      detaills.id = null;
      bp.detaillesBudgetVo = detaills;
      this.budgetFacultePrincipal.budgetProjetVos.push(bp);
      this.calculedetailleBudgetFaculte(this.budgetFacultePrincipal, this.budgetFacultePrincipal.budgetProjetVos);
      this.budgetProjetCreate = new BudgetProjetVo();
      Swal.fire({
        type: 'success',
        title: 'succés',
        text: 'Sauvegardé avec succées!'
      });
    }
  }

  public ajouterNewBudgetSousProjet() {

    if (this.isBudgetSousProjetExist(this.budgetSousProjetCreate.referenceSousProjet)) {
      Swal.fire({
        title: 'Erreur !',
        text: 'BudgetSousProjet existe déjà',
        type: 'error',
        confirmButtonText: 'ok'
      });
    } else {

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
      Swal.fire({
        type: 'success',
        title: 'succés',
        text: 'Sauvegardé avec succées!'
      });
    }
  }

  public ajouterNewBudgetCompteBudegtaireProjet() {

    if (this.isBudgetCompteBudgitaireExist(this.budgetCompteBudgitaireCreate.compteBudgitaireVo.code)) {
      Swal.fire({
        title: 'Erreur !',
        text: 'Budget Compte Budegtaire existe déjà',
        type: 'error',
        confirmButtonText: 'ok'
      });
    } else {

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
      Swal.fire({
        type: 'success',
        title: 'succés',
        text: 'Sauvegardé avec succées!'
      });
    }
  }

  //---------------------------  Budget Detailles --------------------------
  public detail: DetaillesBudgetVo = new DetaillesBudgetVo();
  public detailClone: DetaillesBudgetVo = new DetaillesBudgetVo();

  public detaillBudgetFaculte(bf: BudgetFaculteVo) {
    this.detail = bf.detaillesBudgetVo;
    this.budgetInstance = bf;
    this.clone(bf.detaillesBudgetVo, this.detailClone);
  }

  public detaillBudgetProjet(bp: BudgetProjetVo) {
    this.detail = bp.detaillesBudgetVo;
    this.budgetInstance = bp;
    this.clone(bp.detaillesBudgetVo, this.detailClone);
  }

  public detaillBudgetSousProjet(bsp: BudgetSousProjetVo) {
    this.detail = bsp.detaillesBudgetVo;
    this.budgetInstance = bsp;
    this.clone(bsp.detaillesBudgetVo, this.detailClone);
  }


  public detaillBudgetCompteBudgitaire(bcb: BudgetCompteBudgitaireVo) {
    this.detail = bcb.detaillesBudgetVo;
    this.budgetInstance = bcb;
    this.clone(bcb.detaillesBudgetVo, this.detailClone);
  }

  public clone(detail: DetaillesBudgetVo, detailClone: DetaillesBudgetVo) {
    detailClone.id = detail.id;
    detailClone.engageNonPaye = detail.engageNonPaye;
    detailClone.engagePaye = detail.engagePaye;
    detailClone.creditOuvertEstimatif = detail.creditOuvertEstimatif;
    detailClone.creditOuvertReel = detail.creditOuvertReel;
    detailClone.reliquatEstimatif = detail.reliquatEstimatif;
    detailClone.reliquatReel = detail.reliquatReel;
    detailClone.reliquatNonPayeEstimatif = detail.reliquatNonPayeEstimatif;
    detailClone.reliquatNonPayReel = detail.reliquatNonPayReel;
    detailClone.reliquatPayeEstimatif = detail.reliquatPayeEstimatif;
    detailClone.reliquatPayereel = detail.reliquatPayereel;
  }

  budgetInstance: any;

  public update() {
    this.clone(this.detailClone, this.detail);
    if (this.budgetInstance instanceof BudgetProjetVo) {
      this.calculedetailleBudgetFaculte(this.budgetFacultePrincipal, this.budgetFacultePrincipal.budgetProjetVos);
    } else if (this.budgetInstance instanceof BudgetSousProjetVo) {
      this.calculedetailleBudgetProjet(this.budgetProjetPrincipal, this.budgetProjetPrincipal.budgetSousProjetVos);
    } else if (this.budgetInstance instanceof BudgetCompteBudgitaireVo) {
      this.calculedetailleBudgetSousProjet(this.budgetSousProjetPrincipal, this.budgetSousProjetPrincipal.budgetCompteBudgitaireVos);
    }
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
      Swal.fire(
        'Supprimmé!',
        'Vos données ont été supprimés.',
        'success'
      );
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

      Swal.fire(
        'Supprimmé!',
        'Vos données ont été supprimés.',
        'success'
      );
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
      Swal.fire(
        'Supprimmé!',
        'Vos données ont été supprimés.',
        'success'
      );
    }

  }

  //-------------------------------- les Calcules --------------------------

  public calculedetailleBudgetFaculte(bf: BudgetFaculteVo, BudgetProjetVos: Array<BudgetProjetVo>) {
    let reliquatEstimatif = 0;
    let reliquatReel = 0;
    let engageNonPaye = 0;
    let engagePaye = 0;
    BudgetProjetVos.forEach(bsp => {
      reliquatEstimatif += parseFloat(bsp.detaillesBudgetVo.creditOuvertEstimatif);
      reliquatReel += parseFloat(bsp.detaillesBudgetVo.creditOuvertReel);
      engageNonPaye += parseFloat(bsp.detaillesBudgetVo.engageNonPaye);
      engagePaye += parseFloat(bsp.detaillesBudgetVo.engagePaye);
    });
    bf.detaillesBudgetVo.reliquatReel = reliquatReel.toString();
    bf.detaillesBudgetVo.reliquatEstimatif = reliquatEstimatif.toString();
    bf.detaillesBudgetVo.engagePaye = engagePaye.toString();
    bf.detaillesBudgetVo.engageNonPaye = engageNonPaye.toString();
  }

  public calculedetailleBudgetProjet(bp: BudgetProjetVo, budgetSousProjetVos: Array<BudgetSousProjetVo>) {
    let reliquatEstimatif = 0;
    let reliquatReel = 0;
    let engageNonPaye = 0;
    let engagePaye = 0;
    budgetSousProjetVos.forEach(bsp => {
      reliquatEstimatif += parseFloat(bsp.detaillesBudgetVo.creditOuvertEstimatif);
      reliquatReel += parseFloat(bsp.detaillesBudgetVo.creditOuvertReel);
      engageNonPaye += parseFloat(bsp.detaillesBudgetVo.engageNonPaye);
      engagePaye += parseFloat(bsp.detaillesBudgetVo.engagePaye);
    });
    bp.detaillesBudgetVo.reliquatReel = reliquatReel.toString();
    bp.detaillesBudgetVo.reliquatEstimatif = reliquatEstimatif.toString();
    bp.detaillesBudgetVo.engagePaye = engagePaye.toString();
    bp.detaillesBudgetVo.engageNonPaye = engageNonPaye.toString();
    this.calculedetailleBudgetFaculte(this.budgetFacultePrincipal, this.budgetFacultePrincipal.budgetProjetVos);

  }

  public calculedetailleBudgetSousProjet(bsp: BudgetSousProjetVo, budgetCompteBudgitaireVo: Array<BudgetCompteBudgitaireVo>) {
    let reliquatEstimatif = 0;
    let reliquatReel = 0;
    let engageNonPaye = 0;
    let engagePaye = 0;
    budgetCompteBudgitaireVo.forEach(bsp => {
      reliquatEstimatif += parseFloat(bsp.detaillesBudgetVo.creditOuvertEstimatif);
      reliquatReel += parseFloat(bsp.detaillesBudgetVo.creditOuvertReel);
      engageNonPaye += parseFloat(bsp.detaillesBudgetVo.engageNonPaye);
      engagePaye += parseFloat(bsp.detaillesBudgetVo.engagePaye);
    });
    bsp.detaillesBudgetVo.reliquatReel = reliquatReel.toString();
    bsp.detaillesBudgetVo.reliquatEstimatif = reliquatEstimatif.toString();
    bsp.detaillesBudgetVo.engagePaye = engagePaye.toString();
    bsp.detaillesBudgetVo.engageNonPaye = engageNonPaye.toString();
    this.calculedetailleBudgetProjet(this.budgetProjetPrincipal, this.budgetProjetPrincipal.budgetSousProjetVos);

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
        console.log('errrorr' + error1);
      }
    );
  }

  public isBudgetProjetExist(refProjet: String): boolean {
    let budgetProjet = this.budgetFacultePrincipal.budgetProjetVos.find(a => a.referenceProjet == refProjet);
    if (budgetProjet == null) {
      return false;
    } else {
      return true;
    }
  }

  public isBudgetSousProjetExist(refSousProjet: String): boolean {
    let budgetProjet = this.budgetProjetPrincipal.budgetSousProjetVos.find(a => a.referenceSousProjet == refSousProjet);
    if (budgetProjet == null) {
      return false;
    } else {
      return true;
    }
  }

  public isBudgetCompteBudgitaireExist(code: String): boolean {
    let budgetProjet = this.budgetSousProjetPrincipal.budgetCompteBudgitaireVos.find(a => a.compteBudgitaireVo.code == code);
    if (budgetProjet == null) {
      return false;
    } else {
      return true;
    }
  }


  //-------------------------------------------------------------------


  public findDetaillesByAnnne(annee) {
    return this.http.get<Array<BudgetCompteBudgitaireVo>>(this._url_bcb + '/detailles/annee/' + annee);
  }

  public findDetaillesByProjet(id) {
    return this.http.get<Array<BudgetCompteBudgitaireVo>>(this._url_bcb + '/detailles/budgetprojet/' + id);
  }

  public printFaculte(annee): any {
    const httpOptions = {
      responseType: 'blob' as 'json' //This also worked
    };
    return this.http.get(this._url_bf + '/pdf/faculte/annee/' + annee, httpOptions).subscribe((resultBlob: Blob) => {
      var downloadURL = URL.createObjectURL(resultBlob);
      window.open(downloadURL);
    });
  }

  public printProjet(id): any {
    const httpOptions = {
      responseType: 'blob' as 'json' //This also worked
    };
    return this.http.get(this._url_bp + '/pdf/projet/id/' + id, httpOptions).subscribe((resultBlob: Blob) => {
      var downloadURL = URL.createObjectURL(resultBlob);
      window.open(downloadURL);
    });
  }

  public printSousProjet(referenceProjet,referenceSousProjet,annee): any {
    const httpOptions = {
      responseType: 'blob' as 'json' //This also worked
    };
    return this.http.get(this._url_bsp + '/pdf/sous-projet/referenceProjet/'+referenceProjet+'/referenceSousProjet/'+referenceSousProjet+'/annee/'+annee, httpOptions).subscribe((resultBlob: Blob) => {
      var downloadURL = URL.createObjectURL(resultBlob);
      window.open(downloadURL);
    });
  }
  budget: any;

  hi() {
    if (this.budget instanceof BudgetFaculteVo) {
      this.calculedetailleBudgetFaculte(this.budget, this.budget.budgetProjetVos);
    }
    this.budget instanceof BudgetProjetVo;
  }
}

