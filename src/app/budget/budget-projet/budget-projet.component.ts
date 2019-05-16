import {Component, OnInit} from '@angular/core';
import {BudgetProjetVo} from '../../controller/model/budget/budget-projet.model';
import {BudgetService} from '../../controller/service/budget.service';
import * as jsPDF from 'jspdf';
import {BudgetFaculteVo} from '../../controller/model/budget/budget-faculte.model';

@Component({
  selector: 'app-budget-projet',
  templateUrl: './budget-projet.component.html',
  styleUrls: ['./budget-projet.component.css']
})
export class BudgetProjetComponent implements OnInit {



  constructor(private budgetService: BudgetService) {
  }
  budgetFaculeteSelected:BudgetFaculteVo;

  ngOnInit() {

  }

  public get budgetFaculte(){
    return this.budgetService.budgetFacultePrincipal;
  }
  public get budgetFaculteList(){
    return this.budgetService.budgetFaculteList;
  }


  public get budgetProjetList(){
    return this.budgetService.budgetFacultePrincipal.budgetProjetVos;
  }

  public findBudgetSousProjet(bp:BudgetProjetVo){
    this.budgetService.findBudgetSousProjet(bp);
    this.budgetService.detaillBudgetProjet(bp);
  }

  public detail(bp:BudgetProjetVo){
    this.budgetService.detaillBudgetProjet(bp);
  }
  public remove(bp:BudgetProjetVo){
    this.budgetService.removeBudgetProjet(bp);
  }
  public findBudgetProjet(){
      console.log("haaaaaaaaaaaaaaaaaaaaaaaaaaaaa  "+this.budgetFaculeteSelected);
    this.budgetService.findBudgetProjet(this.budgetFaculeteSelected);

  }

}
