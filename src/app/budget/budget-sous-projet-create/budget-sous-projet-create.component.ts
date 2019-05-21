import { Component, OnInit } from '@angular/core';
import {BudgetService} from "../../controller/service/budget.service";

@Component({
  selector: 'app-budget-sous-projet-create',
  templateUrl: './budget-sous-projet-create.component.html',
  styleUrls: ['./budget-sous-projet-create.component.css']
})
export class BudgetSousProjetCreateComponent implements OnInit {

  constructor(private budgetService: BudgetService) { }

  ngOnInit() {
  }
  public mode:number=0;

  public get budgetSousProjetCreate(){
    return this.budgetService.budgetSousProjetCreate;
  }
  public ajouterNewBudgetSousProjet(){
    this.budgetService.ajouterNewBudgetSousProjet();
  }


  public changeMode(){
    if (this.mode==0){
      this.mode=1;
    }else if (this.mode==1){
      this.mode=0
    }
  }

}
