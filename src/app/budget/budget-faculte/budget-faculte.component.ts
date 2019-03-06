import {Component, OnInit} from '@angular/core';
import {BudgetService} from '../../controller/service/budget.service';

@Component({
  selector: 'app-budget-faculte',
  templateUrl: './budget-faculte.component.html',
  styleUrls: ['./budget-faculte.component.css']
})
export class BudgetFaculteComponent implements OnInit {

  ngOnInit() {
  }
  constructor(private bfService: BudgetService) {
  }

  public get budgetFaculteVo() {
    return this.bfService.budgetFaculteCreate;
  }

  public get detaillesBudgetVo() {
    return this.bfService.detaillesBudgetVo0;
  }

  get bf() {
    return this.bfService.bf;
  }

  public bfinfo() {
    this.bfService.findAllByAnnee();
  }

  public delete(annee: number) {
    this.bfService.deleteBudgetFaculte(annee).subscribe();
  }
}
