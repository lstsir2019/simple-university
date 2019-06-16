import {Component, OnInit} from '@angular/core';
import {BudgetCompteBudgitaireVo} from '../../../controller/model/budget/budget-compte-budgitaire.model';
import {BudgetProjetVo} from '../../../controller/model/budget/budget-projet.model';
import {BudgetService} from '../../../controller/service/budget.service';
import {BudgetSousProjetVo} from '../../../controller/model/budget/budget-sous-projet.model';

@Component({
  selector: 'app-budget-sous-projet-exploration',
  templateUrl: './budget-sous-projet-exploration.component.html',
  styleUrls: ['./budget-sous-projet-exploration.component.css']
})
export class BudgetSousProjetExplorationComponent implements OnInit {

  budgetCompteBudgitaires: Array<BudgetCompteBudgitaireVo> = new Array<BudgetCompteBudgitaireVo>();
  budgetSousProjet: BudgetSousProjetVo=new BudgetSousProjetVo();

  constructor(private budgetService: BudgetService) {
  }

  ngOnInit() {
  }

  public get budgetSousProjetList() {
    return this.budgetService.budgetProjetExpo.budgetSousProjetVos;
  }

  public findDetailles() {
    this.budgetService.findBudgetCompteBudgitaireRest(this.budgetSousProjet.budgetProjetVo.referenceProjet, this.budgetSousProjet.referenceSousProjet, this.budgetService.budgetFaculteExpo.annee).subscribe(
      data=>{
        this.budgetCompteBudgitaires=data;
      }
    );
  }
  public printSousProjet(){
    this.budgetService.printSousProjet(this.budgetSousProjet.budgetProjetVo.referenceProjet, this.budgetSousProjet.referenceSousProjet, this.budgetService.budgetFaculteExpo.annee);
  }


}
