import { Component, OnInit } from '@angular/core';
import {LivraisonService} from '../../controller/service/livraison.service';
import {LivraisonItem} from "../../controller/model/livraison-item.model";
import {StockService} from "../../controller/service/stock.service";
import {ProduitService} from "../../controller/service/produit.service";

@Component({
  selector: 'app-livraison-create',
  templateUrl: './livraison-create.component.html',
  styleUrls: ['./livraison-create.component.css']
})
export class LivraisonCreateComponent implements OnInit {

  mode:number=0;

 modeGlobal:number=0;

 referenceCmdStock:string="";
 referenceRecpStock:string="";


  constructor(private livraisonService: LivraisonService,private produitService:ProduitService) { }

  ngOnInit() {

  }

  public  get produits(){
    return this.produitService.produits;
  }

  public  ok(){

    this.modeGlobal=1;
  }
  public addLivraisonItem() {
    this.livraisonService.addLivraisonItem();
  }
  public get  livraison() {
    return this.livraisonService.livraisonCreate;
}
  public get  livraisonItem() {
    return this.livraisonService.livraisonItemCreate;
  }
  public get  livraisonItems() {
    return this.livraisonService.livraisonCreate.livraisonItemVos;
  }
  public saveLivraison(){
    this.livraisonService.saveLivraison();


  }

  public deleteTableItem(livraisonItem:LivraisonItem){
    this.livraisonService.livraisonCreate.livraisonItemVos.splice(
      this.livraisonService.livraisonCreate.livraisonItemVos.indexOf(livraisonItem),1
    );
  }

}

