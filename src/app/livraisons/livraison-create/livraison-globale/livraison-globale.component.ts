import { Component, OnInit } from '@angular/core';
import {LivraisonService} from "../../../controller/service/livraison.service";
import {ProduitService} from "../../../controller/service/produit.service";
import {StockGlobalService} from "../../../controller/service/stock-global.service";
import {LivraisonItem} from "../../../controller/model/livraison-item.model";

@Component({
  selector: 'app-livraison-globale',
  templateUrl: './livraison-globale.component.html',
  styleUrls: ['./livraison-globale.component.css']
})
export class LivraisonGlobaleComponent implements OnInit {
  referenceCmdStock:string="";
  referenceProduit:string="";
  constructor(private livraisonService: LivraisonService,private produitService:ProduitService,private stockGlobalService:StockGlobalService) { }

  ngOnInit() {
  }
  public findStockGlobal(){
    console.log(this.livraison.referenceCommande+" "+this.livraisonItem.refenceProduit);
    this.stockGlobalService.findStockGlobal(this.livraison.referenceCommande,this.livraisonItem.refenceProduit);
  }

  public get stockGlobals(){
    return this.stockGlobalService.stockGlobalsLiverson;
  }

  public  get produits(){
    return this.produitService.produits;
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
