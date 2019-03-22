import {Component, OnInit} from '@angular/core';
import {BudgetService} from '../../controller/service/budget.service';
import Swal from 'sweetalert2';
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
    if (this.budgetFaculteVo!=null) {
    this.budgetService.findAllByAnnee();
    }
  }

  public delete(annee: number) {
    Swal({
      title: 'Etes-vous sure?',
      text: "Vous ne pouvez pas revenir en arrière!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.value) {
        if (annee!=null){
          this.budgetService.deleteBudgetFaculte(annee).subscribe();
          this.budgetService.refreshAllFromBf();
        }
        Swal(
          'Supprimmé!',
          'Vos données ont été supprimés.',
          'success'
        );
      }
    });
  }

  public get date(){
    return new Date().getUTCFullYear();
  }
}
