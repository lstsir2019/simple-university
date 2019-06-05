import { Component, OnInit } from '@angular/core';
import {BudgetCompteBudgitaireVo} from '../../../controller/model/budget/budget-compte-budgitaire.model';
import {BudgetService} from '../../../controller/service/budget.service';
import {BudgetProjetVo} from '../../../controller/model/budget/budget-projet.model';

@Component({
  selector: 'app-budget-projet-exploration',
  templateUrl: './budget-projet-exploration.component.html',
  styleUrls: ['./budget-projet-exploration.component.css']
})
export class BudgetProjetExplorationComponent implements OnInit {

  budgetCompteBudgitaires: Array<BudgetCompteBudgitaireVo> = new Array<BudgetCompteBudgitaireVo>();
  budgetProjet:BudgetProjetVo=new BudgetProjetVo();

  constructor(private budgetService: BudgetService) {
  }

  ngOnInit() {
  }
  public findBudgetSousProjet() {
    this.budgetService.findBudgetSousProjetExpo(this.budgetProjet);
  }

  findDetailles() {
    this.budgetService.findDetaillesByProjet(this.budgetProjet.id).subscribe(
      data => {
        this.budgetCompteBudgitaires = data;
      }
    );
  }

  public get budgetProjetList() {
    return this.budgetService.budgetFaculteExpo.budgetProjetVos;
  }
}
