import { Injectable } from '@angular/core';
import {CategoriProduit} from "../model/categori-produit.model";
import {TypeProduit} from "../model/type-produit.model";
import {HttpClient,HttpErrorResponse} from "@angular/common/http";
import {Produit} from "../model/produit.model";
import {reference} from "@angular/core/src/render3";
import {Observable,throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private _url: string = "http://localhost:8070/produit_api/categoriType/categorie/create";
  private _url2: string = "http://localhost:8070/produit_api/categoriType/type/create";
  private _url3: string = "http://localhost:8070/produit_api/categoriType/categorie/findAll";
  private _url4: string = "http://localhost:8070/produit_api/categoriType//type/findAll";
  private _url5: string = "http://localhost:8070/produit_api/produit/";
  private _url7: string = "http://localhost:8070/produit_api/produit/chercher?reference=";
  private _url6: string = "http://localhost:8070/produit_api/categoriType/categorie/delete/";
  private _url8:string="http://localhost:8070/produit_api/categoriType/type/delete/";
  private _url9:string="http://localhost:8070/produit_api/categoriType";


  private _produitModified:Produit=new Produit("","");
  private referenceProduitModyf:string="";
  private _categorieCreate: CategoriProduit=new CategoriProduit("","");
  private _typeCreate:TypeProduit=new TypeProduit("","");
  private _produitCreate:Produit=new Produit("","");
  private _categories:Array<CategoriProduit>;
  private _types:Array<TypeProduit>;
  private _produits:Array<Produit>;
  private referenceP:string="";


  constructor(private _http:HttpClient) { }
/////////////////////////////////////////////////////

 public produitR(referenceP:string):Array<Produit>{
      this._http.get<Array<Produit>>(this._url5+"chercher?reference="+referenceP).subscribe(
       data=>{
         this._produits=data;
         console.log(" success");
         console.log(this.produits);
       },error1 => {
          console.log("erroorr");
       }

     );
      return this._produits

 }
 public categorieR(libelleR:string):Array<CategoriProduit>{
    this._http.get<Array<CategoriProduit>>(this._url9+"/categorie/chercher?libelle="+libelleR).subscribe(

      data=>{
        this.categories=data;
        console.log(" success");

      },error1 => {
        console.log("erroorr");

      }


    );
   return this.categories;
 }


 public typeR(libelleR:string):Array<TypeProduit>{
    this._http.get<Array<TypeProduit>>(this._url9+"/type/chercher?libelle="+libelleR).subscribe(
        data=>{
          this.types=data;
          console.log(" success");
        },error1 => {
        console.log("erroorr");
      }


    );
    return this.types;
 }

 public produitsFindAll(){
    this._http.get<Array<Produit>>(this._url5).subscribe(
      data=>{
        if (data!=null){
          this._produits=data;
        }
      },error1 => {
        console.log(error1);
      }

    );

 }
 public modyfieProduit(){

    this._http.put<Produit>(this._url5+"/update/",this.produitModified).subscribe(
      data=>{

        console.log(this.produitModified);

      },error1 => {
        console.log(error1);
      }

    );
  }


  public saveProduit(){
    console.log(this._produitCreate)
    this._http.post<Produit>(this._url5,this._produitCreate).subscribe(
      data=>{
        this._produitCreate=new Produit("","");
       this.produitsFindAll();
        console.log("Ajoute avec success");
      },error1 => {

        console.log("error");
      }


    );

  }
  public deleteProduit(reference:string){
    return this._http.delete<Produit>(this._url5+"delete/"+reference);
  }
  public deleteCategorie(libelle:string): Observable<CategoriProduit[]>{
    console.log(this._url6 + libelle);
    return this.http.delete<CategoriProduit[]>(this._url6 + libelle);
  }
  public deleteType(code:string):Observable<TypeProduit[]>{
    console.log(this._url8+code);
    return this._http.delete<TypeProduit[]>(this._url8+code);
  }
  // public deleteCategorie(libelle:string){
  //   this._http.delete(this._url6+libelle).subscribe(
  //     data=>{
  //     console.log("succeess delete");
  //     },error1 => {
  //       console.log("erroooorr");
  //     }
  //   );
  // }

  public saveCategorie(){
    this._http.post<CategoriProduit>(this._url,this._categorieCreate).subscribe(
      data=>{
        this._categorieCreate=new CategoriProduit("","");
        this.categoriesFindAll();
        console.log("Ajoute avec success");
      },error1 => {
        console.log("error");


      }


    );

  }
  public saveType(){
    this._http.post<TypeProduit>(this._url2,this._typeCreate).subscribe(
      data=>{
        this._typeCreate=new TypeProduit("","");
        console.log("Ajoute avec success");
        this.typesFindAll();
      },error1 => {
        console.log("error");
      }

    );


  }
  public categoriesFindAll() {
    if (this._categories==null){
      this._http.get<Array<CategoriProduit>>(this._url3).subscribe(
        data=>{
          this._categories=data;
        },error1 => {
          console.log("errooorr list");
        }
      );
    }

  }

  get categories(): Array<CategoriProduit> {

    return this._categories;
  }

  get types(): Array<TypeProduit> {
    if(this._types==null){
      this._http.get<Array<TypeProduit>>(this._url4).subscribe(
        data=>{
          this._types=data;
        },error1 => {
          console.log("errooorr list");
        }

      );

    }
    return this._types;
  }
  public typesFindAll() {
    if(this._types==null){
      this._http.get<Array<TypeProduit>>(this._url4).subscribe(
        data=>{
          this._types=data;
        },error1 => {
          console.log("errooorr list");
        }

      );

    }

  }


  get produitModified(): Produit {
    return this._produitModified;
  }

  set produitModified(value: Produit) {
    this._produitModified = value;
  }

  get produits(): Array<Produit> {

    return this._produits;

  }


  set produits(value: Array<Produit>) {
    this._produits=value;
  }

  get produitCreate(): Produit {
    return this._produitCreate;
  }

  set produitCreate(value: Produit) {
    this._produitCreate=value;
  }

  set types(value: Array<TypeProduit>) {
    this._types=value;
  }

  set categories(value: Array<CategoriProduit>) {
    this._categories=value;
  }

  get http(): HttpClient {
    return this._http;
  }

  set http(value: HttpClient) {
    this._http=value;
  }

  get categorieCreate(): CategoriProduit {
    return this._categorieCreate;
  }

  set categorieCreate(value: CategoriProduit) {
    this._categorieCreate=value;
  }

  get typeCreate(): TypeProduit {
    return this._typeCreate;
  }

  set typeCreate(value: TypeProduit) {
    this._typeCreate=value;
  }
}
