import { Component, OnInit } from '@angular/core';
import {BudgetService} from "../../controller/service/budget.service";

@Component({
  selector: 'app-budget-compte-budgitaire-create',
  templateUrl: './budget-compte-budgitaire-create.component.html',
  styleUrls: ['./budget-compte-budgitaire-create.component.css']
})
export class BudgetCompteBudgitaireCreateComponent implements OnInit {

  public mode:number=0;

  constructor(private budgetService: BudgetService) { }

  ngOnInit() {
    this.budgetService.findAllCompteBudgitaire();
  }

  public get compteBudgitaireList(){
    return this.budgetService.compteBudgitaireList;
  }
  public get budgetCompteBudgitaireCreate(){
    return this.budgetService.budgetCompteBudgitaireCreate;
  }
  public ajouterNewBudgetCompteBudegtaireProjet(){
    this.mode=0;
    return this.budgetService.ajouterNewBudgetCompteBudegtaireProjet();
    this.mode=0;
  }

  public changeMode(){
    if (this.mode==0){
      this.mode=1;
    }else if (this.mode==1){
      this.mode=0
    }
  }

}
