import {Component, OnInit} from '@angular/core';
import {BudgetProjetVo} from '../../controller/model/budget/budget-projet.model';
import {BudgetService} from '../../controller/service/budget.service';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-budget-projet',
  templateUrl: './budget-projet.component.html',
  styleUrls: ['./budget-projet.component.css']
})
export class BudgetProjetComponent implements OnInit {



  constructor(private budgetService: BudgetService) {
  }

  ngOnInit() {

  }


  public get budgetProjetList(){
    return this.budgetService.budgetFacultePrincipal.budgetProjetVos;
  }

  public findBudgetSousProjet(bp:BudgetProjetVo){
    this.budgetService.findBudgetSousProjet(bp);
  }

  public detail(bp:BudgetProjetVo){
    this.budgetService.detaillBudgetProjet(bp);
  }

}
