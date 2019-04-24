import {CommandeItem} from './commande-item.model';


export class CommandeSource {
  public commandeItemVo:CommandeItem=new CommandeItem('',0,0,Number(''));
  constructor(public qteAffecte:number,public referenceExpressionBesoinItem:string,public id:number){}
}
