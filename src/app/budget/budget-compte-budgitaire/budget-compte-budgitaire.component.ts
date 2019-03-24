import {Component, OnInit} from '@angular/core';
import {BudgetCompteBudgitaireVo} from '../../controller/model/budget/budget-compte-budgitaire.model';
import {BudgetService} from '../../controller/service/budget.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-budget-compte-budgitaire',
  templateUrl: './budget-compte-budgitaire.component.html',
  styleUrls: ['./budget-compte-budgitaire.component.css']
})
export class BudgetCompteBudgitaireComponent implements OnInit {

  private _selectedBcb: BudgetCompteBudgitaireVo = new BudgetCompteBudgitaireVo();
  private _tableBudgetCompteBudgitaireInfo:BudgetCompteBudgitaireVo=new BudgetCompteBudgitaireVo();
  constructor(private budgetService: BudgetService) {
  }

  public get budgetCompteBudgitaire() {
    return this.budgetService.budgetCompteBudgitaireCreate;
  }

  public get beaCreateClone() {
    return this.budgetService.budgetEntiteAdministratifCreateClone;
  }

  public get budgetSousProjetClone() {
    return this.budgetService.budgetSousProjetCreateClone2;
  }
  /*
  public get budgetCompteBudgitaires() {
    return this.budgetService.budgetCbs;
  }*/

  public get compteBudgitaire() {
    return this.budgetService.compteBudgitaireCreate;
  }

  public get detaillesBudgetVo() {
    return this.budgetService.detaillesBudgetVo3;
  }

  public get bcbs() {
    return this.budgetService.bcbs;
  }

  ngOnInit() {
  }

  public addBudgetCompteBudgitaire() {
    this.budgetService.addBudgetCompteBudgitaireCreate();
  }

  get selectedBcb(): BudgetCompteBudgitaireVo {
    return this._selectedBcb;
  }

  set selectedBcb(value: BudgetCompteBudgitaireVo) {
    this._selectedBcb = value;
  }

  public getBcbInfos(bcbr: BudgetCompteBudgitaireVo) {
    this._selectedBcb = bcbr;
  }

  public get sousProjets(){
    return this.budgetService.allSousProjet;
  }

  public get entiteAdministratif(){
    return this.budgetService.allEntiteAdministratif;
  }

  public update() {
    this.budgetService.updateBudgetCompteBudgitaire(this._tableBudgetCompteBudgitaireInfo.referenceCompteBudgitaire);
  }

  public deleteBudgetCompteBudgitaire(bcb:BudgetCompteBudgitaireVo) {
    const index: number = this.bcbs.indexOf(bcb);
    if (bcb.id==0) {
      if (index !== -1) {
        this.bcbs.splice(index, 1);
      }
    }else {
      Swal({
        title: 'Etes-vous sure?',
        text: "Vous ne pouvez pas revenir en arrière!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer!'
      }).then((result) => {
        if (result.value) {
          if (index !== -1) {
            this.bcbs.splice(index, 1);
          }
          this.budgetService.deleteBudgetCompteBudgitaire(bcb.referenceCompteBudgitaire).subscribe();
          //this.budgetService.refreshAllFromBf();
          Swal(
            'Supprimmé!',
            'Vos données ont été supprimés.',
            'success'
          );
        }
      });
    }
  }

  public selectedTableBudgetCompteBudgitaire(bcb:BudgetCompteBudgitaireVo){
    this._tableBudgetCompteBudgitaireInfo=bcb;
  }

  get tableBudgetCompteBudgitaireInfo(): BudgetCompteBudgitaireVo {
    return this._tableBudgetCompteBudgitaireInfo;
  }

  set tableBudgetCompteBudgitaireInfo(value: BudgetCompteBudgitaireVo) {
    this._tableBudgetCompteBudgitaireInfo = value;
  }
}
