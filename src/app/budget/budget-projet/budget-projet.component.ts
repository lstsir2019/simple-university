import {Component, OnInit} from '@angular/core';
import {BudgetProjetVo} from '../../controller/model/budget/budget-projet.model';
import {BudgetService} from '../../controller/service/budget.service';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-budget-projet',
  templateUrl: './budget-projet.component.html',
  styleUrls: ['./budget-projet.component.css']
})
export class BudgetProjetComponent implements OnInit {

  private _selectedBea: BudgetProjetVo = new BudgetProjetVo();
  private _budgetEntiteAdministratifInfo:BudgetProjetVo=new BudgetProjetVo();

  constructor(private budgetService: BudgetService) {
  }

  ngOnInit() {
    this.budgetService.findAllEntiteAdministratif();
  }

  public tableBudgetEntiteAdministratifInfo(bea:BudgetProjetVo){
    this.budgetEntiteAdministratifInfo=bea;
  }

  public get budgetEntiteAdmin() {
    return this.budgetService.budgetEntiteAdministratifCreate;
  }

  public update() {
    this.budgetService.updateBudgetEntiteAdministratif(this._budgetEntiteAdministratifInfo.referenceEntiteAdministratif);
  }

  public deleteEntiteAdministratif(bea: BudgetProjetVo) {
    this.budgetService.deleteBudgetEntiteAdmin(bea);
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

  public getBeaInfos(bear: BudgetProjetVo) {
    this._selectedBea = bear;
  }

  get budgetEntiteAdministratifInfo(): BudgetProjetVo {
    return this._budgetEntiteAdministratifInfo;
  }

  set budgetEntiteAdministratifInfo(value: BudgetProjetVo) {
    this._budgetEntiteAdministratifInfo = value;
  }

  public downloadPdf(bea: BudgetProjetVo) {
    let doc = new jsPDF();
    doc.text('Annee ' + bea.budgetSousProjetVo.budgetFaculteVo.annee, 10, 20);
    doc.text('Reference sous projet ' + bea.budgetSousProjetVo.referenceSousProjet, 10, 30);
    doc.text('Reference entite administratif ' + bea.referenceEntiteAdministratif, 10, 40);
    doc.text('Antidident : ' + bea.detaillesBudgetVo.antecedent, 10, 50);
    doc.text('Credit ouvert estimatif : ' + bea.detaillesBudgetVo.creditOuvertEstimatif, 10, 60);
    doc.text('Credit ouvert reel : ' + bea.detaillesBudgetVo.creditOuvertReel, 10, 70);
    doc.text('Reliquat reel : ' + bea.detaillesBudgetVo.reliquatReel, 10, 80);
    doc.text('Reliquat estimatif  : ' + bea.detaillesBudgetVo.reliquatEstimatif, 10, 90);
    doc.text('Engagé payé : ' + bea.detaillesBudgetVo.engagePaye, 10, 100);
    doc.text('Engagé engage non payé : ' + bea.detaillesBudgetVo.engageNonPaye, 10, 110);
    doc.save('budget-faculte+' + bea.budgetSousProjetVo.budgetFaculteVo.annee + bea.id + '.pdf');
  }
}
