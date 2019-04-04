import {Component, OnInit} from '@angular/core';
import {StockService} from '../../controller/service/stock.service';
import {Stock} from '../../controller/model/stock.model';
import {Magasin} from '../../controller/model/magasin.model';
import {MagasinService} from '../../controller/service/magasin.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  constructor(private _stockservice: StockService, private magasinService: MagasinService) {
  }

  public stockSearch: Stock = new Stock('', '', 0, 0, 0, new Magasin(''));

  ngOnInit() {
    this._stockservice.findAll();
  }

  get magasins() {
    return this.magasinService.magasins;
  }

  get stocks() {
    return this._stockservice.stocks;
  }

  public findAllStocks() {
   this._stockservice.findByCriteria(this.stockSearch);
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
