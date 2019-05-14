import {Component, OnInit} from '@angular/core';
import {BudgetSousProjetVo} from '../../controller/model/budget/budget-sous-projet.model';
import {BudgetService} from '../../controller/service/budget.service';
import * as jsPDF from 'jspdf';
import {BudgetProjetVo} from "../../controller/model/budget/budget-projet.model";

@Component({
  selector: 'app-budget-sous-projet',
  templateUrl: './budget-sous-projet.component.html',
  styleUrls: ['./budget-sous-projet.component.css']
})
export class BudgetSousProjetComponent implements OnInit {


  constructor(private budgetService: BudgetService) {
  }

  ngOnInit() {

  }

  public get budgetProjet(){
    return this.budgetService.budgetProjetPrincipal;
  }

 public get budgetSousProjet(){
    return this.budgetService.budgetProjetPrincipal.budgetSousProjetVos;
 }

 public findBudgetCompteBudgitaire(bsp: BudgetSousProjetVo){

    this.budgetService.findBudgetCompteBudgitaire(bsp);
   this.budgetService.detaillBudgetSousProjet(bsp);
 }
 public detail(bsp: BudgetSousProjetVo){
    this.budgetService.detaillBudgetSousProjet(bsp);
 }

 public remove(bsp: BudgetSousProjetVo){
    this.budgetService.removeBudgetSousProjet(bsp);
 }
}
