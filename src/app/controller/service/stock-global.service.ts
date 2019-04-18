import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {StockGlobal} from "../model/stock-global.Model";

@Injectable({
  providedIn: 'root'
})
export class StockGlobalService {

  public stockGlobals: Array<StockGlobal> = [];
  private _stockGlobalsLiverson: Array<StockGlobal> = [];
  private url: string = "http://localhost:8042/stock-api/stocks/";

  constructor(private  http: HttpClient) {
  }

  public findStockGlobal(refcommande: string, refproduit: string) {
    console.log(this.url + "commande/" + refcommande + "/produit/" + refproduit);
    this.http.get<Array<StockGlobal>>(this.url + "commande/" + refcommande + "/produit/" + refproduit).subscribe(
      data => {
        this._stockGlobalsLiverson = data;
        console.log("ha data" + data);

      }, error => {
        console.log("error");
      }
    )
  }


  get stockGlobalsLiverson(): Array<StockGlobal> {
    return this._stockGlobalsLiverson;
  }

  set stockGlobalsLiverson(value: Array<StockGlobal>) {
    this._stockGlobalsLiverson = value;
  }

  findAll() {
    this.http.get<Array<StockGlobal>>(this.url + "stockglobal").subscribe(
      data => {
        this.stockGlobals = data;
        data.forEach(value => {
          console.log("ha data" + value.referenceCommande)
        });

      }, error => {
        console.log("error");
      });
  }
}
