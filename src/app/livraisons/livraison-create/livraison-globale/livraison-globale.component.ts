import { Component, OnInit } from '@angular/core';
import {LivraisonService} from "../../../controller/service/livraison.service";
import {ProduitService} from "../../../controller/service/produit.service";
import {StockGlobalService} from "../../../controller/service/stock-global.service";
import {LivraisonItem} from "../../../controller/model/livraison-item.model";
import {CommandeSourceWithProduit} from "../../../controller/model/commande-source-with-produit.model";
import {StockGlobal} from "../../../controller/model/stock-global.Model";
import {getReact} from "../../../controller/service/evolutions/Util/SwalReact";
import swal from "sweetalert2";
import  * as $ from 'jquery';

@Component({
  selector: 'app-livraison-globale',
  templateUrl: './livraison-globale.component.html',
  styleUrls: ['./livraison-globale.component.css']
})
export class LivraisonGlobaleComponent implements OnInit {
  private SWAL = getReact('Livraison', true);
  referenceCmdStock:string="";
  referenceProduit:string="";
  cmdExp:CommandeSourceWithProduit;
  stotockGlobal:StockGlobal;
  constructor(private livraisonService: LivraisonService,private produitService:ProduitService,private stockGlobalService:StockGlobalService) { }

  ngOnInit() {
   // this.produitService.produitsFindAll();
    $(document).ready(function () {
      $("#defaultInline111 ,#defaultInline222").change(function () {
         $(this).attr("checked" , "checked");
         $("#btn").click(function () {
           $(":checked").prop("checked" , false).removeAttr("checked");
         });
      });
    });
  }
  public findStockGlobal(){
    console.log(this.livraison.referenceCommande+" "+this.livraisonItem.refenceProduit);
    this.stockGlobalService.findStockGlobal(this.livraison.referenceCommande,this.livraisonItem.refenceProduit);
  }


  public get stockGlobals(){
    return this.stockGlobalService.stockGlobalsLiverson;
  }
  public get commandesExpressionsGmobal(){
    return this.livraisonService.commandesExpressionsGlobals;
  }
  public  findCommandesExpressions(){
    this.livraisonService.commandeExpressionsFindGlobal();
  }
  public getStockGlobl(){
    this.livraisonService.livraisonItemCreate.codeMagasin=this.stotockGlobal.referenceMagasin;
    console.log(this.livraisonService.livraisonItemCreate.codeMagasin);
  }

  public getCommandeExpression(){


    console.log("haaaaaaaaaaaaa l7ayaaaaaayaaaatt==>"+this.cmdExp.referenceCommandeExpression+"lmaamaaaaat==>"+this.cmdExp.qteNonLivre);
    this.livraisonService.livraisonItemCreate.refenceProduit=this.cmdExp.referenceProduit;
    this.livraisonService.livraisonItemCreate.referenceCommandeExpression=this.cmdExp.referenceCommandeExpression;
    console.log(this.livraisonService.livraisonItemCreate.referenceCommandeExpression);
    console.log(this.livraisonService.livraisonItemCreate.refenceProduit);
    this.stockGlobalService.findStockGlobal(this.livraison.referenceCommande,this.livraisonItem.refenceProduit);
  }

  // public  get produits(){
  //   return this.produitService.produits;
  // }
  public addLivraisonItem() {

    if(parseFloat(this.livraisonService.livraisonItemCreate.qte)>parseFloat(this.cmdExp.qteNonLivre) || parseFloat(this.livraisonService.livraisonItemCreate.qte)>this.stotockGlobal.qte){
      swal({ title: 'Erreur !',
        text: "Il faut regler la qunatite",
        type: 'error',
        confirmButtonText: 'ok'})
    }else {
      this.livraisonService.addLivraisonItem();
      this.livraisonService.commandesExpressionsGlobals=[];
      this.stockGlobalService.stockGlobalsLiverson=[];


    }
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
  public get commandeExpressiont(){
    return this.livraisonService.commandeExpression;

  }
  public selected(value:CommandeSourceWithProduit):void {
    console.log('Selected value is: ', value);
    this.livraisonService.commandeExpression=value;
    console.log("haaahowaa  ==> "+this.commandeExpressiont.referenceCommandeExpression);
  }
}
