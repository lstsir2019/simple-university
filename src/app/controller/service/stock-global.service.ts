import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {StockGlobal} from "../model/stock-global.Model";

@Injectable({
  providedIn: 'root'
})
export class StockGlobalService {

  private _stockGlobalsLiverson:Array<StockGlobal>=[];
  constructor(private  http:HttpClient) { }
  private url:string = "http://localhost:8040/stock-api/stocks/";

  public findStockGlobal(refcommande:string,refproduit:string){
    console.log(this.url+"commande/"+refcommande+"/produit/"+refproduit);
    this.http.get<Array<StockGlobal>>(this.url+"commande/"+refcommande+"/produit/"+refproduit).subscribe(
      data=>{
        this._stockGlobalsLiverson=data;
        console.log("ha data"+data);

      },error => {
        console.log("error"+error);
      }
    )
  }


  get stockGlobalsLiverson(): Array<StockGlobal> {
    return this._stockGlobalsLiverson;
  }

  set stockGlobalsLiverson(value: Array<StockGlobal>) {
    this._stockGlobalsLiverson = value;
  }
}
