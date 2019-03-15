import {CategoriProduit} from "./categori-produit.model";
import {TypeProduit} from "./type-produit.model";

export class Produit {
  public categorieProduitVo:CategoriProduit= new CategoriProduit("","");
  public typeProduitVo:TypeProduit= new TypeProduit("","");
  constructor(public libelle:string,public reference:string){}
}
