import {Component, OnInit} from '@angular/core';
import {BudgetCompteBudgitaire} from '../../controller/model/budget/budget-compte-budgitaire.model';
import {BudgetService} from '../../controller/service/budget.service';

@Component({
  selector: 'app-budget-compte-budgitaire',
  templateUrl: './budget-compte-budgitaire.component.html',
  styleUrls: ['./budget-compte-budgitaire.component.css']
})
export class BudgetCompteBudgitaireComponent implements OnInit {

  private _selectedBcb: BudgetCompteBudgitaire = new BudgetCompteBudgitaire();
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
  public get budgetCompteBudgitaires() {
    return this.budgetService.budgetCbs;
  }

  public get compteBudgitaire() {
    return this.budgetService.compteBudgitaireCreate;
  }

  public get detaillesBudgetVo() {
    return this.budgetService.detaillesBudgetVo3;
  }

  public get bcbsRecherches() {
    return this.budgetService.bcbs;
  }

  ngOnInit() {
  }

  public addBudgetCompteBudgitaire() {
    this.budgetService.addBudgetCompteBudgitaireCreate();
  }

  get selectedBcb(): BudgetCompteBudgitaire {
    return this._selectedBcb;
  }

  set selectedBcb(value: BudgetCompteBudgitaire) {
    this._selectedBcb = value;
  }

  public getBcbInfos(bcbr: BudgetCompteBudgitaire) {
    if (this._selectedBcb == null) {
      this._selectedBcb = new BudgetCompteBudgitaire();
    }
    this._selectedBcb = bcbr;
  }

  public update() {

  }

  public delete() {

  }

}
