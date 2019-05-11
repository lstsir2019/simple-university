import {DetaillesBudgetVo} from './detailles-budget.model';
import {BudgetProjetVo} from './budget-projet.model';
import {CompteBudgitaireVo} from './compte-budgitaire.model';
import {BudgetSousProjetVo} from './budget-sous-projet.model';

export class BudgetCompteBudgitaireVo {

  public detaillesBudgetVo: DetaillesBudgetVo = new DetaillesBudgetVo();
  public budgetSousProjetVo: BudgetSousProjetVo = new BudgetSousProjetVo();
  public compteBudgitaireVo: CompteBudgitaireVo = new CompteBudgitaireVo();

  constructor(public id?: number, public reference?:string) {
  }
}
