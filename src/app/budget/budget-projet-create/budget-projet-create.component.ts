import { Component, OnInit } from '@angular/core';
import {BudgetService} from "../../controller/service/budget.service";

@Component({
  selector: 'app-budget-projet-create',
  templateUrl: './budget-projet-create.component.html',
  styleUrls: ['./budget-projet-create.component.css']
})
export class BudgetProjetCreateComponent implements OnInit {

  constructor(private budgetService: BudgetService) { }

  ngOnInit() {
  }
  public get budgetProjetCreate(){
    return this.budgetService.budgetProjetCreate;
  }
  public ajouterNewBudgetProjet(){
    this.budgetService.ajouterNewBudgetProjet();
  }

}
