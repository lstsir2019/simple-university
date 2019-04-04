import { Component, OnInit } from '@angular/core';
import {StockService} from "../../controller/service/stock.service";

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  constructor(private _stockservice:StockService) { }

  ngOnInit() {
  }

  get stocks(){
    return this._stockservice.stocks;
  }

  public findAllStocks(){
    this._stockservice.findAll();
  }

  get stockservice(): StockService {
    return this._stockservice;
  }

  set stockservice(value: StockService) {
    this._stockservice = value;
  }

  public stockSeleceted(s) {
    this._stockservice.setStockSelected(s);
  }

}
