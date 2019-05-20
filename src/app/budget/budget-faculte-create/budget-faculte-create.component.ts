import { Component, OnInit } from '@angular/core';
import {BudgetService} from "../../controller/service/budget.service";

@Component({
  selector: 'app-budget-faculte-create',
  templateUrl: './budget-faculte-create.component.html',
  styleUrls: ['./budget-faculte-create.component.css']
})
export class BudgetFaculteCreateComponent implements OnInit {

  constructor(private budgetService: BudgetService) { }

  ngOnInit() {
  }
  public get budgetFaculteCreate(){
    return this.budgetService.budgetFaculteCreate;
  }
  public saveBudgetFaculte(){
    this.budgetService.saveBudgetFaculte();
  }



}
