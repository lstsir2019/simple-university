import {Magasin} from "./magasin.model";

export class Stock {
  public dateReception:string;
  constructor(public reference:string,public referenceReception:string,public referenceProduit:string,public qte:number,public qteDeffectueuse:number,public seuilAlert:number,public magasinVo:Magasin = new Magasin("")){}
}
