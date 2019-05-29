import {Component, OnInit} from '@angular/core';
import {BudgetProjetVo} from '../../controller/model/budget/budget-projet.model';
import {BudgetService} from '../../controller/service/budget.service';
import * as jsPDF from 'jspdf';
import {BudgetFaculteVo} from '../../controller/model/budget/budget-faculte.model';
import Swal from "sweetalert2";

@Component({
  selector: 'app-budget-projet',
  templateUrl: './budget-projet.component.html',
  styleUrls: ['./budget-projet.component.css']
})
export class BudgetProjetComponent implements OnInit {


  constructor(private budgetService: BudgetService) {
  }

  budgetFaculeteSelected: BudgetFaculteVo;

  ngOnInit() {
    this.budgetService.findAllBudgetFaculte();
  }

  public get budgetFaculte() {
    return this.budgetService.budgetFacultePrincipal;
  }

  public get budgetFaculteAll() {
    return this.budgetService.allBudgetFaculte;
  }


  public get budgetProjetList() {
    return this.budgetService.budgetFacultePrincipal.budgetProjetVos;
  }


  public detail(bp: BudgetProjetVo) {
    this.budgetService.detaillBudgetProjet(bp);
  }

  public remove(bp: BudgetProjetVo) {
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
      this.budgetService.removeBudgetProjet(bp);

        Swal.fire(
          'Supprimmé!',
          'Vos données ont été supprimés.',
          'success'
        );
      }
    });

  }

  public findBudgetProjet() {
    console.log('haaaaaaaaaaaaaaaaaaaaaaaaaaaaa  ' + this.budgetFaculeteSelected);
    this.budgetService.findBudgetProjet(this.budgetFaculeteSelected);

  }

}
