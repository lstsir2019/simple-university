import {DetaillesBudget} from './detailles-budget.model';
import {BudgetEntiteAdministratifVo} from './budget-entite-administratif.model';
import {CompteBudgitaireVo} from './compte-budgitaire.model';

export class BudgetCompteBudgitaireVo {

  public detaillesBudgetVo: DetaillesBudget = new DetaillesBudget();
  public budgetEntiteAdministratifVo: BudgetEntiteAdministratifVo = new BudgetEntiteAdministratifVo();
  public compteBudgitaireVo: CompteBudgitaireVo = new CompteBudgitaireVo();

  constructor(public id?: number, public referenceCompteBudgitaire?:string) {
  }
}
