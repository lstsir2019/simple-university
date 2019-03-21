import {Component, OnInit} from '@angular/core';
import {BudgetEntiteAdministratifVo} from '../../controller/model/budget/budget-entite-administratif.model';
import {BudgetService} from '../../controller/service/budget.service';
import {BudgetSousProjetVo} from '../../controller/model/budget/budget-sous-projet.model';
import Swal from "sweetalert2";

@Component({
  selector: 'app-budget-entite-administratif',
  templateUrl: './budget-entite-administratif.component.html',
  styleUrls: ['./budget-entite-administratif.component.css']
})
export class BudgetEntiteAdministratifComponent implements OnInit {

  private _beasNoInDb: Array<BudgetEntiteAdministratifVo> = [];
  private _selectedBea: BudgetEntiteAdministratifVo = new BudgetEntiteAdministratifVo();
  private _beas:Array<BudgetEntiteAdministratifVo>=[];
  private _budgetEntiteAdministratifInfo:BudgetEntiteAdministratifVo=new BudgetEntiteAdministratifVo();

  constructor(private budgetService: BudgetService) {
  }

  ngOnInit() {
    this.budgetService.findAllEntiteAdministratif();
  }

  public tableBudgetEntiteAdministratifInfo(bea:BudgetEntiteAdministratifVo){
    this.budgetEntiteAdministratifInfo=bea;
  }
  get beasNoInDb(): Array<BudgetEntiteAdministratifVo> {
    return this._beasNoInDb;
  }

  public get budgetEntiteAdmin() {
    return this.budgetService.budgetEntiteAdministratifCreate;
  }

  set beasNoInDb(value: Array<BudgetEntiteAdministratifVo>) {
    this._beasNoInDb = value;
  }


  public update() {
    this.budgetService.updateBudgetEntiteAdministratif(this._budgetEntiteAdministratifInfo.referenceEntiteAdministratif);
  }

  public deleteEntiteAdministratif(bea: BudgetEntiteAdministratifVo) {
    const index: number = this.beas.indexOf(bea);
    if (bea.id==0) {
      if (index !== -1) {
        this.beas.splice(index, 1);
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
            this.beas.splice(index, 1);
          }
          this.budgetService.deleteBudgetEntiteAdmin(bea.referenceEntiteAdministratif,bea.budgetSousProjetVo.referenceSousProjet,bea.budgetSousProjetVo.budgetFaculteVo.annee).subscribe();
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

  public get sousProjets(){
    return this.budgetService.allSousProjet;
  }

  public get budgetSousProjetClone() {
    return this.budgetService.budgetSousProjetCreateClone1;
  }

  public get detailleBudgetVo() {
    return this.budgetService.detaillesBudgetVo2;
  }

  get beas() {
    return this.budgetService.beas;
  }

  public findAllByAnneeAndBudgetSousProjetAndBudgetEntitiAdmin() {
    return this.budgetService.findAllByAnneeAndBudgetSousProjetAndBudgetEntitiAdmin();
  }


  public get entiteAdministratif(){
    return this.budgetService.allEntiteAdministratif;
  }

  get selectedBea() {
    return this._selectedBea;
  }
  public addBudgetEntiteAdmin() {
    return this.budgetService.addBudgetEntiteAdministratif();
  }

  set selectedBea(value) {
    this._selectedBea = value;
  }

  public getBeaInfos(bear: BudgetEntiteAdministratifVo) {
    this._selectedBea = bear;
  }

  public get budgetEntiteAdmins() {
    return this.budgetService.budgetEnAdmins;
  }

  get budgetEntiteAdministratifInfo(): BudgetEntiteAdministratifVo {
    return this._budgetEntiteAdministratifInfo;
  }

  set budgetEntiteAdministratifInfo(value: BudgetEntiteAdministratifVo) {
    this._budgetEntiteAdministratifInfo = value;
  }
}
