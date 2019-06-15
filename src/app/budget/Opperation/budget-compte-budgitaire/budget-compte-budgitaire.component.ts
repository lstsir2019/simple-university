import {Component, OnInit} from '@angular/core';
import {BudgetCompteBudgitaireVo} from '../../../controller/model/budget/budget-compte-budgitaire.model';
import {BudgetService} from '../../../controller/service/budget.service';
import {BudgetSousProjetVo} from '../../../controller/model/budget/budget-sous-projet.model';
import Swal from 'sweetalert2';
import {MatDialog} from '@angular/material';
import {BudgetCompteBudgitaireCreateComponent} from '../budget-compte-budgitaire-create/budget-compte-budgitaire-create.component';

@Component({
  selector: 'app-budget-compte-budgitaire',
  templateUrl: './budget-compte-budgitaire.component.html',
  styleUrls: ['./budget-compte-budgitaire.component.css']
})
export class BudgetCompteBudgitaireComponent implements OnInit {


  constructor(private budgetService: BudgetService, public dialog: MatDialog) {
  }

  ngOnInit() {

  }

  openDialog() {
    const dialogRef = this.dialog.open(BudgetCompteBudgitaireCreateComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  budgetSousProjetSelected: BudgetSousProjetVo;

  public get budgetFaculteVo() {
    return this.budgetService.budgetFacultePrincipal;
  }

  public get budgetProjetVo() {
    return this.budgetService.budgetProjetPrincipal;
  }

  public get budgetSousProjet() {
    return this.budgetService.budgetSousProjetPrincipal;
  }


  public findBudgetCompteBudgitaire() {
    this.budgetService.findBudgetCompteBudgitaire(this.budgetSousProjetSelected);
  }

  public get budgetSousProjetList() {
    return this.budgetService.budgetProjetPrincipal.budgetSousProjetVos;
  }

  public get budgetCompteBudgiaireList() {
    return this.budgetService.budgetSousProjetPrincipal.budgetCompteBudgitaireVos;
  }

  public detail(bcb: BudgetCompteBudgitaireVo) {
    this.budgetService.detaillBudgetCompteBudgitaire(bcb);
  }

  public remove(bcb: BudgetCompteBudgitaireVo) {
    Swal.fire({
      title: 'Etes-vous sure?',
      text: 'Vous ne pouvez pas revenir en arrière!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.value) {
        this.budgetService.removeBudgetCompteBudgitaire(bcb);
      }
    });

  }


}
