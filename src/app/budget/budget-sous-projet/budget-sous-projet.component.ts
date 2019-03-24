import {Component, Input, OnInit} from '@angular/core';
import {BudgetSousProjetVo} from '../../controller/model/budget/budget-sous-projet.model';
import {BudgetService} from '../../controller/service/budget.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-budget-sous-projet',
  templateUrl: './budget-sous-projet.component.html',
  styleUrls: ['./budget-sous-projet.component.css']
})
export class BudgetSousProjetComponent implements OnInit {

  public _selectedBsp: BudgetSousProjetVo;
  public bspInfo: BudgetSousProjetVo = new BudgetSousProjetVo();

  constructor(private budgetService: BudgetService) {
  }

  get selectedBsp(): BudgetSousProjetVo {
    if (this._selectedBsp == null) {
      this._selectedBsp = new BudgetSousProjetVo();
    }
    return this._selectedBsp;
  }

  ngOnInit() {
    this.budgetService.findAllSousProjet();
  }

  public tableBudgetSousProjetInfo(bsp) {
    this.bspInfo = bsp;
  }

  public get budgetSousprojet() {
    return this.budgetService.budgetSousProjetCreate;
  }

  public get detaillesBudgetVo() {
    return this.budgetService.detaillesBudgetVo1;
  }

  public get budgetsSousProjets() {
    return this.budgetService.bsps;
  }

  public deleteBudgetSousProjet(bsp: BudgetSousProjetVo) {
    const index: number = this.budgetsSousProjets.indexOf(bsp);
    if (bsp.id==0) {
      if (index !== -1) {
        this.budgetsSousProjets.splice(index, 1);
      }
    }else {
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
          if (index !== -1) {
            this.budgetsSousProjets.splice(index, 1);
          }
          this.budgetService.deleteBudgetSousProjet(bsp).subscribe();
          //this.budgetService.refreshAllFromBf();
          Swal(
            'Supprimmé!',
            'Vos données ont été supprimés.',
            'success'
          );
        }
      });
    }
  }

  public update() {
    this.budgetService.updateBudgetSousProjet(this.bspInfo.referenceSousProjet);
  }

  public get sousProjets(){
    return this.budgetService.allSousProjet;
  }

  public addBudgetSousProjet() {
    return this.budgetService.addBudgetSousProjet();
  }

  set selectedBsp(value: BudgetSousProjetVo) {
    this._selectedBsp = value;
  }

  public setBudgetSousProjetInfos(bspr: BudgetSousProjetVo){
    this._selectedBsp = bspr;
  }

  public findAllByAnneeAndBudgetSousProjet() {
    return this.budgetService.findAllByAnneeAndBudgetSousProjet();
  }


}
