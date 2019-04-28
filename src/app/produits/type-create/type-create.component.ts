import { Component, OnInit } from '@angular/core';
import {ProduitService} from "../../controller/service/produit.service";
import {CategoriProduit} from "../../controller/model/categori-produit.model";
import {TypeProduit} from "../../controller/model/type-produit.model";

@Component({
  selector: 'app-type-create',
  templateUrl: './type-create.component.html',
  styleUrls: ['./type-create.component.css']
})
export class TypeCreateComponent implements OnInit {

  constructor(private produitService:ProduitService) { }

  ngOnInit() {
  }

  public get typeProduit(){
    return this.produitService.typeCreate
  }
  public saveType(){
    this.produitService.saveType();
  }
  public get types(){
    return this.produitService.types;
  }
  public deleteType(type:TypeProduit){
    this.produitService.deleteType(type.code).subscribe(

      data=>{


      },error1 => {

      }
    );
    this.types.splice(

      this.types.indexOf(type),1
    );
  }
  public typeR(libelleR:string){
    return this.produitService.typeR(libelleR);
  }
}
