import {Component, OnInit} from '@angular/core';
import {LivraisonService} from "../../../controller/service/livraison.service";
import {ProduitService} from "../../../controller/service/produit.service";
import {StockGlobalService} from "../../../controller/service/stock-global.service";
import {StockService} from "../../../controller/service/stock.service";
import {LivraisonItem} from "../../../controller/model/livraison-item.model";
import {Stock} from "../../../controller/model/stock.model";
import {Magasin} from "../../../controller/model/magasin.model";
import {StockDetailleServiceService} from "../../../controller/service/stock-detaille-service.service";

@Component({
  selector: 'app-livraison-detaille',
  templateUrl: './livraison-detaille.component.html',
  styleUrls: ['./livraison-detaille.component.css']
})
export class LivraisonDetailleComponent implements OnInit {

  referenceCmdStock: string = "";
  referenceProduit: string = "";
  public stockR: Stock = new Stock("", "", 0, 0, 0, new Magasin(""));

  constructor(private livraisonService: LivraisonService, private produitService: ProduitService, private stockGlobalService: StockGlobalService, private stockService: StockDetailleServiceService) {
  }

  ngOnInit() {
  }

  public findStockDetaille(strategy: string) {
    this.stockService.findStockDetaille(this.livraison.referenceCommande, this.livraisonItem.refenceProduit, strategy);
  }


  public get stocksDetails() {
    return this.stockService.stocksDetaille;
  }

  public get produits() {
    return this.produitService.produits;
  }

  public addLivraisonItem() {
    console.log(this.stockR.magasinVo.reference);
    this.livraisonService.livraisonItemCreate.codeMagasin=this.stockR.magasinVo.reference;
    this.livraisonService.livraisonItemCreate.referenceReception=this.stockR.referenceReception;
    this.livraisonService.addLivraisonItem();
  }

  public get livraison() {
    return this.livraisonService.livraisonCreate;
  }

  public get livraisonItem() {
    return this.livraisonService.livraisonItemCreate;
  }

  public get livraisonItems() {
    return this.livraisonService.livraisonCreate.livraisonItemVos;
  }

  public saveLivraisonDetail() {
    this.livraisonService.saveLivraisonDetail();
  }

  public deleteTableItem(livraisonItem: LivraisonItem) {
    this.livraisonService.livraisonCreate.livraisonItemVos.splice(
      this.livraisonService.livraisonCreate.livraisonItemVos.indexOf(livraisonItem), 1
    );
  }

  public stockSelecktedd(stock: Stock) {
    this.stockR = new Stock(stock.referenceReception, stock.referenceProduit, stock.qte, stock.qteDeffectueuse, stock.seuilAlert, stock.magasinVo);
  }

}
