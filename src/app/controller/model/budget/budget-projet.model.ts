import {DetaillesBudgetVo} from './detailles-budget.model';
import {BudgetSousProjetVo} from './budget-sous-projet.model';
import {BudgetCompteBudgitaireVo} from './budget-compte-budgitaire.model';
import {BudgetFaculteVo} from './budget-faculte.model';

export class BudgetProjetVo {

  public detaillesBudgetVo: DetaillesBudgetVo = new DetaillesBudgetVo();
  public budgetSousProjetVos: Array<BudgetSousProjetVo> = new Array<BudgetSousProjetVo>();
  public budgetFaculteVo: BudgetFaculteVo = new BudgetFaculteVo();

  constructor(public id?: number, public referenceProjet?: string) {
  }
}
