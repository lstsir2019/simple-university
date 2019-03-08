import {CommandeItem} from './commande-item.model';
import {Fournisseur} from './fournisseur.model';

export class Commande {
  public commandeItemVos=Array<CommandeItem>();
  public fournisseurVo:Fournisseur= new Fournisseur('','','');
  constructor(public reference: string, public total: number, public dateCommande: string){}
}
