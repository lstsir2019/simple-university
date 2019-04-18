import {Injectable} from '@angular/core';
import {Stock} from "../model/stock.model";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class StockDetailleServiceService {

  private _stocksDetaille: Array<Stock> = [];

  constructor(private  http: HttpClient) {
  }

  private url: string = "http://localhost:8042/stock-api/stocks/";

  public findStockDetaille(refcommande: string, refproduit: string, strategy: string) {
    console.log(refproduit);
    console.log(refcommande);
    console.log(strategy);
    this.http.get<Array<Stock>>(this.url + "commande/" + refcommande + "/produit/" + refproduit + "/strategy/" + strategy).subscribe(
      data => {
        console.log(data);
        this._stocksDetaille = data;
      }, error1 => {
        console.log("Error" + error1);
      }
    );
  }

  get stocksDetaille(): Array<Stock> {
    return this._stocksDetaille;
  }

  set stocksDetaille(value: Array<Stock>) {
    this._stocksDetaille = value;
  }
}
