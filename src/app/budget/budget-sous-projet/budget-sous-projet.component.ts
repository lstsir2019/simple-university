import {Component, OnInit} from '@angular/core';
import {BudgetSousProjetVo} from '../../controller/model/budget/budget-sous-projet.model';
import {BudgetService} from '../../controller/service/budget.service';
import * as jsPDF from 'jspdf';
import {BudgetProjetVo} from '../../controller/model/budget/budget-projet.model';
import Swal from "sweetalert2";

@Component({
  selector: 'app-budget-sous-projet',
  templateUrl: './budget-sous-projet.component.html',
  styleUrls: ['./budget-sous-projet.component.css']
})
export class BudgetSousProjetComponent implements OnInit {


  constructor(private budgetService: BudgetService) {
  }

  ngOnInit() {

  }

  public get budgetFaculteVo(){
    return this.budgetService.budgetFacultePrincipal;
  }

  budgetPtogetSelected: BudgetProjetVo;

  public get budgetProjet() {
    return this.budgetService.budgetProjetPrincipal;
  }

  public get budgetSousProjet() {
    return this.budgetService.budgetProjetPrincipal.budgetSousProjetVos;
  }


  public detail(bsp: BudgetSousProjetVo) {

    this.budgetService.detaillBudgetSousProjet(bsp);
  }

  public remove(bsp: BudgetSousProjetVo) {
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
        this.budgetService.removeBudgetSousProjet(bsp);

        Swal.fire(
          'Supprimmé!',
          'Vos données ont été supprimés.',
          'success'
        );
      }
    });


  }

  public findBudgetSousProjet() {
    this.budgetService.findBudgetSousProjet(this.budgetPtogetSelected);
    this.budgetService.findSousProjetByProjet();

  }

  public get budgetProjetList() {
    return this.budgetService.budgetFacultePrincipal.budgetProjetVos;
  }


}
