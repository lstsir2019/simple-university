import {DetaillesBudget} from './detailles-budget.model';
import {BudgetSousProjet} from './budget-sous-projet.model';

export class BudgetFaculte {
  public detaillesBudgetVo: DetaillesBudget = new DetaillesBudget(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  public budgetSousProjetVo: Array<BudgetSousProjet> = [];

  constructor(public id?: number, public annee?: number) {
  }
}
