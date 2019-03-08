import { Component, OnInit } from '@angular/core';
import {ProduitService} from "../../controller/service/produit.service";
import {Produit} from "../../controller/model/produit.model";

@Component({
  selector: 'app-produit-create',
  templateUrl: './produit-create.component.html',
  styleUrls: ['./produit-create.component.css']
})
export class ProduitCreateComponent implements OnInit {

  private referenceP:string="";
  constructor(private produitService:ProduitService) { }

  ngOnInit() {
  }
  public get categories(){
    return this.produitService.categories;
  }
  public get types(){
    return this.produitService.types;
  }

  public get produit(){
    return this.produitService.produitCreate;

  }
  public saveProduit(){
    this.produitService.saveProduit();
  }
  public  get produits(){
     return this.produitService.produits;
  }
  public  produitR(referenceP:string){
      return this.produitService.produitR(referenceP);
  }
  public deleteProduit(produit:Produit){
    this.produitService.deleteProduit(produit.reference).subscribe();
    this.produits.splice(

      this.produits.indexOf(produit),1
    );
  }
}
