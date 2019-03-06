import {DetaillesBudget} from './detailles-budget.model';
import {BudgetSousProjet} from './budget-sous-projet.model';
import {BudgetCompteBudgitaire} from './budget-compte-budgitaire.model';

export class BudgetEntiteAdministratif {

  public detaillesBudgetVo: DetaillesBudget = new DetaillesBudget();
  public budgetSousProjetVo: BudgetSousProjet = new BudgetSousProjet();
  public budgetCompteBudgitaireVo: Array<BudgetCompteBudgitaire> = [];

  constructor(public id?: number, public referenceEntiteAdministratif?: string) {
  }
}
