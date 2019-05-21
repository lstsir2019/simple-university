import {Component, OnInit} from '@angular/core';
import {ProduitService} from "../../controller/service/produit.service";
import {Produit} from "../../controller/model/produit.model";

@Component({
  selector: 'app-produit-create',
  templateUrl: './produit-create.component.html',
  styleUrls: ['./produit-create.component.css']
})
export class ProduitCreateComponent implements OnInit {

  produitChercher:Produit;


  constructor(private produitService: ProduitService) {
  }

  ngOnInit() {



  }

  public get categories() {
    return this.produitService.categories;
  }

  public get types() {
    return this.produitService.types;
  }

  public get produit() {
    return this.produitService.produitCreate;

  }

    get produitSearsh() {
    return this.produitService.produitSearch;
  }

  public saveProduit() {
    this.produitService.saveProduit();
  }


  public get produits() {
    return this.produitService.produits;
  }

  public produitR(referenceP: string) {
    return this.produitService.produitR(referenceP);
  }

  public deleteProduit(produit: Produit) {
    this.produitService.deleteProduit(produit.reference).subscribe();
    this.produits.splice(
      this.produits.indexOf(produit), 1
    );
  }


  public get produitModified() {
    return this.produitService.produitModified;
  }


  public modyfieProduit() {

    this.produitService.modyfieProduit();
  }

  public produitSelectef(produit: Produit) {
    this.produitService.produitModified = produit;
    let produitClone:Produit=new Produit(produit.libelle,produit.reference);
    produitClone.categorieProduitVo.libelle=produit.categorieProduitVo.libelle;
    produitClone.typeProduitVo.code=produit.typeProduitVo.code;

    this.produitService.produitModified=produitClone;

  }

  public findByQuery() {
    this.produitService.findByQuery();
  }

  public getProduitChercher(){
    this.produitService.produitSearch=this.produitChercher;
    this.produitService.findByQuery();
  }
}
