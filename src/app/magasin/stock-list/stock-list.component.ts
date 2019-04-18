import {Component, OnInit} from '@angular/core';
import {StockService} from '../../controller/service/stock.service';
import {MagasinService} from '../../controller/service/magasin.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  constructor(private _stockservice: StockService, private magasinService: MagasinService) {
  }

  ngOnInit() {
    this._stockservice.findAll();
  }

  get magasins() {
    return this.magasinService.magasins;
  }

  get stocks() {
    return this._stockservice.stocks;
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
  public get stockSearch(){
    return this._stockservice.stockSearch;
  }
  public findStockByQuery() {
    this._stockservice.findByCriteria();
  }
}
