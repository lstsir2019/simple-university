import {DetaillesBudget} from './detailles-budget.model';
import {BudgetFaculteVo} from './budget-faculte.model';
import {BudgetEntiteAdministratifVo} from './budget-entite-administratif.model';

export class BudgetSousProjetVo {

  public detaillesBudgetVo: DetaillesBudget = new DetaillesBudget();
  public budgetFaculteVo: BudgetFaculteVo = new BudgetFaculteVo();
  public budgetEntiteAdministratifVo: Array<BudgetEntiteAdministratifVo> = [];

  constructor(public id?: number, public referenceSousProjet?: string) {
  }
}
