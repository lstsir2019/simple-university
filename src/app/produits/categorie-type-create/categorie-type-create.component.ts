import { Component, OnInit } from '@angular/core';
import {ProduitService} from "../../controller/service/produit.service";
import {CategoriProduit} from "../../controller/model/categori-produit.model";

@Component({
  selector: 'app-categorie-type-create',
  templateUrl: './categorie-type-create.component.html',
  styleUrls: ['./categorie-type-create.component.css']
})
export class CategorieTypeCreateComponent implements OnInit {

  constructor(private produitService:ProduitService) { }

  ngOnInit() {
  }

  public get categorieProduit(){
  return  this.produitService.categorieCreate;
  }
  public saveCategorie(){
    this.produitService.saveCategorie();
  }

  public get categories(){
    return this.produitService.categories;
  }

  public deleteCategorie(categorie:CategoriProduit){
    this.produitService.deleteCategorie(categorie.libelle).subscribe(

      data=>{


      },error1 => {

      }
    );
    this.categories.splice(

      this.categories.indexOf(categorie),1
    );
  }
  public categorieR(libelleR:string){
    return this.produitService.categorieR(libelleR);
  }
}
