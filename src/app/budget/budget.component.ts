import { Component, OnInit } from '@angular/core';
import {BudgetService} from '../controller/service/budget.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  constructor(private budgetService: BudgetService) { }

  ngOnInit() {
  }

  //
  // calcul() {
  //   this.budgetService.size();
  // }
}
