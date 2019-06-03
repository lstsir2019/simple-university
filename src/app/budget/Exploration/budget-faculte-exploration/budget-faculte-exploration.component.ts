import {Component, OnInit} from '@angular/core';
import {BudgetCompteBudgitaireVo} from '../../../controller/model/budget/budget-compte-budgitaire.model';
import {BudgetService} from '../../../controller/service/budget.service';
import {BudgetExplorationComponent} from '../budget-exploration/budget-exploration.component';
import {BudgetFaculteVo} from '../../../controller/model/budget/budget-faculte.model';
import {DetaillesBudgetVo} from '../../../controller/model/budget/detailles-budget.model';

@Component({
  selector: 'app-budget-faculte-exploration',
  templateUrl: './budget-faculte-exploration.component.html',
  styleUrls: ['./budget-faculte-exploration.component.css']
})
export class BudgetFaculteExplorationComponent implements OnInit {

  budgetCompteBudgitaires: Array<BudgetCompteBudgitaireVo> = new Array<BudgetCompteBudgitaireVo>();

  public budgetFaculte: BudgetFaculteVo = new BudgetFaculteVo();

  constructor(private budgetService: BudgetService, private budgetExploration: BudgetExplorationComponent) {
  }

  ngOnInit() {
    this.budgetService.findAllBudgetFaculte();
  }

  public get budgetFaculteAll() {
    return this.budgetService.allBudgetFaculte;
  }

  findDetaillesByAnnne(annee) {
    this.budgetService.findDetaillesByAnnne(annee).subscribe(
      data => {
        console.log(data);
        this.budgetCompteBudgitaires = data;
        console.log('budgetCompteBudgitaires' + this.budgetCompteBudgitaires);
      }
    );
  }
  findBudgetProjet(){
    this.budgetService.findBudgetProjetExpo(this.budgetFaculte);
  }

  findDetailles() {
    console.log(this.budgetFaculte.annee);
    this.findDetaillesByAnnne(this.budgetFaculte.annee);
  }
}
