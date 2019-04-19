import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BudgetFaculteVo} from '../model/budget/budget-faculte.model';
import {BudgetSousProjetVo} from '../model/budget/budget-sous-projet.model';
import {BudgetEntiteAdministratifVo} from '../model/budget/budget-entite-administratif.model';
import {BudgetCompteBudgitaireVo} from '../model/budget/budget-compte-budgitaire.model';
import {CompteBudgitaireVo} from '../model/budget/compte-budgitaire.model';
import {DetaillesBudget} from '../model/budget/detailles-budget.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private http: HttpClient) {
  }

  private _budgetFaculteCreate1: BudgetFaculteVo = new BudgetFaculteVo(0);

  get budgetFaculteCreate1(): BudgetFaculteVo {
    return this._budgetFaculteCreate1;
  }

  set budgetFaculteCreate1(value: BudgetFaculteVo) {
    this._budgetFaculteCreate1 = value;
  }

  //private _bsps.budgetSousProjetVo: Array<BudgetSousProjetVo> = [];
  private _beas: Array<BudgetEntiteAdministratifVo> = [];

  get beas(): Array<BudgetEntiteAdministratifVo> {
    if (this._beas == null) {
      this._beas = [];
    }
    return this._beas;
  }

  //variables du pointage sur les formulaires
  private _budgetFaculteCreate: BudgetFaculteVo = new BudgetFaculteVo(0, new Date().getFullYear()-1);

  // Les urls
  private _host = 'http://localhost:8099/budget_api/';

  get host(): string {
    return this._host;
  }

  set host(value: string) {
    this._host = value;
  }

  private _url_bf = this._host + 'budget_api_facultes/';

  get url_bf(): string {
    return this._url_bf;
  }

  set url_bf(value: string) {
    this._url_bf = value;
  }

  private _url_bsp = this._host + 'budget_sous_projet/';

  get url_bsp(): string {
    return this._url_bsp;
  }

  set url_bsp(value: string) {
    this._url_bsp = value;
  }

  private _url_bea = this._host + 'budget_entite_admin/';

  get url_bea(): string {
    return this._url_bea;
  }

  set url_bea(value: string) {
    this._url_bea = value;
  }

  private _url_bcb = this._host + 'budget_compte_budgitaires/';

  get url_bcb(): string {
    return this._url_bcb;
  }

  private _bcbs: Array<BudgetCompteBudgitaireVo> = [];

  set url_bcb(value: string) {
    this._url_bcb = value;
  }

  private _budgetSousProjetCreate: BudgetSousProjetVo = new BudgetSousProjetVo(0);

  get budgetSousProjetCreate(): BudgetSousProjetVo {
    return this._budgetSousProjetCreate;
  }

  set budgetSousProjetCreate(value: BudgetSousProjetVo) {
    this._budgetSousProjetCreate = value;
  }

  //findAll
  private _allSousProjet: Array<BudgetSousProjetVo> = [];

  get allSousProjet(): Array<BudgetSousProjetVo> {
    return this._allSousProjet;
  }

  set allSousProjet(value: Array<BudgetSousProjetVo>) {
    this._allSousProjet = value;
  }

  private _allEntiteAdministratif: Array<BudgetEntiteAdministratifVo> = [];

  get allEntiteAdministratif(): Array<BudgetEntiteAdministratifVo> {
    return this._allEntiteAdministratif;
  }

  set allEntiteAdministratif(value: Array<BudgetEntiteAdministratifVo>) {
    this._allEntiteAdministratif = value;
  }

  private _budgetSousProjetCreateClone1: BudgetSousProjetVo = new BudgetSousProjetVo();

  get budgetSousProjetCreateClone1(): BudgetSousProjetVo {
    return this._budgetSousProjetCreateClone1;
  }

  set budgetSousProjetCreateClone1(value: BudgetSousProjetVo) {
    this._budgetSousProjetCreateClone1 = value;
  }

  private _budgetSousProjetCreateClone2: BudgetSousProjetVo = new BudgetSousProjetVo();

  get budgetSousProjetCreateClone2(): BudgetSousProjetVo {
    return this._budgetSousProjetCreateClone2;
  }

  set budgetSousProjetCreateClone2(value: BudgetSousProjetVo) {
    this._budgetSousProjetCreateClone2 = value;
  }

  private _budgetEntiteAdministratifCreate: BudgetEntiteAdministratifVo = new BudgetEntiteAdministratifVo();

  /*public refreshAllFromBsp(){
    this._budgetFaculteCreate.budgetSousProjetVo = [];
    this._beas = [];
    this._bcbs = [];
  }
  public refreshAllFromBea(){
    this.budgetFaculteCreate=new BudgetFaculteVo();
    this._budgetFaculteCreate.budgetSousProjetVo = [];
    this._beas = [];
    this._bcbs = [];
  }*/

  get budgetEntiteAdministratifCreate(): BudgetEntiteAdministratifVo {
    return this._budgetEntiteAdministratifCreate;
  }

  set budgetEntiteAdministratifCreate(value: BudgetEntiteAdministratifVo) {
    this._budgetEntiteAdministratifCreate = value;
  }

  private _budgetEntiteAdministratifCreateClone: BudgetEntiteAdministratifVo = new BudgetEntiteAdministratifVo();

  get budgetEntiteAdministratifCreateClone(): BudgetEntiteAdministratifVo {
    return this._budgetEntiteAdministratifCreateClone;
  }

  set budgetEntiteAdministratifCreateClone(value: BudgetEntiteAdministratifVo) {
    this._budgetEntiteAdministratifCreateClone = value;
  }

  private _budgetCompteBudgitaireCreate: BudgetCompteBudgitaireVo = new BudgetCompteBudgitaireVo();

  get budgetCompteBudgitaireCreate(): BudgetCompteBudgitaireVo {
    return this._budgetCompteBudgitaireCreate;
  }

  set budgetCompteBudgitaireCreate(value: BudgetCompteBudgitaireVo) {
    this._budgetCompteBudgitaireCreate = value;
  }

  //gettters and setters
  get budgetFaculteCreate(): BudgetFaculteVo {
    return this._budgetFaculteCreate;
  }

  set budgetFaculteCreate(value: BudgetFaculteVo) {
    this._budgetFaculteCreate = value;
  }

  private _compteBudgitaireCreate: CompteBudgitaireVo = new CompteBudgitaireVo();

  get compteBudgitaireCreate(): CompteBudgitaireVo {
    return this._compteBudgitaireCreate;
  }

  set compteBudgitaireCreate(value: CompteBudgitaireVo) {
    this._compteBudgitaireCreate = value;
  }

  get bcbs(): Array<BudgetCompteBudgitaireVo> {
    if (this._bcbs == null) {
      this._bcbs = [];
    }
    return this._bcbs;
  }

  //detailles budget vo pour chaque composant
  private _detaillesBudgetVo1: DetaillesBudget = new DetaillesBudget();

  get detaillesBudgetVo1(): DetaillesBudget {
    return this._detaillesBudgetVo1;
  }

  set detaillesBudgetVo1(value: DetaillesBudget) {
    this._detaillesBudgetVo1 = value;
  }

  private _detaillesBudgetVo2: DetaillesBudget = new DetaillesBudget();

  get detaillesBudgetVo2(): DetaillesBudget {
    return this._detaillesBudgetVo2;
  }

  set detaillesBudgetVo2(value: DetaillesBudget) {
    this._detaillesBudgetVo2 = value;
  }

  private _detaillesBudgetVo3: DetaillesBudget = new DetaillesBudget();

  get detaillesBudgetVo3(): DetaillesBudget {
    return this._detaillesBudgetVo3;
  }

  set detaillesBudgetVo3(value: DetaillesBudget) {
    this._detaillesBudgetVo3 = value;
  }

  //selected objects
  private _selectdeBudgetSp: BudgetSousProjetVo = new BudgetSousProjetVo();

  get selectdeBudgetSp(): BudgetSousProjetVo {
    return this._selectdeBudgetSp;
  }

  set selectdeBudgetSp(value: BudgetSousProjetVo) {
    this._selectdeBudgetSp = value;
  }

  //resultat de recheres s'enregistrent dans ces variables
  private _budgetFacultes: Array<BudgetFaculteVo> = [];

  get budgetFacultes(): Array<BudgetFaculteVo> {
    return this._budgetFacultes;
  }

  set budgetFacultes(value: Array<BudgetFaculteVo>) {
    this._budgetFacultes = value;
  }

  get bsps(): Array<BudgetSousProjetVo> {
    return this._budgetFaculteCreate.budgetSousProjetVo;
  }

  //full in comboboxes with references sous projet and entite administratif
  public findAllSousProjet() {
    return this.http.get<Array<BudgetSousProjetVo>>(this._url_bsp + 'all/sousprojet').subscribe(
      data => {
        if (data != null) {
          this._allSousProjet = [];
          this._allSousProjet = data;
        } else {
          Swal({
            type: 'error',
            title: 'Aucun informations trouvés',
            text: 'Something went wrong!'
          });
        }
      }, error => {
        console.log(error);
      }
    );
  }

  public findAllEntiteAdministratif() {
    return this.http.get<Array<BudgetEntiteAdministratifVo>>(this._url_bea + 'all/entiteadministratif').subscribe(
      data => {
        if (data != null) {
          this._allEntiteAdministratif = [];
          this._allEntiteAdministratif = data;
        } else {
          Swal({
            type: 'error',
            title: 'Aucun informations trouvés',
            text: 'Something went wrong!'
          });
        }
      }, error => {
        console.log(error);
      }
    );
  }

  //permet d'ajouter le budget Sous Projet
  public addBudgetSousProjet() {
    if (this._budgetSousProjetCreate.referenceSousProjet == null) {
      Swal({
        type: 'error',
        title: 'Error',
        text: 'Merci de saisir le reference!'
      });
    } else if (this._budgetFaculteCreate.budgetSousProjetVo.findIndex(bsp => bsp.referenceSousProjet == this._budgetSousProjetCreate.referenceSousProjet) != -1) {
      Swal({
        type: 'error',
        title: 'Avertissement',
        text: 'Ce sous projet existe déja!'
      });
    } else {
      if (this._budgetFaculteCreate.budgetSousProjetVo == null) {
        this._budgetFaculteCreate.budgetSousProjetVo = [];
      }
      let bspClone: BudgetSousProjetVo = new BudgetSousProjetVo(0, this._budgetSousProjetCreate.referenceSousProjet);
      bspClone.detaillesBudgetVo = this._detaillesBudgetVo1;
      //this._budgetFaculteCreate.budgetSousProjetVo.push(bspClone);
      this._budgetFaculteCreate.budgetSousProjetVo.push(bspClone);
      this._detaillesBudgetVo1 = new DetaillesBudget();
    }
  }

  //permet d'ajouter le budget entite administratif
  public addBudgetEntiteAdministratif() {
    if (this._budgetSousProjetCreateClone1.referenceSousProjet == null || this._budgetEntiteAdministratifCreate.referenceEntiteAdministratif == null) {
      Swal({
        type: 'error',
        title: 'Error',
        text: 'Merci de remplir tous les champs!'
      });
    } else if (this._beas.findIndex(bea => bea.referenceEntiteAdministratif == this._budgetEntiteAdministratifCreate.referenceEntiteAdministratif && bea.budgetSousProjetVo.referenceSousProjet == this._budgetSousProjetCreateClone1.referenceSousProjet) != -1) {
      Swal({
        type: 'error',
        title: 'Avertissement',
        text: 'Cette entité administratif déja existe!'
      });
    } else {
      this._budgetFaculteCreate.budgetSousProjetVo.forEach(bsp => {
        if (bsp.referenceSousProjet === this._budgetSousProjetCreateClone1.referenceSousProjet) {
          let beaClone: BudgetEntiteAdministratifVo = new BudgetEntiteAdministratifVo(0, this._budgetEntiteAdministratifCreate.referenceEntiteAdministratif);
          beaClone.detaillesBudgetVo = this._detaillesBudgetVo2;
          if (bsp.budgetEntiteAdministratifVo == null) {
            bsp.budgetEntiteAdministratifVo = [];
          }
          bsp.budgetEntiteAdministratifVo.push(beaClone);
          this._beas.push(beaClone);
          this._detaillesBudgetVo2 = new DetaillesBudget();
        }
      });
    }
  }

  //permet d'ajouter le budget compte budgitaire
  public addBudgetCompteBudgitaireCreate() {
    if (this._budgetSousProjetCreateClone2.referenceSousProjet == null || this._budgetEntiteAdministratifCreateClone.referenceEntiteAdministratif == null) {
      Swal({
        type: 'error',
        title: 'Error',
        text: 'Merci de remplir tous les champs!'
      });
    }/*else if (this._bcbs.findIndex(bcb => bcb.budgetEntiteAdministratifVo.referenceEntiteAdministratif == this._budgetEntiteAdministratifCreateClone.referenceEntiteAdministratif
              && bcb.budgetEntiteAdministratifVo.budgetSousProjetVo.referenceSousProjet==this._budgetSousProjetCreateClone2.referenceSousProjet)!=-1) {
      Swal({
        type: 'error',
        title: 'Avertissement',
        text: 'Ce compte budgitaire déja existe!'
      });
    }*/ else {
      this._budgetFaculteCreate.budgetSousProjetVo.forEach(bsp => {
        if (bsp.referenceSousProjet == this._budgetSousProjetCreateClone2.referenceSousProjet) {
          if (bsp.budgetEntiteAdministratifVo == null) bsp.budgetEntiteAdministratifVo = [];
          if (bsp.budgetEntiteAdministratifVo.findIndex(bea => bea.referenceEntiteAdministratif == this._budgetEntiteAdministratifCreateClone.referenceEntiteAdministratif) == -1) {
            bsp.budgetEntiteAdministratifVo.push(this._beas.find(bea => bea.referenceEntiteAdministratif == this._budgetEntiteAdministratifCreateClone.referenceEntiteAdministratif
              && bea.budgetSousProjetVo.referenceSousProjet == this._budgetSousProjetCreateClone2.referenceSousProjet));
          }
          let beaFind: BudgetEntiteAdministratifVo = bsp.budgetEntiteAdministratifVo.find(bea => bea.referenceEntiteAdministratif == this._budgetEntiteAdministratifCreateClone.referenceEntiteAdministratif);
          //bsp.budgetEntiteAdministratifVo.forEach(bea => {
          //if (bea.referenceEntiteAdministratif == this._budgetEntiteAdministratifCreateClone.referenceEntiteAdministratif) {
          let bcbClone: BudgetCompteBudgitaireVo = new BudgetCompteBudgitaireVo();
          bcbClone.detaillesBudgetVo = this._detaillesBudgetVo3;
          bcbClone.compteBudgitaireVo = this._compteBudgitaireCreate;
          //bcbClone.budgetEntiteAdministratifVo=bea;
          this._bcbs.push(bcbClone);
          if (beaFind.budgetCompteBudgitaireVo == null) {
            beaFind.budgetCompteBudgitaireVo = [];
          }
          beaFind.budgetCompteBudgitaireVo.push(bcbClone);
          console.log(beaFind);
          //bcbClone=new BudgetCompteBudgitaire();
          this._detaillesBudgetVo3 = new DetaillesBudget();
          this._compteBudgitaireCreate = new CompteBudgitaireVo();
          //}
          //});
        }
      });
    }
  }

  //permet de sauvegarder l'objet tout entier
  public saveAllInBudgetFaculte() {
    if (this._budgetFaculteCreate.budgetSousProjetVo == null || undefined) {
      Swal({
        type: 'error',
        title: 'Error',
        text: 'Merci de remplir les budgets!'
      });
    } else {
      this.http.post<BudgetFaculteVo>(this._url_bf, this._budgetFaculteCreate).subscribe(
        data => {
          if (data != null) {
            this.refreshAllFromBf();
            Swal({
              title: 'Are you sure?',
              text: 'Voulez-vous vraiment sauvegarder tous!',
              type: 'info',
              showCancelButton: true,
              confirmButtonColor: '#11d68b',
              cancelButtonColor: '#ddc0b3',
              confirmButtonText: 'Oui, sauvegarder!'
            }).then((result) => {
              if (result.value) {
                Swal({
                  type: 'success',
                  title: 'succés',
                  text: 'Sauvegardé avec succées!'
                });
              }
            });
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  /* DELETE: delete the budgetFaculte from the server */
  public deleteBudgetFaculte(annee: number) {
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
        if (annee != null) {
          this.http.delete(this._url_bf + 'annee/' + annee).subscribe(
            data => {
              this.refreshAllFromBf();
            }, error => {
              console.log(error);
            }
          );
        }
        Swal(
          'Supprimmé!',
          'Vos données ont été supprimés.',
          'success'
        );
      }
    });
  }

  /* DELETE: delete the budget sous projet from the server */
  public deleteBudgetSousProjet(bsp:BudgetSousProjetVo) {
    if (bsp.id == 0) {
      const index: number = this._budgetFaculteCreate.budgetSousProjetVo.indexOf(bsp);
      if (index !== -1) {
        this._budgetFaculteCreate.budgetSousProjetVo.splice(index, 1);
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

  /* DELETE: delete the budget sous entite administratif from the server */
  public deleteBudgetEntiteAdmin(bea: BudgetEntiteAdministratifVo) {
    if (bea.id == 0) {
      const index: number = this._beas.indexOf(bea);
      if (index !== -1) {
        this._beas.splice(index, 1);
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
          this.http.delete(this._url_bea + 'referenceEntiteAdmin/' + bea.referenceEntiteAdministratif + '/referenceSousProjet/' + bea.budgetSousProjetVo.referenceSousProjet + '/annee/' + bea.budgetSousProjetVo.budgetFaculteVo.annee).subscribe(
            data => {
              if (this._budgetSousProjetCreate.referenceSousProjet == null || undefined) {
                this.findAllByAnnee();
              } else if (this._budgetEntiteAdministratifCreate.referenceEntiteAdministratif == null || undefined) {
                this.findAllByAnneeAndBudgetSousProjet();
              } else {
                this.findAllByAnneeAndBudgetSousProjetAndBudgetEntitiAdmin();
              }
            }, error => {
              console.log(error);
            }
          );
          Swal(
            'Supprimmé!',
            'Vos données ont été supprimés.',
            'success'
          );
        }
      });
    }
  }

  /* DELETE: delete the budget budget compte cudgitaire from the server */
  public deleteBudgetCompteBudgitaire(bcb: BudgetCompteBudgitaireVo) {
    if (bcb.id == 0) {
      const index: number = this._bcbs.indexOf(bcb);
      if (index !== -1) {
        this._bcbs.splice(index, 1);
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
          this.http.delete(this._url_bcb + 'referenceCompteBudgitaire/' + bcb.referenceCompteBudgitaire).subscribe(
            data => {
              if (this._budgetSousProjetCreate.referenceSousProjet == null || undefined) {
                this.findAllByAnnee();
              } else if (this._budgetEntiteAdministratifCreate.referenceEntiteAdministratif == null || undefined) {
                this.findAllByAnneeAndBudgetSousProjet();
              } else {
                this.findAllByAnneeAndBudgetSousProjetAndBudgetEntitiAdmin();
              }
            }, error => {
              console.log(error);
            }
          );
          Swal(
            'Supprimmé!',
            'Vos données ont été supprimés.',
            'success'
          );
        }
      });
    }
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
          if (data != null) {
            this._budgetFacultes = [];
            this._budgetFacultes.push(data);
            this._budgetFaculteCreate = data;
            this._budgetFaculteCreate.budgetSousProjetVo = [];
          } else {
            Swal({
              type: 'error',
              title: 'Aucun informations trouvés',
              text: 'Something went wrong!'
            });
            this._budgetFacultes = [];
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
            this._budgetFaculteCreate.budgetSousProjetVo = data;
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
          }
        }, error => {
          console.log(error);
        }
      );
    }
  }

  // find by annee et RefSousProjet
  public findAllByAnneeAndBudgetSousProjet() {
    if (this.budgetFaculteCreate != null && this._budgetSousProjetCreate != null) {
      this.http.get<BudgetSousProjetVo>(this._url_bsp + 'reference/' + this._budgetSousProjetCreate.referenceSousProjet + '/annee/' + this._budgetFaculteCreate.annee).subscribe(
        data => {
          if (data!=null){
            this._budgetFaculteCreate.budgetSousProjetVo = [];
            this._budgetFaculteCreate.budgetSousProjetVo.push(data);
          }else{
            Swal({
              type: 'error',
              title: 'Aucun informations trouvés',
              text: 'Something went wrong!'
            });
          }
        }, error => {
          console.log(error);
        }
      );
      this.http.get<Array<BudgetEntiteAdministratifVo>>(this._url_bea + 'refSousProjet/' + this._budgetSousProjetCreate.referenceSousProjet + '/annee/' + this._budgetFaculteCreate.annee).subscribe(
        data => {
          if (data!=null){
            this._beas = [];
            this._beas = data;
          }
        }, error => {
          console.log(error);
        }
      );
      this.http.get<Array<BudgetCompteBudgitaireVo>>(this._url_bcb + 'reference/' + this._budgetSousProjetCreate.referenceSousProjet + '/annee/' + this._budgetFaculteCreate.annee).subscribe(
        data => {
          if (data!=null){
            this._bcbs = [];
            this._bcbs = data;
          }
        }, error => {
          console.log(error);
        }
      );
    }
  }

  //find by Annee et refSousProjet et refEntitéAdministratif
  public findAllByAnneeAndBudgetSousProjetAndBudgetEntitiAdmin() {
    if (this._budgetEntiteAdministratifCreate != null && this._budgetSousProjetCreate.referenceSousProjet != null && this._budgetFaculteCreate != null) {
      this.http.get<BudgetEntiteAdministratifVo>(this._url_bea + 'referenceEntiteAdmin/' + this._budgetEntiteAdministratifCreate.referenceEntiteAdministratif + '/refSousProjet/' + this._budgetSousProjetCreate.referenceSousProjet + '/annee/' + this._budgetFaculteCreate.annee).subscribe(
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
          }
        }, error => {
          console.log(error);
        }
      );
      this.http.get<Array<BudgetCompteBudgitaireVo>>(this._url_bcb + 'refEntite/' + this._budgetEntiteAdministratifCreate.referenceEntiteAdministratif + '/refsousProjet/' + this._budgetSousProjetCreate.referenceSousProjet + '/annee/' + this._budgetFaculteCreate.annee).subscribe(
        data => {
          if (data!=null){
            this._bcbs=[];
            this._bcbs = data;
          }
        }, error => {
          console.log(error);
        }
      );
    }
  }

  //searchAllByCriteriaAnneMinAndAnneMax
  public findByCreteriaAnneMinAndAnneMax() {
    if (this._budgetFaculteCreate1.annee != null && this._budgetFaculteCreate.annee != null) {
      this.findAllByAnneeMinAndAnneeMax();
    } else if (this._budgetFaculteCreate.annee != null) {
      this.findAllByAnnee();
    } else {
      Swal({
        type: 'error',
        title: 'Infos invalide',
        text: 'Merci de remplir les annees manquants!'
      });
    }
  }
  //find all info by annee min and annee max
  public findAllByAnneeMinAndAnneeMax(){
    this.http.get<Array<BudgetFaculteVo>>(this._url_bf + 'anneeMin/' + this._budgetFaculteCreate.annee + '/anneeMax/' + this._budgetFaculteCreate1.annee).subscribe(
        data=>{
          if (data!=null){
            this._budgetFacultes = [];
            this._budgetFacultes = data;
          } else{
            Swal({
              type: 'error',
              title: 'Aucun informations trouvés',
              text: 'Something went wrong!'
            });
            this._budgetFacultes = [];
          }
          console.log("Data between found");
        },error1 => {
          console.log("No data between");
        }
      );
     this.http.get<Array<BudgetSousProjetVo>>(this._url_bsp+"anneeMin/"+this.budgetFaculteCreate.annee+"/anneeMax/"+this.budgetFaculteCreate1.annee).subscribe(
      data=>{
        if (data!=null){
          this._budgetFaculteCreate.budgetSousProjetVo = [];
          this._budgetFaculteCreate.budgetSousProjetVo = data;
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
        }
      },error => {
        console.log(error);
      }
    );

  }

  //permet de rafraichair les champs en se basant sur l'objet supprimmé
  public refreshAllFromBf(){
    this._budgetFaculteCreate.detaillesBudgetVo = new DetaillesBudget();
    this._budgetFacultes = [];
    this._budgetFaculteCreate.budgetSousProjetVo = [];
    this._beas = [];
    this._bcbs = [];
  }

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
  public updateBudgetSousProjet(refSousProjet:string){
    this._budgetFaculteCreate.budgetSousProjetVo.forEach(bsp => {
      if (bsp.referenceSousProjet==refSousProjet){
        const id = bsp.detaillesBudgetVo.id;
        let reelConsomme: number = parseFloat(bsp.detaillesBudgetVo.creditOuvertReel) - parseFloat(bsp.detaillesBudgetVo.reliquatReel);
        let estimatifConsomme: number = parseFloat(bsp.detaillesBudgetVo.creditOuvertEstimatif) - parseFloat(bsp.detaillesBudgetVo.reliquatEstimatif);
        let nvReliquatBudgetFaculteReel: number = parseFloat(bsp.detaillesBudgetVo.creditOuvertReel) + parseFloat(this._budgetFaculteCreate.detaillesBudgetVo.reliquatReel);
        let nvReliquatBudgetFaculteEstimatif: number = parseFloat(bsp.detaillesBudgetVo.creditOuvertEstimatif) + parseFloat(this._budgetFaculteCreate.detaillesBudgetVo.reliquatEstimatif);
        let budgetSousProjetClone: BudgetSousProjetVo = new BudgetSousProjetVo(bsp.id, refSousProjet);
        budgetSousProjetClone.detaillesBudgetVo = this._detaillesBudgetVo1;
        if (nvReliquatBudgetFaculteReel < parseFloat(budgetSousProjetClone.detaillesBudgetVo.creditOuvertReel)
          || nvReliquatBudgetFaculteEstimatif < parseFloat(budgetSousProjetClone.detaillesBudgetVo.reliquatEstimatif)) {
          Swal({
            type: 'error',
            title: 'Error',
            text: 'Crédit ouvert reel/estimatif de budget faculte est insiffaisant!'
          });
        } else if (parseFloat(budgetSousProjetClone.detaillesBudgetVo.creditOuvertReel) < reelConsomme
          || parseFloat(budgetSousProjetClone.detaillesBudgetVo.reliquatEstimatif) < estimatifConsomme) {
          Swal({
            type: 'error',
            title: 'Erreur',
            text: 'Il faut entrer un credit superieur au égale à ' + reelConsomme
          });
        } else {
          bsp.detaillesBudgetVo.creditOuvertReel = this._detaillesBudgetVo1.creditOuvertReel;
          bsp.detaillesBudgetVo.creditOuvertEstimatif = this._detaillesBudgetVo1.creditOuvertEstimatif;
          bsp.detaillesBudgetVo.engagePaye = this._detaillesBudgetVo1.engagePaye;
          bsp.detaillesBudgetVo.engageNonPaye = this._detaillesBudgetVo1.engageNonPaye;
          budgetSousProjetClone.detaillesBudgetVo = bsp.detaillesBudgetVo;
          let sousprojet = this._budgetFaculteCreate.budgetSousProjetVo.find(bsp => bsp.referenceSousProjet == refSousProjet);
          sousprojet = budgetSousProjetClone;
        }
        budgetSousProjetClone = new BudgetSousProjetVo();
      }
    });
    this._detaillesBudgetVo1 = new DetaillesBudget();
  }

  //update budget sous projet
  public updateBudgetEntiteAdministratif(refEntiteAdministratif:string){
    this._beas.forEach(bea=>{
      if (bea.referenceEntiteAdministratif==refEntiteAdministratif){
        let reelConsomme: number = parseFloat(bea.detaillesBudgetVo.creditOuvertReel) - parseFloat(bea.detaillesBudgetVo.reliquatReel);
        let estimatifConsomme: number = parseFloat(bea.detaillesBudgetVo.creditOuvertEstimatif) - parseFloat(bea.detaillesBudgetVo.reliquatEstimatif);
        let budgetEntiteAdminClone: BudgetEntiteAdministratifVo = new BudgetEntiteAdministratifVo(bea.id, refEntiteAdministratif);
        budgetEntiteAdminClone.detaillesBudgetVo = this._detaillesBudgetVo2;
        this._budgetFaculteCreate.budgetSousProjetVo.forEach(bsp => {
          if (bsp.referenceSousProjet == bea.budgetSousProjetVo.referenceSousProjet) {
            let nvReliquatBudgetSousProjetReel: number = parseFloat(bsp.detaillesBudgetVo.creditOuvertReel) + parseFloat(bea.budgetSousProjetVo.detaillesBudgetVo.reliquatReel);
            let nvReliquatBudgetSousProjetEstimatif: number = parseFloat(bsp.detaillesBudgetVo.creditOuvertEstimatif) + parseFloat(bea.budgetSousProjetVo.detaillesBudgetVo.reliquatEstimatif);
            if (nvReliquatBudgetSousProjetReel < parseFloat(budgetEntiteAdminClone.detaillesBudgetVo.creditOuvertReel)
              || nvReliquatBudgetSousProjetEstimatif < parseFloat(budgetEntiteAdminClone.detaillesBudgetVo.reliquatEstimatif)) {
              Swal({
                type: 'error',
                title: 'Erreur',
                text: 'Crédit ouvert reel/estimatif de budget sous projet est insiffaisant!'
              });
            } else if (parseFloat(budgetEntiteAdminClone.detaillesBudgetVo.creditOuvertReel) < reelConsomme
              || parseFloat(budgetEntiteAdminClone.detaillesBudgetVo.reliquatEstimatif) < estimatifConsomme) {
              Swal({
                type: 'error',
                title: 'Erreur',
                text: 'Il faut entrer un credit superieur au égale à ' + reelConsomme
              });
            } else {
              if (bsp.budgetEntiteAdministratifVo == null) {
                bsp.budgetEntiteAdministratifVo = [];
              }
              bea.detaillesBudgetVo.creditOuvertReel = this._detaillesBudgetVo2.creditOuvertReel;
              bea.detaillesBudgetVo.creditOuvertEstimatif = this._detaillesBudgetVo2.creditOuvertEstimatif;
              bea.detaillesBudgetVo.engagePaye = this._detaillesBudgetVo2.engagePaye;
              bea.detaillesBudgetVo.engageNonPaye = this._detaillesBudgetVo2.engageNonPaye;
              budgetEntiteAdminClone.detaillesBudgetVo = bea.detaillesBudgetVo;
              console.log(budgetEntiteAdminClone.detaillesBudgetVo);
              let entiteadminstratif = bsp.budgetEntiteAdministratifVo.find(ea => ea.referenceEntiteAdministratif == refEntiteAdministratif);
              if (entiteadminstratif == null) {
                bsp.budgetEntiteAdministratifVo.push(budgetEntiteAdminClone);
              } else {
                entiteadminstratif = budgetEntiteAdminClone;
              }
            }
          }
        });
        budgetEntiteAdminClone.detaillesBudgetVo = new DetaillesBudget();
      }
    });
    this._detaillesBudgetVo2 = new DetaillesBudget();
  }

  public updateBudgetCompteBudgitaire(refCompteBudgitaire:string){
    this._bcbs.forEach(bcb=>{
      if (bcb.referenceCompteBudgitaire==refCompteBudgitaire){
        const id = bcb.detaillesBudgetVo.id;
        //bcb.compteBudgitaireVo=this._compteBudgitaireCreate;
        this._budgetFaculteCreate.budgetSousProjetVo.forEach(bsp => {
          if (bsp.referenceSousProjet == bcb.budgetEntiteAdministratifVo.budgetSousProjetVo.referenceSousProjet) {
            if (bsp.budgetEntiteAdministratifVo === null) {
              bsp.budgetEntiteAdministratifVo = [];
            }
            if (bsp.budgetEntiteAdministratifVo.findIndex(bea => bea.referenceEntiteAdministratif == bcb.budgetEntiteAdministratifVo.referenceEntiteAdministratif) == -1) {
              bsp.budgetEntiteAdministratifVo.push(bcb.budgetEntiteAdministratifVo);
            }
            bsp.budgetEntiteAdministratifVo.forEach(bea => {
              if (bea.referenceEntiteAdministratif == bcb.budgetEntiteAdministratifVo.referenceEntiteAdministratif) {
                let reelConsomme: number = parseFloat(bcb.detaillesBudgetVo.creditOuvertReel) - parseFloat(bcb.detaillesBudgetVo.reliquatReel);
                let estimatifConsomme: number = parseFloat(bcb.detaillesBudgetVo.creditOuvertEstimatif) - parseFloat(bcb.detaillesBudgetVo.reliquatEstimatif);
                let nvReliquatBudgeEntiteAdminReel: number = parseFloat(bea.detaillesBudgetVo.creditOuvertReel) + parseFloat(bcb.budgetEntiteAdministratifVo.detaillesBudgetVo.reliquatReel);
                let nvReliquatBudgetEntiteAdminEstimatif: number = parseFloat(bea.detaillesBudgetVo.creditOuvertEstimatif) + parseFloat(bcb.budgetEntiteAdministratifVo.detaillesBudgetVo.reliquatEstimatif);
                let budgetCompteBudgitaireClone: BudgetCompteBudgitaireVo = new BudgetCompteBudgitaireVo(bcb.id, bcb.referenceCompteBudgitaire);
                budgetCompteBudgitaireClone.detaillesBudgetVo = this._detaillesBudgetVo3;
                if (nvReliquatBudgeEntiteAdminReel < parseFloat(this._detaillesBudgetVo3.creditOuvertReel)
                  || nvReliquatBudgetEntiteAdminEstimatif < parseFloat(this._detaillesBudgetVo3.reliquatEstimatif)) {
                  Swal({
                    type: 'error',
                    title: 'Erreur',
                    text: 'Crédit ouvert reel/estimatif de budget entite administratif est insuffissant!'
                  });
                } else if (parseFloat(budgetCompteBudgitaireClone.detaillesBudgetVo.creditOuvertReel) < reelConsomme
                  || parseFloat(budgetCompteBudgitaireClone.detaillesBudgetVo.reliquatEstimatif) < estimatifConsomme) {
                  Swal({
                    type: 'error',
                    title: 'Erreur',
                    text: 'Il faut entrer un credit superieur au égale à ' + estimatifConsomme
                  });
                } else {
                  bcb.detaillesBudgetVo.creditOuvertReel = this._detaillesBudgetVo3.creditOuvertReel;
                  bcb.detaillesBudgetVo.creditOuvertEstimatif = this._detaillesBudgetVo3.creditOuvertEstimatif;
                  bcb.detaillesBudgetVo.engagePaye = this._detaillesBudgetVo3.engagePaye;
                  bcb.detaillesBudgetVo.engageNonPaye = this._detaillesBudgetVo3.engageNonPaye;
                  //budgetCompteBudgitaireClone.compteBudgitaireVo=this._compteBudgitaireCreate;
                  if (bea.budgetCompteBudgitaireVo == null) {
                    bea.budgetCompteBudgitaireVo = [];
                  }
                  budgetCompteBudgitaireClone.detaillesBudgetVo = bcb.detaillesBudgetVo;
                  bea.budgetCompteBudgitaireVo.push(budgetCompteBudgitaireClone);
                }
                budgetCompteBudgitaireClone = new BudgetCompteBudgitaireVo();
              }
            });
          }
        });
      }
    });
    this._detaillesBudgetVo3 = new DetaillesBudget();
  }

  public selectedBsp(bsp:BudgetSousProjetVo){
    this._selectdeBudgetSp = bsp;
  }
}
