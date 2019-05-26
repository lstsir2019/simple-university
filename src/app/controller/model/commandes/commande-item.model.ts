import {Commande} from './commande.model';

export class CommandeItem {
  public commandeVo:Commande=new Commande('',0,'','','','');
  public qteReception:Number=0;
  constructor(public referenceProduit:string,public qte:number,public prix:number,public id:number,public qteAffecte:number){}
}
