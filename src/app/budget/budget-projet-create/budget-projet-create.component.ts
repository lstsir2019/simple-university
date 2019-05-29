import {Component, OnInit} from '@angular/core';
import {BudgetService} from '../../controller/service/budget.service';
import {getReact} from '../../controller/service/evolutions/Util/SwalReact';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-budget-projet-create',
  templateUrl: './budget-projet-create.component.html',
  styleUrls: ['./budget-projet-create.component.css']
})
export class BudgetProjetCreateComponent implements OnInit {

  private SWAL = getReact('BudgetProjet', true);

  constructor(private budgetService: BudgetService) {
  }

  ngOnInit() {
    this.budgetService.findAllProjet();
  }

  public get budgetProjetCreate() {

    return this.budgetService.budgetProjetCreate;
  }

  public ajouterNewBudgetProjet() {
    if (this.budgetProjetCreate.referenceProjet == '' || this.budgetProjetCreate.detaillesBudgetVo.creditOuvertReel == null || this.budgetProjetCreate.detaillesBudgetVo.creditOuvertEstimatif == null) {
      Swal.fire(this.SWAL.ERROR_NOT_ENOUGH_DATA);
    } else {
      this.budgetService.ajouterNewBudgetProjet();
    }

  }

  public get allProjet() {
    return this.budgetService.AllProjet;
  }


}
