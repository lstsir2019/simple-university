import { Component, OnInit } from '@angular/core';
import {ExpressionBesoin} from "../../controller/model/expression-besoin.model";
import {ExpressionBesoinService} from "../../controller/service/expression-besoin.service";
import {ExpressionBesoinItem} from '../../controller/model/expression-besoin-item.model';

@Component({
  selector: 'app-expression-besoin-create',
  templateUrl: './expression-besoin-create.component.html',
  styleUrls: ['./expression-besoin-create.component.css']
})
export class ExpressionBesoinCreateComponent implements OnInit {

  constructor(private expressionBesoinService: ExpressionBesoinService) { }

  ngOnInit() {
  }
public get expressionBesoin() {
    return this.expressionBesoinService.expressionBesoinCreate;
}

  public get expressionBesoinItem() {
    return this.expressionBesoinService.expressionBesoinItemCreate;
  }

  public get expressionBesoinItems() {
    return this.expressionBesoinService.expressionBesoinCreate.expressionBesoinItemsVos;
  }

  public addExpressionBesoinItem() {
    this.expressionBesoinService.addExpressionBesoinItem();
  }

  public saveCommande(){
    this.expressionBesoinService.saveExpressionBesoin();
  }
  public eleminer(expressionBesoinItem:ExpressionBesoinItem){
    this.expressionBesoinService.expressionBesoinCreate.expressionBesoinItemsVos.splice(
      this.expressionBesoinService.expressionBesoinCreate.expressionBesoinItemsVos.indexOf(expressionBesoinItem),1
    );
  }
}
