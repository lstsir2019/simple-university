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

  get expressionBesoinItemUpdate() {
    return this.expressionBesoinService.expressionBesoinItemUpdate;
  }





  public accorder(){

    //this.expressionBesoinService.expressionBesoinItemUpdate=expressionBesoinItem;

    /*let expressionBesoinItemClone:ExpressionBesoinItem = new ExpressionBesoinItem(
      expressionBesoinItem.id,
      expressionBesoinItem.referenceCategorieProduit,
      expressionBesoinItem.referenceProduit,
      expressionBesoinItem.quantiteDemande,
      expressionBesoinItem.description,
      expressionBesoinItem.quantiteAccorder,
      expressionBesoinItem.quantiteCommander,
      expressionBesoinItem.quantiteLivre,
      expressionBesoinItem.entityAdmin
    );*/

    //this.expressionBesoinService.expressionBesoinItemUpdate=expressionBesoinItemClone;


    return this.expressionBesoinService.accorder();
  }

}
