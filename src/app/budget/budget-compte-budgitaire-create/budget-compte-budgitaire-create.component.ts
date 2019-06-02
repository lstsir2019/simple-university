
import {Component, OnInit} from '@angular/core';
import {BudgetService} from '../../controller/service/budget.service';
import {getReact} from '../../controller/service/evolutions/Util/SwalReact';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {CompteBudgitaireVo} from '../../controller/model/budget/compte-budgitaire.model';


@Component({
  selector: 'app-budget-compte-budgitaire-create',
  templateUrl: './budget-compte-budgitaire-create.component.html',
  styleUrls: ['./budget-compte-budgitaire-create.component.css']
})
export class BudgetCompteBudgitaireCreateComponent implements OnInit {

  myControl = new FormControl();
  filteredOptions: Observable<CompteBudgitaireVo>;

  ngOnInit() {
    this.budgetService.findAllCompteBudgitaire();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): CompteBudgitaireVo {
    const filterValue = value.toString();

    return this.compteBudgitaireList.filter(option => option.code.toLowerCase().includes(filterValue)|| option.libelle.toLowerCase().includes(filterValue));
  }



  public mode: number = 0;
  private SWAL = getReact('BudgetCompteBudgitaire', true);

  constructor(private budgetService: BudgetService) {
  }



  public get compteBudgitaireList() {
    return this.budgetService.compteBudgitaireList;
  }

  public get budgetCompteBudgitaireCreate() {
    return this.budgetService.budgetCompteBudgitaireCreate;
  }

  public ajouterNewBudgetCompteBudegtaireProjet() {
    this.mode = 0;
    this.budgetCompteBudgitaireCreate.compteBudgitaireVo.code=this.myControl.value;
    if (this.budgetCompteBudgitaireCreate.compteBudgitaireVo.code == null || this.budgetCompteBudgitaireCreate.budgetSousProjetVo == null || this.budgetCompteBudgitaireCreate.detaillesBudgetVo.creditOuvertReel == null || this.budgetCompteBudgitaireCreate.detaillesBudgetVo.creditOuvertEstimatif == null || this.budgetCompteBudgitaireCreate.detaillesBudgetVo.engagePaye == null || this.budgetCompteBudgitaireCreate.detaillesBudgetVo.engageNonPaye == null) {
      Swal.fire(this.SWAL.ERROR_NOT_ENOUGH_DATA);
    } else {
      return this.budgetService.ajouterNewBudgetCompteBudegtaireProjet();
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
