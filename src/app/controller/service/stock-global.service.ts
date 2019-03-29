import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {StockGlobal} from "../model/stock-global.Model";

@Injectable({
  providedIn: 'root'
})
export class StockGlobalService {

  private stockGlobal:StockGlobal=new StockGlobal("","","",0);
  constructor(private  http:HttpClient) { }
  private url:string = "http://localhost:8040/stock-api/stocks/";

  public findStockGlobal(refcommande:string,refproduit:string){
    this.http.get<StockGlobal>(this.url+"/commande/"+refcommande+"/produit/"+refproduit).subscribe(
      data=>{
        this.stockGlobal=data;
      },error => {
        console.log("error"+error);
      }
    )
  }

}
