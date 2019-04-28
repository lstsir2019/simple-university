export class OffreDetail {


  public id: number;


  constructor(public refProduit: string="", public prixUnitaire: number=0, public quantite: number=0, public total: number=0) {
  }
}
