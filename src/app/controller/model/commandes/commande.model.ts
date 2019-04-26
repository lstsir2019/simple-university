import {CommandeItem} from './commande-item.model';
import {Fournisseur} from './fournisseur.model';
import {Paiement} from './paiement.model';

export class Commande {
  public commandeItemVos=Array<CommandeItem>();
  public paiementVos=Array<Paiement>();
  public fournisseurVo:Fournisseur= new Fournisseur('','','','','');
  constructor(public reference: string, public total: number, public dateCommande: string,public totalPaiement:string,public dateMax:string,public dateMin:string){}
}
