import {Component, OnInit} from '@angular/core';
import {BudgetFaculte} from '../../controller/model/budget/budget-faculte.model';
import {BudgetService} from '../../controller/service/budget.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(private _budgetService: BudgetService) {
  }

  private _bfCreate: BudgetFaculte = new BudgetFaculte();

  get bfCreate(): BudgetFaculte {
    return this._bfCreate;
  }

  set bfCreate(value: BudgetFaculte) {
    this._bfCreate = value;
  }

  get budgetService(): BudgetService {
    return this._budgetService;
  }

  set budgetService(value: BudgetService) {
    this._budgetService = value;
  }

  ngOnInit() {
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
}
