import {Commande} from './commande.model';

export class Paiement {
  public commandeVo:Commande=new Commande("",0,"",'');
  constructor(public id:number,public montant:number,public type:string,public datePaiement:string){}
}
