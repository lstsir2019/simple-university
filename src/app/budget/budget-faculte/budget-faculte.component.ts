import {Component, OnInit} from '@angular/core';
import {BudgetService} from '../../controller/service/budget.service';
import * as jsPDF from 'jspdf';
import {BudgetFaculteVo} from '../../controller/model/budget/budget-faculte.model';

@Component({
  selector: 'app-budget-faculte',
  templateUrl: './budget-faculte.component.html',
  styleUrls: ['./budget-faculte.component.css']
})
export class BudgetFaculteComponent implements OnInit {

  ngOnInit() {
  }

  public bfInfo: BudgetFaculteVo = new BudgetFaculteVo();
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
    this.budgetService.deleteBudgetFaculte(annee);
  }

  public budgetSousProjetInfo(bf: BudgetFaculteVo) {
    this.bfInfo = bf;
  }

  public findByCreteriaAnneMinAndAnneMax() {
    return this.budgetService.findByCreteriaAnneMinAndAnneMax();
  }

  /*
    public updateBudgetFaculte(){
      this.budgetService.updateBudgetFaculte();
    }*/

  public downloadPdf(bf: BudgetFaculteVo) {
    let doc = new jsPDF();
    doc.text('Annee ' + bf.annee, 10, 20);
    doc.text('Antidident : ' + bf.detaillesBudgetVo.antecedent, 10, 30);
    doc.text('Credit ouvert estimatif : ' + bf.detaillesBudgetVo.creditOuvertEstimatif, 10, 40);
    doc.text('Credit ouvert reel : ' + bf.detaillesBudgetVo.creditOuvertReel, 10, 50);
    doc.text('Reliquat reel : ' + bf.detaillesBudgetVo.reliquatReel, 10, 60);
    doc.text('Reliquat estimatif  : ' + bf.detaillesBudgetVo.reliquatEstimatif, 10, 70);
    doc.text('Engagé payé : ' + bf.detaillesBudgetVo.engagePaye, 10, 80);
    doc.text('Engagé engage non payé : ' + bf.detaillesBudgetVo.engageNonPaye, 10, 90);
    doc.save('budget-faculte+' + bf.annee + '.pdf');
  }
}
