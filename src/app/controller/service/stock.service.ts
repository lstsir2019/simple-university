import { Injectable } from '@angular/core';
import {Stock} from "../model/stock.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private _stocks:Array<Stock>;
  constructor(private  http:HttpClient) { }
  private url:string = "http://localhost:8040/stock-api/stocks/";
  private _stockSelected:Stock;
  private _stockSelectedClone:Stock;

  public findAll(){
    this.http.get<Array<Stock>>(this.url+"stocks").subscribe(
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
    this._stockSelected = value;
  }

  get stockSelectedClone(): Stock {
    this._stockSelectedClone = new Stock(this._stockSelected.reference,this._stockSelected.referenceReception,this._stockSelected.referenceProduit,this._stockSelected.qte,this._stockSelected.qteDeffectueuse,this._stockSelected.seuilAlert,this._stockSelected.magasin);
    return this._stockSelectedClone;
  }

  set stockSelectedClone(value: Stock) {
    this._stockSelectedClone = value;
  }
}
