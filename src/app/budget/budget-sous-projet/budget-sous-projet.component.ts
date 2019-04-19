import {Component, OnInit} from '@angular/core';
import {BudgetSousProjetVo} from '../../controller/model/budget/budget-sous-projet.model';
import {BudgetService} from '../../controller/service/budget.service';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-budget-sous-projet',
  templateUrl: './budget-sous-projet.component.html',
  styleUrls: ['./budget-sous-projet.component.css']
})
export class BudgetSousProjetComponent implements OnInit {

  public _selectedBsp: BudgetSousProjetVo;
  private _bspInfo: BudgetSousProjetVo = new BudgetSousProjetVo();

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

  get bspInfo(): BudgetSousProjetVo {
    if (this._bspInfo == null || undefined) {
      this._bspInfo = new BudgetSousProjetVo();
    }
    return this._bspInfo;
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

  set bspInfo(value: BudgetSousProjetVo) {
    this._bspInfo = value;
  }

  public deleteBudgetSousProjet(bsp: BudgetSousProjetVo) {
    this.budgetService.deleteBudgetSousProjet(bsp);
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

  public tableBudgetSousProjetInfo(bsp) {
    this._bspInfo = bsp;
  }

  public update() {
    this.budgetService.updateBudgetSousProjet(this._bspInfo.referenceSousProjet);
  }

  public downloadPdf(bsp: BudgetSousProjetVo) {
    let doc = new jsPDF();
    doc.text('Annee : ' + bsp.budgetFaculteVo.annee, 10, 20);
    doc.text('Référence : ' + bsp.referenceSousProjet, 10, 30);
    doc.text('Antidident : ' + bsp.detaillesBudgetVo.antecedent, 10, 40);
    doc.text('Credit ouvert estimatif : ' + bsp.detaillesBudgetVo.creditOuvertEstimatif, 10, 50);
    doc.text('Credit ouvert reel : ' + bsp.detaillesBudgetVo.creditOuvertReel, 10, 60);
    doc.text('Reliquat reel : ' + bsp.detaillesBudgetVo.reliquatReel, 10, 70);
    doc.text('Reliquat estimatif  : ' + bsp.detaillesBudgetVo.reliquatEstimatif, 10, 80);
    doc.text('Engagé payé : ' + bsp.detaillesBudgetVo.engagePaye, 10, 90);
    doc.text('Engagé engage non payé : ' + bsp.detaillesBudgetVo.engageNonPaye, 10, 100);
    doc.save('budget-faculte+' + bsp.budgetFaculteVo.annee + bsp.id + '.pdf');
  }
}
