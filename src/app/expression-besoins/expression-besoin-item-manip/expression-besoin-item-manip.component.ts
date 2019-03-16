import { Component, OnInit } from '@angular/core';
import {ExpressionBesoinService} from '../../controller/service/expression-besoin.service';
import {ExpressionBesoinItem} from '../../controller/model/expression-besoin-item.model';

@Component({
  selector: 'app-expression-besoin-item-manip',
  templateUrl: './expression-besoin-item-manip.component.html',
  styleUrls: ['./expression-besoin-item-manip.component.css']
})
export class ExpressionBesoinItemManipComponent implements OnInit {

  constructor(private expressionBesoinService:ExpressionBesoinService) { }

  ngOnInit() {
  }

  get expressionBesoinItemSelect() {
    return this.expressionBesoinService.expressionBesoinItemSelect;
  }

  get expressionBesoinSelect(){
    return this.expressionBesoinService.expressionBesoinSelect;
  }



  public accorder(expressionBesoinItem: ExpressionBesoinItem){
    return this.expressionBesoinService.accorder(expressionBesoinItem);
  }

}
