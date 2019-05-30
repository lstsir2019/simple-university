import {Component, Input, OnInit} from '@angular/core';
import {BudgetSousProjetVo} from '../../controller/model/budget/budget-sous-projet.model';
import {BudgetProjetVo} from '../../controller/model/budget/budget-projet.model';
import {BudgetCompteBudgitaireVo} from '../../controller/model/budget/budget-compte-budgitaire.model';
import {BudgetService} from '../../controller/service/budget.service';

@Component({
  selector: 'app-detailles',
  templateUrl: './detailles.component.html',
  styleUrls: ['./detailles.component.css']
})
export class DetaillesComponent implements OnInit {

  @Input() _selectedBsp:BudgetSousProjetVo=new BudgetSousProjetVo();
  @Input() _selectedBudgetEntiteAdministratif:BudgetProjetVo=new BudgetProjetVo();
  @Input() _selectedBudgetCompteBudgitaire:BudgetCompteBudgitaireVo=new BudgetCompteBudgitaireVo();
  constructor(private budgetService: BudgetService) { }

  ngOnInit() {
  }

  public get detail(){
    return this.budgetService.detailClone;
  }

  public save(){
    this.budgetService.update();
  }

}
