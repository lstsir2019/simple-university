import {Magasin} from "./magasin.model";

export class Stock {
  public dateMin:string ='';
  public dateMax:string ='';
  public reference:string;
  public referenceCommande:string ='';
  constructor(public referenceReception:string,public referenceProduit:string,public qte:number,public qteDeffectueuse:number=0,public seuilAlert:number=0,public magasinVo:Magasin = new Magasin("")){}
}
