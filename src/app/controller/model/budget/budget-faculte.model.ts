import {DetaillesBudgetVo} from './detailles-budget.model';
import {BudgetSousProjetVo} from './budget-sous-projet.model';
import {BudgetProjetVo} from './budget-projet.model';

export class BudgetFaculteVo {
  public detaillesBudgetVo: DetaillesBudgetVo = new DetaillesBudgetVo();
  public budgetProjetVos: Array<BudgetProjetVo> = new Array<BudgetProjetVo>();

  public anneeMin:number=2000;
  public anneeMax:number=2050;
  constructor(public id?: number, public annee?: number) {
  }
}
