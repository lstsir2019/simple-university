import {DetaillesBudget} from './detailles-budget.model';
import {BudgetSousProjetVo} from './budget-sous-projet.model';
import {BudgetCompteBudgitaireVo} from './budget-compte-budgitaire.model';

export class BudgetEntiteAdministratifVo {

  public detaillesBudgetVo: DetaillesBudget = new DetaillesBudget();
  public budgetSousProjetVo: BudgetSousProjetVo = new BudgetSousProjetVo();
  public budgetCompteBudgitaireVo: Array<BudgetCompteBudgitaireVo> = [];

  constructor(public id?: number, public referenceEntiteAdministratif?: string) {
  }
}
