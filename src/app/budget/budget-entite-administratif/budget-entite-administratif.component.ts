import {Component, OnInit} from '@angular/core';
import {BudgetEntiteAdministratif} from '../../controller/model/budget/budget-entite-administratif.model';
import {BudgetService} from '../../controller/service/budget.service';

@Component({
  selector: 'app-budget-entite-administratif',
  templateUrl: './budget-entite-administratif.component.html',
  styleUrls: ['./budget-entite-administratif.component.css']
})
export class BudgetEntiteAdministratifComponent implements OnInit {

  private _beasNoInDb: Array<BudgetEntiteAdministratif> = [];
  private _selectedBea: BudgetEntiteAdministratif = new BudgetEntiteAdministratif();
  constructor(private budgetService: BudgetService) {
  }

  get beasNoInDb(): Array<BudgetEntiteAdministratif> {
    return this._beasNoInDb;
  }

  public get budgetEntiteAdmin() {
    return this.budgetService.budgetEntiteAdministratifCreate;
  }

  set beasNoInDb(value: Array<BudgetEntiteAdministratif>) {
    this._beasNoInDb = value;
  }

  public get budgetSousProjetClone() {
    return this.budgetService.budgetSousProjetCreateClone1;
  }

  public get detailleBudgetVo() {
    return this.budgetService.detaillesBudgetVo2;
  }

  get beas() {
    return this.budgetService.beas;
  }

  public findAllByAnneeAndBudgetSousProjetAndBudgetEntitiAdmin() {
    return this.budgetService.findAllByAnneeAndBudgetSousProjetAndBudgetEntitiAdmin();
  }
  ngOnInit() {
  }

  get selectedBea() {
    return this._selectedBea;
  }
  public addBudgetEntiteAdmin() {
    return this.budgetService.addBudgetEntiteAdministratif();
  }

  set selectedBea(value) {
    this._selectedBea = value;
  }

  public getBeaInfos(bear: BudgetEntiteAdministratif) {
    this._selectedBea = bear;
  }

  public get budgetEntiteAdmins() {
    return this.budgetService.budgetEnAdmins;
  }

  public deleteBsp(bea: BudgetEntiteAdministratif) {
    const index: number = this.budgetEntiteAdmins.indexOf(bea);
    if (index !== -1) {
      this.budgetEntiteAdmins.splice(index, 1);
    }
  }

  public update() {

  }

  public delete() {

  }

}
