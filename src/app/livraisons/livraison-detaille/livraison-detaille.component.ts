import {Component, OnInit} from '@angular/core';
import {LivraisonService} from "../../controller/service/livraison.service";
import {ProduitService} from "../../controller/service/produit.service";
import {StockGlobalService} from "../../controller/service/stock-global.service";
import {StockService} from "../../controller/service/stock.service";
import {LivraisonItem} from "../../controller/model/livraison-item.model";
import {Stock} from "../../controller/model/stock.model";
import {Magasin} from "../../controller/model/magasin.model";
import {StockDetailleServiceService} from "../../controller/service/stock-detaille-service.service";
import {CommandeSourceWithProduit} from "../../controller/model/commande-source-with-produit.model";
import swal from "sweetalert2";
import  * as $ from 'jquery';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-livraison-detaille',
  templateUrl: './livraison-detaille.component.html',
  styleUrls: ['./livraison-detaille.component.css']
})
export class LivraisonDetailleComponent implements OnInit {

  referenceCmdStock: string = "";
  referenceProduit: string = "";
  cmdExp: CommandeSourceWithProduit;
  stockDeataol: Stock;
  public stockR: Stock = new Stock("", "", 0, 0, 0, new Magasin(""));

  constructor(private livraisonService: LivraisonService, private produitService: ProduitService, private stockGlobalService: StockGlobalService, private stockService: StockDetailleServiceService) {
  }

  ngOnInit() {
    $(document).ready(function () {
      $("#defaultInline11 ,#defaultInline22").change(function () {
        $(this).attr("checked" , "checked");
        $("#btn1").click(function () {
          $(":checked").prop("checked" , false).removeAttr("checked");
        });
      });
    });
  }

  public getCommandeExpression() {


    console.log("haaaaaaaaaaaaa l7ayaaaaaayaaaatt==>" + this.cmdExp.referenceCommandeExpression + "lmaamaaaaat==>" + this.cmdExp.qteNonLivre);
    this.livraisonService.livraisonDeatailItemCreate.referenceCommandeExpression = this.cmdExp.referenceCommandeExpression;
    console.log(this.livraisonService.livraisonDeatailItemCreate.referenceCommandeExpression);
    console.log(this.livraisonService.livraisonDeatailItemCreate.refenceProduit);
    this.livraisonService.livraisonDeatailItemCreate.refenceProduit = this.cmdExp.referenceProduit;

  }

  public findStockDetaille(strategy: string) {
    this.stockService.findStockDetaille(this.livraison.referenceCommande, this.livraisonItem.refenceProduit, strategy);
  }

  public getStockDeatil() {
    this.livraisonService.livraisonDeatailItemCreate.codeMagasin = this.stockDeataol.magasinVo.reference;
    this.livraisonService.livraisonDeatailItemCreate.referenceReception = this.stockDeataol.referenceReception;
    console.log("haaaaaaaaaaa magasin====> " + this.livraisonService.livraisonDeatailItemCreate.codeMagasin);
    console.log("haaaaaaaaa reception ===> " + this.livraisonService.livraisonDeatailItemCreate.referenceReception);
  }

  public getMagasin(magasinR: string) {

    this.livraisonService.magasin = magasinR;
    console.log(this.livraisonService.magasin);
  }

  public get stocksDetails() {
    return this.stockService.stocksDetaille;
  }

  public get produits() {
    return this.produitService.produits;
  }

  public get commandeExpressions() {
    return this.livraisonService.commandesExpressions;
  }

  public addLivraisonItem() {
    if (parseFloat(this.livraisonService.livraisonDeatailItemCreate.qte) > parseFloat(this.cmdExp.qteNonLivre) || parseFloat(this.livraisonService.livraisonDeatailItemCreate.qte) > this.stockDeataol.qte) {
      Swal.fire({
        title: 'Erreur !',
        text: "Il faut regler la qunatite",
        type: 'error',
        confirmButtonText: 'ok'
      });
    } else {
      this.livraisonService.addLivraisonItemDeatil();
      this.stockService.stocksDetaille=[];
      this.livraisonService.commandesExpressions=[];
    }

  }

  public get livraison() {
    return this.livraisonService.livraisonDetailCreate;
  }

  public get livraisonItem() {
    return this.livraisonService.livraisonDeatailItemCreate;
  }

  public get livraisonItems() {
    return this.livraisonService.livraisonDetailCreate.livraisonItemVos;
  }

  public saveLivraisonDetail() {
    this.livraisonService.saveLivraisonDetail();
  }

  public deleteTableItem(livraisonItem: LivraisonItem) {
    this.livraisonService.livraisonDetailCreate.livraisonItemVos.splice(
      this.livraisonService.livraisonDetailCreate.livraisonItemVos.indexOf(livraisonItem), 1
    );
  }

  public findCommandeExpressions() {
    this.livraisonService.commandeExpresssionsFind();
  }

  public selectedCommandeExpression(cmdExpression: CommandeSourceWithProduit) {

  }

  public stockSelecktedd(stock: Stock) {
    this.stockR = new Stock(stock.referenceReception, stock.referenceProduit, stock.qte, stock.qteDeffectueuse, stock.seuilAlert, stock.magasinVo);
  }

}
