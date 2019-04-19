import {Component, OnInit} from '@angular/core';
import {BudgetCompteBudgitaireVo} from '../../controller/model/budget/budget-compte-budgitaire.model';
import {BudgetService} from '../../controller/service/budget.service';

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
    this.budgetService.deleteBudgetCompteBudgitaire(bcb);
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
