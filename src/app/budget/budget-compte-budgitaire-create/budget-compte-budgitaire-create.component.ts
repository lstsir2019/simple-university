import { Component, OnInit } from '@angular/core';
import {BudgetService} from "../../controller/service/budget.service";

@Component({
  selector: 'app-budget-compte-budgitaire-create',
  templateUrl: './budget-compte-budgitaire-create.component.html',
  styleUrls: ['./budget-compte-budgitaire-create.component.css']
})
export class BudgetCompteBudgitaireCreateComponent implements OnInit {

  constructor(private budgetService: BudgetService) { }

  ngOnInit() {
  }

  public get budgetCompteBudgitaireCreate(){
    return this.budgetService.budgetCompteBudgitaireCreate;
  }
  public ajouterNewBudgetCompteBudegtaireProjet(){
    return this.budgetService.ajouterNewBudgetCompteBudegtaireProjet();
  }


}
