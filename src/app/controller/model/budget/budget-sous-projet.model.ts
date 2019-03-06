import {DetaillesBudget} from './detailles-budget.model';
import {BudgetFaculte} from './budget-faculte.model';
import {BudgetEntiteAdministratif} from './budget-entite-administratif.model';

export class BudgetSousProjet {

  public detaillesBudgetVo: DetaillesBudget = new DetaillesBudget();
  public budgetFaculteVo: BudgetFaculte = new BudgetFaculte();
  public budgetEntiteAdministratifVo: Array<BudgetEntiteAdministratif> = [];

  constructor(public id?: number, public referenceSousProjet?: string) {
  }
}
