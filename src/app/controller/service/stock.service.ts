import { Injectable } from '@angular/core';
import {Stock} from "../model/stock.model";
import {HttpClient} from "@angular/common/http";
import {Magasin} from '../model/magasin.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private _stocks:Array<Stock>;
  constructor(private  http:HttpClient) { }
  private url:string = "http://localhost:8042/stock-api/stocks/";
  private _stockSelected:Stock;
  private _stockSelectedClone:Stock;

  public findAll(){
    this.http.get<Array<Stock>>(this.url).subscribe(
      data=>{
        console.log(data);
        this.stocks=data;
      },error => {
        console.log("Error"+error);
      }
    );
  }

  public saveStockUpdate() {
  this.http.put<Stock>(this.url+"update",this.stockSelected).subscribe(
    data=>{
      console.log("save avec success:"+data);
      this.findAll();
    },error=>{
      console.log("error");
    }
  )
  }
  get stocks(): Array<Stock> {
    return this._stocks;
  }

  set stocks(value: Array<Stock>) {
    this._stocks = value;
  }

  get stockSelected(): Stock {
    return this._stockSelected;
  }

  public setStockSelected(value: Stock) {
    this._stockSelected = new Stock(value.referenceReception,value.referenceProduit, value.qte,value.qteDeffectueuse,value.seuilAlert,new Magasin(value.magasinVo.reference));
  }

  get stockSelectedClone(): Stock {
    return this._stockSelectedClone;
  }

  set stockSelectedClone(value: Stock) {
    this._stockSelectedClone = value;
  }
}
