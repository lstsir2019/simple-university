import {Component, OnInit} from '@angular/core';
import {BudgetCompteBudgitaireVo} from '../../controller/model/budget/budget-compte-budgitaire.model';
import {BudgetService} from '../../controller/service/budget.service';

@Component({
  selector: 'app-budget-compte-budgitaire',
  templateUrl: './budget-compte-budgitaire.component.html',
  styleUrls: ['./budget-compte-budgitaire.component.css']
})
export class BudgetCompteBudgitaireComponent implements OnInit {


  constructor(private budgetService: BudgetService) {
  }

  ngOnInit() {
  }

  public get budgetCompteBudgiaireList(){
    return this.budgetService.budgetSousProjetPrincipal.budgetCompteBudgitaireVos;
  }


}
