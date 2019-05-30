import { Component, OnInit } from '@angular/core';
import {BudgetService} from "../../controller/service/budget.service";
import {getReact} from '../../controller/service/evolutions/Util/SwalReact';
import swal from 'sweetalert2';
import Swal from "sweetalert2";

@Component({
  selector: 'app-budget-faculte-create',
  templateUrl: './budget-faculte-create.component.html',
  styleUrls: ['./budget-faculte-create.component.css']
})
export class BudgetFaculteCreateComponent implements OnInit {

  private SWAL = getReact('BudgetFaculte', true);

  constructor(private budgetService: BudgetService) { }

  ngOnInit() {
  }
  public get budgetFaculteCreate(){
    return this.budgetService.budgetFaculteCreate;
  }
  public saveBudgetFaculte(){
    if(this.budgetFaculteCreate.annee==null || this.budgetFaculteCreate.detaillesBudgetVo.creditOuvertReel==null || this.budgetFaculteCreate.detaillesBudgetVo.creditOuvertEstimatif==null || this.budgetFaculteCreate.detaillesBudgetVo.engageNonPaye==null || this.budgetFaculteCreate.detaillesBudgetVo.engagePaye==null){
      Swal.fire(this.SWAL.ERROR_NOT_ENOUGH_DATA);
    }else{
      this.budgetService.saveBudgetFaculte();
    }

  }



}
