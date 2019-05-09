import {Component, OnInit} from '@angular/core';
import {StockGlobalService} from '../../controller/service/stock-global.service';

@Component({
  selector: 'app-stock-global-list',
  templateUrl: './stock-global-list.component.html',
  styleUrls: ['./stock-global-list.component.css']
})
export class StockGlobalListComponent implements OnInit {

  referenceCmd: string = '';
  referenceProduit: string = '';

  constructor(private stockGlobalService: StockGlobalService) {
  }

  get stocks() {
    return this.stockGlobalService.stockGlobals;
  }

  get stockGlobal() {
    return this.stockGlobalService.stockGlobalSearch;
  }

  ngOnInit() {
    this.stockGlobalService.findAll();
  }

  findStockGlobalByQuery() {
    this.stockGlobalService.searchStockGlobal();
  }
}
