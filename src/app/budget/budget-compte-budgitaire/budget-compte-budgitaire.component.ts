import {Component, OnInit} from '@angular/core';
import {BudgetCompteBudgitaireVo} from '../../controller/model/budget/budget-compte-budgitaire.model';
import {BudgetService} from '../../controller/service/budget.service';
import {BudgetSousProjetVo} from '../../controller/model/budget/budget-sous-projet.model';

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

  budgetSousProjetSelected:BudgetSousProjetVo;

  public get budgetFaculteVo(){
    return this.budgetService.budgetFacultePrincipal;
  }
  public get budgetProjetVo(){
    return this.budgetService.budgetProjetPrincipal;
  }

  public get budgetSousProjet(){
    return this.budgetService.budgetSousProjetPrincipal;
  }


  public findBudgetCompteBudgitaire(){

    console.log("haaaaaaaaaaaaaaaaa sous projet "+this.budgetSousProjetSelected);
    this.budgetService.findBudgetCompteBudgitaire(this.budgetSousProjetSelected);

  }
  public get budgetSousProjetList(){
    return this.budgetService.budgetProjetPrincipal.budgetSousProjetVos;
  }

  public get budgetCompteBudgiaireList(){
    return this.budgetService.budgetSousProjetPrincipal.budgetCompteBudgitaireVos;
  }

  public detail(bcb:BudgetCompteBudgitaireVo){
    this.budgetService.detaillBudgetCompteBudgitaire(bcb);
  }

  public remove(bcb:BudgetCompteBudgitaireVo){
    this.budgetService.removeBudgetCompteBudgitaire(bcb);
  }


}
