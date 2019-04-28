import {CommandeItem} from './commande-item.model';


export class CommandeSource {
  public commandeItemVo:CommandeItem=new CommandeItem('',0,0,0,0);
  constructor(public qteAffecte:number,public referenceExpressionBesoinItem:string,public id:number,public qteLivre: string,public entityAdmin: string  ){}
}



