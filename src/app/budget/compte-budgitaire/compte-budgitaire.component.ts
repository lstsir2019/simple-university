import { Component, OnInit } from '@angular/core';
import {BudgetService} from '../../controller/service/budget.service';
import {CompteBudgitaireVo} from '../../controller/model/budget/compte-budgitaire.model';

@Component({
  selector: 'app-compte-budgitaire',
  templateUrl: './compte-budgitaire.component.html',
  styleUrls: ['./compte-budgitaire.component.css']
})
export class CompteBudgitaireComponent implements OnInit {


  constructor(private budgetService: BudgetService) { }

  ngOnInit() {
    this.budgetService.findAllCompteBudgitaire();
  }

  get compteList(){
    return this.budgetService.compteBudgitaireList;
  }

  deleteCompte(compte:CompteBudgitaireVo) {
    
  }
}
