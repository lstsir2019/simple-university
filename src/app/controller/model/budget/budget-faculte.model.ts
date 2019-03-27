import {DetaillesBudget} from './detailles-budget.model';
import {BudgetSousProjetVo} from './budget-sous-projet.model';

export class BudgetFaculteVo {
  public detaillesBudgetVo: DetaillesBudget = new DetaillesBudget();
  public budgetSousProjetVo: Array<BudgetSousProjetVo> = [];

  constructor(public id?: number, public annee?: number) {
  }
}
