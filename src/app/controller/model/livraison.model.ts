import {LivraisonItem} from './livraison-item.model';

export class Livraison {
  public livraisonItemVos: Array<LivraisonItem> = new Array<LivraisonItem>();
      constructor(public reference: string, public date: string,public referenceEntite: string, public referenceCommande: string) {}



}
