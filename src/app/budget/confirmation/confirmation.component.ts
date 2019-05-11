import {Component, OnInit} from '@angular/core';
import {BudgetService} from '../../controller/service/budget.service';
import {BudgetCompteBudgitaireVo} from '../../controller/model/budget/budget-compte-budgitaire.model';
import {BudgetProjetVo} from '../../controller/model/budget/budget-projet.model';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {


  constructor(private _budgetService: BudgetService) {
  }


  ngOnInit() {
  }


}
