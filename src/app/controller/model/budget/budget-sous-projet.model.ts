import {DetaillesBudgetVo} from './detailles-budget.model';
import {BudgetFaculteVo} from './budget-faculte.model';
import {BudgetProjetVo} from './budget-projet.model';
import {BudgetCompteBudgitaireVo} from './budget-compte-budgitaire.model';

export class BudgetSousProjetVo {

  public detaillesBudgetVo: DetaillesBudgetVo = new DetaillesBudgetVo();
  public budgetProjetVo: BudgetProjetVo = new BudgetProjetVo();
  public budgetCompteBudgitaireVos: Array<BudgetCompteBudgitaireVo> = new Array<BudgetCompteBudgitaireVo>();

  constructor(public id?: number, public referenceSousProjet?: string) {
  }
}
