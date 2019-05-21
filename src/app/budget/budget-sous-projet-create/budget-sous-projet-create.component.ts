import {Component, OnInit} from '@angular/core';
import {BudgetService} from '../../controller/service/budget.service';
import {getReact} from '../../controller/service/evolutions/Util/SwalReact';
import swal from 'sweetalert2';
import Swal from "sweetalert2";

@Component({
  selector: 'app-budget-sous-projet-create',
  templateUrl: './budget-sous-projet-create.component.html',
  styleUrls: ['./budget-sous-projet-create.component.css']
})
export class BudgetSousProjetCreateComponent implements OnInit {

  constructor(private budgetService: BudgetService) {
  }

  private SWAL = getReact('BudgetSousProjet', true);

  ngOnInit() {
  }

  public mode: number = 0;

  public get budgetSousProjetCreate() {
    return this.budgetService.budgetSousProjetCreate;
  }

  public ajouterNewBudgetSousProjet() {
    if (this.budgetSousProjetCreate.referenceSousProjet=="" || this.budgetSousProjetCreate.detaillesBudgetVo.creditOuvertEstimatif==null || this.budgetSousProjetCreate.detaillesBudgetVo.creditOuvertReel==null || this.budgetSousProjetCreate.detaillesBudgetVo.engagePaye==null || this.budgetSousProjetCreate.detaillesBudgetVo.engageNonPaye==null){
      Swal.fire(this.SWAL.ERROR_NOT_ENOUGH_DATA);
    } else {
      this.budgetService.ajouterNewBudgetSousProjet();
      Swal.fire(this.SWAL.SUCCESS_CREATE);
    }


  }


  public changeMode() {
    if (this.mode == 0) {
      this.mode = 1;
    } else if (this.mode == 1) {
      this.mode = 0;
    }
  }

}
