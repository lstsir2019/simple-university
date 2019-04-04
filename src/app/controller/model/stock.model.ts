import {Magasin} from "./magasin.model";

export class Stock {
  public dateMin:string;
  public dateMax:string;
  public reference:string;
  constructor(public referenceReception:string,public referenceProduit:string,public qte:number,public qteDeffectueuse:number,public seuilAlert:number,public magasinVo:Magasin = new Magasin("")){}
}
