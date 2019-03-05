import { Component, OnInit } from '@angular/core';
import {StockService} from "../../controller/service/stock.service";

@Component({
  selector: 'app-stock-update',
  templateUrl: './stock-update.component.html',
  styleUrls: ['./stock-update.component.css']
})
export class StockUpdateComponent implements OnInit {

  constructor(private stockService:StockService) { }

  ngOnInit() {
  }

  get stockSelected(){
    return this.stockService.stockSelected;
  }
  public saveUpdate(){
    this.stockService.saveStockUpdate();
  }
}
