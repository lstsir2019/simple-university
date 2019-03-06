import {Component, OnInit} from '@angular/core';
import {BudgetSousProjet} from '../../controller/model/budget/budget-sous-projet.model';
import {BudgetService} from '../../controller/service/budget.service';

@Component({
  selector: 'app-budget-sous-projet',
  templateUrl: './budget-sous-projet.component.html',
  styleUrls: ['./budget-sous-projet.component.css']
})
export class BudgetSousProjetComponent implements OnInit {

  private _selectedBsp: BudgetSousProjet;
  public bspInfo: BudgetSousProjet = new BudgetSousProjet();

  constructor(private bfs: BudgetService) {
  }

  public get bsps() {
    return this.bfs.bsps;
  }

  get selectedBsp(): BudgetSousProjet {
    if (this._selectedBsp == null) {
      this._selectedBsp = new BudgetSousProjet();
    }
    return this._selectedBsp;
  }

  ngOnInit() {
  }

  public tableInfo(bsp) {
    this.bspInfo = bsp;
  }

  public get budgetSousprojet() {
    return this.bfs.budgetSousProjetCreate;
  }

  public get detaillesBudgetVo() {
    return this.bfs.detaillesBudgetVo1;
  }

  public get budgetsSousProgets() {
    return this.bfs.budgetFaculteCreate.budgetSousProjetVo;
  }

  public deleteBsp(bsp: BudgetSousProjet) {
    const index: number = this.budgetsSousProgets.indexOf(bsp);
    if (index !== -1) {
      this.budgetsSousProgets.splice(index, 1);
    }
  }

  public addBudgetSousProjet() {
    return this.bfs.addBudgetSousProjet();
  }

  set selectedBsp(value: BudgetSousProjet) {
    this._selectedBsp = value;
  }

  public getBspInfos(bspr: BudgetSousProjet) {
    this._selectedBsp = bspr;
  }

  public findAllByAnneeAndBudgetSousProjet() {
    return this.bfs.findAllByAnneeAndBudgetSousProjet();
  }

  public update() {
  }

  public delete() {
  }
}
