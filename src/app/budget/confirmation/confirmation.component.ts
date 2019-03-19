import {Component, OnInit} from '@angular/core';
import {BudgetService} from '../../controller/service/budget.service';
import {BudgetCompteBudgitaireVo} from '../../controller/model/budget/budget-compte-budgitaire.model';
import {BudgetEntiteAdministratifVo} from '../../controller/model/budget/budget-entite-administratif.model';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  private _selectedBcb:BudgetCompteBudgitaireVo;
  constructor(private _budgetService: BudgetService) {
  }

  public get bfCreate() {
    return this._budgetService.budgetFaculteCreate;
  }

  get budgetService(): BudgetService {
    return this._budgetService;
  }

  set budgetService(value: BudgetService) {
    this._budgetService = value;
  }

  ngOnInit() {
  }

  public setSelectedBcb(bsb:BudgetCompteBudgitaireVo){
    this._selectedBcb=bsb;
  }
  /*
  public get bsps(){
    if (this._bfCreate==null) {
      this._bfCreate=this._budgetService.budgetFaculteCreate;
    }
    return this._budgetService.budgetFaculteCreate.budgetSousProjetVo;
  }
  */
  public saveAll() {
    this._budgetService.saveAllInBudgetFaculte();
  }

  get selectedBcb(): BudgetCompteBudgitaireVo {
    return this._selectedBcb;
  }

  set selectedBcb(value: BudgetCompteBudgitaireVo) {
    this._selectedBcb = value;
  }
}
