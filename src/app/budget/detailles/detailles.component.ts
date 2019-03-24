import {Component, Input, OnInit} from '@angular/core';
import {BudgetSousProjetVo} from '../../controller/model/budget/budget-sous-projet.model';
import {BudgetEntiteAdministratifVo} from '../../controller/model/budget/budget-entite-administratif.model';
import {BudgetCompteBudgitaireVo} from '../../controller/model/budget/budget-compte-budgitaire.model';

@Component({
  selector: 'app-detailles',
  templateUrl: './detailles.component.html',
  styleUrls: ['./detailles.component.css']
})
export class DetaillesComponent implements OnInit {

  @Input() _selectedBsp:BudgetSousProjetVo=new BudgetSousProjetVo();
  @Input() _selectedBudgetEntiteAdministratif:BudgetEntiteAdministratifVo=new BudgetEntiteAdministratifVo();
  @Input() _selectedBudgetCompteBudgitaire:BudgetCompteBudgitaireVo=new BudgetCompteBudgitaireVo();
  constructor() { }

  ngOnInit() {
  }

}
