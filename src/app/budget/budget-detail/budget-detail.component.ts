import { Component, OnInit } from '@angular/core';
import {BudgetService} from '../../controller/service/budget.service';

@Component({
  selector: 'app-budget-detail',
  templateUrl: './budget-detail.component.html',
  styleUrls: ['./budget-detail.component.css']
})
export class BudgetDetailComponent implements OnInit {

  constructor(private budgetService: BudgetService) { }

  ngOnInit() {
  }

  public get detail(){
    return this.budgetService.detail;
  }

}
