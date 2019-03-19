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
  constructor(private budgetService: BudgetService) {
  }

  public get budgetFaculteVo() {
    return this.budgetService.budgetFaculteCreate;
  }

  public get budgetFaculteVo1(){
    return this.budgetService.budgetFaculteCreate1;
  }

  public get detaillesBudgetVo() {
    return this.budgetService.budgetFaculteCreate.detaillesBudgetVo;
  }
  /*
  get bf() {
    return this.budgetService.bf;
  }
*/
  public findByAnneeMinAndAnneeMax(){
    this.budgetService.findAllByAnneeMinAndAnneeMax();
  }
  public get budgetFacultes(){
    return this.budgetService.budgetFacultes;
  }
  public bfinfo() {
    this.budgetService.findAllByAnnee();
  }

  public delete(annee: number) {
    if (annee!=null){
      this.budgetService.deleteBudgetFaculte(annee).subscribe();
      this.budgetService.refreshAllFromBf();
    }
  }

  public get date(){
    return new Date().getUTCFullYear();
  }
}
