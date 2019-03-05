import {ExpressionBesoinItem} from './expression-besoin-item.model';

export class ExpressionBesoin {
  public expressionBesoinItemsVos = Array<ExpressionBesoinItem>();
  constructor(public reference: string ,
              public codeEntity: string ,
              public codePersonel: string ,
              public dateExpression: string) { }
}
