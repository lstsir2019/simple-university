import {Injectable} from '@angular/core';
import {CategoriProduit} from "../model/categori-produit.model";
import {TypeProduit} from "../model/type-produit.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Produit} from "../model/produit.model";
import {reference} from "@angular/core/src/render3";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {getReact} from "./evolutions/Util/SwalReact";
import swal from "sweetalert2";

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
  private _url8: string = "http://localhost:8070/produit_api/categoriType/type/delete/";
  private _url9: string = "http://localhost:8070/produit_api/categoriType";


  private _produitModified: Produit = new Produit("", "");
  private referenceProduitModyf: string = "";
  private _categorieCreate: CategoriProduit = new CategoriProduit("", "");
  private _typeCreate: TypeProduit = new TypeProduit("", "");
  private _produitCreate: Produit = new Produit("", "");
  private _produitSearch: Produit = new Produit("", "");
  private _categories: Array<CategoriProduit>;
  private _types: Array<TypeProduit>;
  private _produits: Array<Produit>;
  private referenceP: string = "";
  private SWAL = getReact('Produit', true);


  constructor(private _http: HttpClient) {
  }

/////////////////////////////////////////////////////

  public produitR(referenceP: string): Array<Produit> {
    this._http.get<Array<Produit>>(this._url5 + "chercher?reference=" + referenceP).subscribe(
      data => {
        this._produits = data;
        console.log(" success");
        console.log(this.produits);
      }, error1 => {
        console.log("erroorr");
      }
    );
    return this._produits

  }

  public categorieR(libelleR: string): Array<CategoriProduit> {
    this._http.get<Array<CategoriProduit>>(this._url9 + "/categorie/chercher?libelle=" + libelleR).subscribe(
      data => {
        this.categories = data;
        console.log(" success");

      }, error1 => {
        console.log("erroorr");

      }
    );
    return this.categories;
  }


  public typeR(libelleR: string): Array<TypeProduit> {
    this._http.get<Array<TypeProduit>>(this._url9 + "/type/chercher?libelle=" + libelleR).subscribe(
      data => {
        this.types = data;
        console.log(" success");
      }, error1 => {
        console.log("erroorr");
      }
    );
    return this.types;
  }

  public produitsFindAll() {
    this._http.get<Array<Produit>>(this._url5).subscribe(
      data => {

        this._produits = data;

      }, error1 => {
        console.log(error1);
      }
    );

  }

  public modyfieProduit() {

    if (this._produitModified.libelle=="" ||this._produitModified.typeProduitVo.code==""||this._produitModified.categorieProduitVo.libelle=="" ) {
      swal(this.SWAL.ERROR_NOT_ENOUGH_DATA);
    }
    this._http.put<number>(this._url5 + "/update/", this.produitModified).subscribe(
      data => {

        if (data==-1){
          swal(this.SWAL.SEARCH_NOT_FOUND);

        } else{
          swal(this.SWAL.SUCCESS_EDIT);
        }
        console.log(this.produitModified);
        this.produitsFindAll();

      }, error1 => {
        console.log(error1);
      }
    );
  }


  public saveProduit() {
    console.log(this._produitCreate);
    if (this._produitCreate.reference=="" || this._produitCreate.libelle=="" || this._produitCreate.typeProduitVo.code=="" || this._produitCreate.categorieProduitVo.libelle=="") {
      swal(this.SWAL.ERROR_NOT_ENOUGH_DATA);
    }else {
      this._http.post<number>(this._url5, this._produitCreate).subscribe(
        data => {

          if (data == -1) {
            swal(this.SWAL.ERROR_REF_ALREADY_EXISTS);
          } else {
            this._produitCreate = new Produit("", "");
            swal(this.SWAL.SUCCESS_CREATE);
            this.produitsFindAll();
            console.log("Ajoute avec success");
          }

        }, error1 => {

          console.log("error");
        }
      );
    }
  }

  public findByQuery() {

    console.log(this.produitSearch.reference);
    this._http.post<Array<Produit>>(this._url5 + "search/query", this.produitSearch).subscribe(
      data => {
        console.log(this.produitSearch.reference);
        console.log(this.produitSearch.categorieProduitVo);
        console.log(this.produitSearch.typeProduitVo);
        console.log(this.produitSearch);
        this._produits = data;
        console.log(data);
        this.produitSearch=new Produit("","");
        this.produitSearch.typeProduitVo=new TypeProduit("","");
        this.produitSearch.categorieProduitVo=new CategoriProduit("","");

      }, error1 => {
        console.log("erroooorr", error1);
      }
    )
  }

  public deleteProduit(reference: string) {
    return this._http.delete<Produit>(this._url5 + "delete/" + reference);
  }

  public deleteCategorie(libelle: string): Observable<CategoriProduit[]> {
    console.log(this._url6 + libelle);
    return this.http.delete<CategoriProduit[]>(this._url6 + libelle);
  }

  public deleteType(code: string): Observable<TypeProduit[]> {
    console.log(this._url8 + code);
    return this._http.delete<TypeProduit[]>(this._url8 + code);
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

  public saveCategorie() {
    if (this._categorieCreate.libelle=="" || this._categorieCreate.referenceCompteBuditaire==""){
      swal(this.SWAL.ERROR_NOT_ENOUGH_DATA);
    } else {
      this._http.post<number>(this._url, this._categorieCreate).subscribe(
        data => {
          if (data==-1){
            swal(this.SWAL.ERROR_REF_ALREADY_EXISTS)
          } else {
            swal(this.SWAL.SUCCESS_CREATE);
          }

          this._categorieCreate = new CategoriProduit("", "");
          this.categoriesFindAll();
          console.log("Ajoute avec success");
        }, error1 => {
          console.log("error");


        }
      );
    }
  }

  public saveType() {
    if (this._typeCreate.libelle=="" || this._typeCreate.code=="" ){
      swal(this.SWAL.ERROR_NOT_ENOUGH_DATA);
    } else {


      this._http.post<number>(this._url2, this._typeCreate).subscribe(
        data => {
          if (data==-1){
            swal(this.SWAL.ERROR_REF_ALREADY_EXISTS);
          } else{
            swal(this.SWAL.SUCCESS_CREATE);
          }
          this._typeCreate = new TypeProduit("", "");
          console.log("Ajoute avec success");
          this.typesFindAll();
        }, error1 => {
          console.log("error");
        }
      );
    }

  }

  public categoriesFindAll() {

      this._http.get<Array<CategoriProduit>>(this._url3).subscribe(
        data => {
          this._categories = data;
        }, error1 => {
          console.log("errooorr list");
        }
      );
    }



  get categories(): Array<CategoriProduit> {

    return this._categories;
  }

  get types(): Array<TypeProduit> {

    return this._types;
  }

  public typesFindAll() {

      this._http.get<Array<TypeProduit>>(this._url4).subscribe(
        data => {
          this._types = data;
        }, error1 => {
          console.log("errooorr list");
        }
      );

  }
  public printCategorie(libelle:string):any{
    const httpOptions = {
      responseType : 'blob' as 'json' //This also worked
    };
    return this.http.get(this._url9+"/pdf/Libelle/"+libelle,httpOptions).subscribe((resultBlob: Blob) => {
      var downloadURL = URL.createObjectURL(resultBlob);
      window.open(downloadURL);});
  }
  public printType(code:string):any{
    const httpOptions = {
      responseType : 'blob' as 'json' //This also worked
    };
    return this.http.get(this._url9+"/pdf/code/"+code,httpOptions).subscribe((resultBlob: Blob) => {
      var downloadURL = URL.createObjectURL(resultBlob);
      window.open(downloadURL);});
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
    this._produits = value;
  }

  get produitCreate(): Produit {
    return this._produitCreate;
  }

  set produitCreate(value: Produit) {
    this._produitCreate = value;
  }

  set types(value: Array<TypeProduit>) {
    this._types = value;
  }

  set categories(value: Array<CategoriProduit>) {
    this._categories = value;
  }

  get http(): HttpClient {
    return this._http;
  }

  set http(value: HttpClient) {
    this._http = value;
  }

  get categorieCreate(): CategoriProduit {
    return this._categorieCreate;
  }

  set categorieCreate(value: CategoriProduit) {
    this._categorieCreate = value;
  }

  get typeCreate(): TypeProduit {
    return this._typeCreate;
  }

  set typeCreate(value: TypeProduit) {
    this._typeCreate = value;
  }

  get produitSearch(): Produit {
    return this._produitSearch;
  }

  set produitSearch(value: Produit) {
    this._produitSearch = value;
  }
}
