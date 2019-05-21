import { Component, OnInit } from '@angular/core';
import {BudgetService} from "../../controller/service/budget.service";
import {getReact} from '../../controller/service/evolutions/Util/SwalReact';
import swal from 'sweetalert2';
import Swal from "sweetalert2";

@Component({
  selector: 'app-budget-compte-budgitaire-create',
  templateUrl: './budget-compte-budgitaire-create.component.html',
  styleUrls: ['./budget-compte-budgitaire-create.component.css']
})
export class BudgetCompteBudgitaireCreateComponent implements OnInit {

  public mode:number=0;
  private SWAL = getReact('BudgetCompteBudgitaire', true);

  constructor(private budgetService: BudgetService) { }

  ngOnInit() {
    this.budgetService.findAllCompteBudgitaire();
  }

  public get compteBudgitaireList(){
    return this.budgetService.compteBudgitaireList;
  }
  public get budgetCompteBudgitaireCreate(){
    return this.budgetService.budgetCompteBudgitaireCreate;
  }
  public ajouterNewBudgetCompteBudegtaireProjet(){
    this.mode=0;
    if (this.budgetCompteBudgitaireCreate.compteBudgitaireVo.code==null || this.budgetCompteBudgitaireCreate.budgetSousProjetVo==null || this.budgetCompteBudgitaireCreate.detaillesBudgetVo.creditOuvertReel==null || this.budgetCompteBudgitaireCreate.detaillesBudgetVo.creditOuvertEstimatif==null || this.budgetCompteBudgitaireCreate.detaillesBudgetVo.engagePaye==null || this.budgetCompteBudgitaireCreate.detaillesBudgetVo.engageNonPaye==null) {
      Swal.fire(this.SWAL.ERROR_NOT_ENOUGH_DATA);
    }else {
      return this.budgetService.ajouterNewBudgetCompteBudegtaireProjet();
      Swal.fire(this.SWAL.SUCCESS_CREATE);
    }


  }

  public changeMode(){
    if (this.mode==0){
      this.mode=1;
    }else if (this.mode==1){
      this.mode=0
    }
  }

}
