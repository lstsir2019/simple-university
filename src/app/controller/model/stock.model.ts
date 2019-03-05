import {Magasin} from "./magasin.model";

export class Stock {
  constructor(public reference:String,public referenceReception:String,public referenceProduit:String,public qte:number,public qteDeffectueuse:number,public seuilAlert:number,public magasin:Magasin = new Magasin("")){}
}
