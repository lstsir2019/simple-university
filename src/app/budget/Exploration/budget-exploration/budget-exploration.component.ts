import {Component, OnInit} from '@angular/core';
import {BudgetCompteBudgitaireVo} from '../../../controller/model/budget/budget-compte-budgitaire.model';
import {BudgetService} from '../../../controller/service/budget.service';
import {DetaillesBudgetVo} from '../../../controller/model/budget/detailles-budget.model';

@Component({
  selector: 'app-budget-exploration',
  templateUrl: './budget-exploration.component.html',
  styleUrls: ['./budget-exploration.component.css']
})
export class BudgetExplorationComponent implements OnInit {
  budgetCompteBudgitaires: Array<BudgetCompteBudgitaireVo> = new Array<BudgetCompteBudgitaireVo>();
  annee: number;
  detailles:DetaillesBudgetVo=new DetaillesBudgetVo("","","","","","","","","","","");
  constructor(private budgetService: BudgetService) {
  }

  ngOnInit() {
  }

  findDetailles(annee) {
    this.budgetService.findDetaillesByAnnne(annee).subscribe(
      data => {
        console.log(data);
        this.budgetCompteBudgitaires = data;
        console.log("budgetCompteBudgitaires"+this.budgetCompteBudgitaires);
      }
    );
  }

  findDetaillesByProjet(id) {
    this.budgetService.findDetaillesByProjet(id).subscribe(
      data => {
        this.budgetCompteBudgitaires = data;
      }
    );
  }
}
