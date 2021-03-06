import {Component, OnInit} from '@angular/core';
import {BudgetService} from '../../../controller/service/budget.service';
import {BudgetFaculteVo} from '../../../controller/model/budget/budget-faculte.model';

@Component({
  selector: 'app-budget-faculte',
  templateUrl: './budget-faculte.component.html',
  styleUrls: ['./budget-faculte.component.css']
})
export class BudgetFaculteComponent implements OnInit {

  ngOnInit() {

  }


  constructor(private budgetService: BudgetService) {

  }



  public get budgetFaculteSearsh(){
    return this.budgetService.budgetFaculteSearchByAnneeMinMax;
  }

  public get budgetFaculteList(){
    return this.budgetService.budgetFaculteList;
  }


  public findByAnneeMinAndMax(){
    this.budgetService.findByAnneeMinAndMax();
  }


  public detail(bf:BudgetFaculteVo){
    this.budgetService.detaillBudgetFaculte(bf);
  }


  public deleteBudgetFaculte(bf:BudgetFaculteVo){
    this.budgetService.deleteBudgetFaculte(bf);
  }


}
