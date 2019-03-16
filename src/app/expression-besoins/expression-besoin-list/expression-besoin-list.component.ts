import { Component, OnInit } from '@angular/core';
import {ExpressionBesoinService} from "../../controller/service/expression-besoin.service";
import {ExpressionBesoin} from "../../controller/model/expression-besoin.model";
import {ExpressionBesoinItem} from "../../controller/model/expression-besoin-item.model";

@Component({
  selector: 'app-expression-besoin-list',
  templateUrl: './expression-besoin-list.component.html',
  styleUrls: ['./expression-besoin-list.component.css']
})
export class ExpressionBesoinListComponent implements OnInit {

  constructor(private expressionBesoinService:ExpressionBesoinService) { }

  ngOnInit() {
    this.expressionBesoinService.expressionBesoins;
  }
public get expressionBesoins(){
    return this.expressionBesoinService.expressionBesoins;
}

public get expressionBesoinSelect(){
    return this.expressionBesoinService.expressionBesoinSelect;
}

public findItemsByReference(expressionBesoin:ExpressionBesoin){
 return this.expressionBesoinService.findItemsByReference(expressionBesoin);
  }
  /*public deleteItem(expressionBesoinItem:ExpressionBesoinItem){
    this.expressionBesoinSelect.expressionBesoinItemsVos.splice(
      this.expressionBesoinSelect.expressionBesoinItemsVos.indexOf(expressionBesoinItem),1
    );
    return this.expressionBesoinService.deleteItem(expressionBesoinItem);

  }*/
  public setItemSelect(expressionBesoinItem: ExpressionBesoinItem){
    return this.expressionBesoinService.setItemSelect(expressionBesoinItem);
  }

  public deleteItem(expressionBesoinItem: ExpressionBesoinItem){
    this.expressionBesoinSelect.expressionBesoinItemsVos.splice(
      this.expressionBesoinSelect.expressionBesoinItemsVos.indexOf(expressionBesoinItem),1
    );
    return this.expressionBesoinService.deleteItem();

  }

}
