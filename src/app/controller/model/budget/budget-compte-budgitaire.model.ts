import {DetaillesBudget} from './detailles-budget.model';
import {BudgetEntiteAdministratif} from './budget-entite-administratif.model';
import {CompteBudgitaire} from './compte-budgitaire.model';

export class BudgetCompteBudgitaire {

  public detaillesBudgetVo: DetaillesBudget = new DetaillesBudget();
  public budgetEntiteAdministratifVo: BudgetEntiteAdministratif = new BudgetEntiteAdministratif();
  public compteBudgitaireVo: CompteBudgitaire = new CompteBudgitaire();

  constructor(public id?: number) {
  }
}
