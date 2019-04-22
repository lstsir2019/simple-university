import {Injectable} from '@angular/core';
import {Livraison} from '../model/livraison.model';
import {LivraisonItem} from '../model/livraison-item.model';
import {HttpClient} from "@angular/common/http";
import {getReact} from "./evolutions/Util/SwalReact";
import swal from "sweetalert2";
import {CommandeSourceWithProduit} from "../model/commande-source-with-produit.model";


@Injectable({
  providedIn: 'root'
})
export class LivraisonService {
  private _url: string = "http://localhost:8098/Livraison-api/livraisons/";
  private _url2: string = "http://localhost:8098/Livraison-api/livraisonItems/";
  private _livraisonCreate: Livraison = new Livraison("", "", "", "");
  private _livraisonItemCreate: LivraisonItem = new LivraisonItem('', '', '', '', '','');
  private _livraisonDetailCreate: Livraison = new Livraison("", "", "", "");
  private _livraisonDeatailItemCreate: LivraisonItem = new LivraisonItem("", "", "", "", "","");
  private _livraisons: Array<Livraison>;
  private _livraisonR: Livraison;
  public livraisonQuery: Livraison = new Livraison("", "", "", "");
  private SWAL = getReact('Livraison', true);
  private _commandesExpressions:Array<CommandeSourceWithProduit>;
  private _commandesExpressionsGlobals:Array<CommandeSourceWithProduit>;
  private _commandeExpression:CommandeSourceWithProduit=new CommandeSourceWithProduit("","","");
  private _magasin:string ="";


  // private _livraisonItems:Array<LivraisonItem>;

  constructor(private _http: HttpClient) {
  }

  public addLivraisonItem() {
    console.log(this.livraisonItemCreate.referenceReception);
    console.log(this.livraisonItemCreate.codeMagasin);
    console.log(this.livraisonItemCreate.qte);
    console.log(this.livraisonItemCreate.refenceProduit);
    if( this._livraisonItemCreate.codeMagasin=="" || this._livraisonItemCreate.refenceProduit=="" || this._livraisonItemCreate.qte=="" || this._livraisonItemCreate.strategy==""){
      swal(this.SWAL.ERROR_NOT_ENOUGH_DATA);
    }else {


        let livraisonItemClone = new LivraisonItem(this._livraisonItemCreate.refenceProduit, this._livraisonItemCreate.qte, this._livraisonItemCreate.codeMagasin, this._livraisonItemCreate.referenceReception, this._livraisonItemCreate.strategy,this.livraisonItemCreate.referenceCommandeExpression);
        this._livraisonCreate.livraisonItemVos.push(livraisonItemClone);
        this._livraisonItemCreate = new LivraisonItem("", "", "", "", "","");

    }


  }
  public addLivraisonItemDeatil() {
    if (this._livraisonDeatailItemCreate.refenceProduit=="" || this._livraisonDeatailItemCreate.qte=="" || this._livraisonDeatailItemCreate.codeMagasin=="" || this._livraisonDeatailItemCreate.referenceReception==""){
      swal(this.SWAL.ERROR_NOT_ENOUGH_DATA);
    } else {

        let livraisonItemClone = new LivraisonItem(this._livraisonDeatailItemCreate.refenceProduit, this._livraisonDeatailItemCreate.qte, this._livraisonDeatailItemCreate.codeMagasin, this._livraisonDeatailItemCreate.referenceReception, this._livraisonDeatailItemCreate.strategy,this.livraisonDeatailItemCreate.referenceCommandeExpression);
        this._livraisonDetailCreate.livraisonItemVos.push(livraisonItemClone);
        this._livraisonDeatailItemCreate = new LivraisonItem("", "", "", "", "","");

    }


  }

  public saveLivraison() {
    if (this._livraisonCreate.reference=="" ||this._livraisonCreate.date=="" || this._livraisonCreate.referenceCommande=="" || this._livraisonCreate.referenceEntite=="" ) {
      swal(this.SWAL.ERROR_NOT_ENOUGH_DATA);
    }else {
      this._http.post<number>(this._url, this._livraisonCreate).subscribe(
        data => {


          this._livraisonCreate = new Livraison("", "", "", "");
          if (data == -1) {
            swal(this.SWAL.ERROR_REF_ALREADY_EXISTS);
          }
          if (data == -2) {
            swal(this.SWAL.ERROR_NOT_ENOUGH_DATA);
          }
          if (data == 1) {
            swal(this.SWAL.SUCCESS_CREATE);
          }

          console.log("Ajoute avec success");
        },
        error => {
          console.log("error");
          swal(this.SWAL.ERROR_UNKNOWN_ERROR);
        }
      );
    }
  }


  public saveLivraisonDetail() {
    if (this._livraisonDetailCreate.reference=="" ||this._livraisonDetailCreate.date=="" || this._livraisonDetailCreate.referenceCommande=="" || this._livraisonDetailCreate.referenceEntite=="" ) {
      swal(this.SWAL.ERROR_NOT_ENOUGH_DATA);
    }else {


      this._http.post<number>(this._url + "detaille/", this._livraisonDetailCreate).subscribe(
        data => {
          if (data == -1) {
            swal(this.SWAL.ERROR_REF_ALREADY_EXISTS);
          }
          if (data == -2) {
            swal(this.SWAL.ERROR_NOT_ENOUGH_DATA);
          }
          if (data == 1) {
            swal(this.SWAL.SUCCESS_CREATE);
          }

          this.livraisonDetailCreate = new Livraison("", "", "", "");

          console.log("Ajoute avec success");
        },
        error => {
          console.log("error");
        }
      );
    }
  }

  public livraisonItemsR(livraison: Livraison) {
    this._livraisonR = livraison;

    if (this._livraisonR != null) {

      this._http.get<Array<LivraisonItem>>(this._url2 + "livraison/reference/" + this._livraisonR.reference).subscribe(
        data => {
          this._livraisonR.livraisonItemVos = data;
          console.log(data);
        }, error1 => {
          console.log("errooorr list" + error1);
        });
    }

  }

  public deleteLivraison(reference: string) {
    this._http.delete<Livraison>(this.url + "delete/reference/" + reference).subscribe();
    this._livraisonR = new Livraison("", "", "", "");
  }

  get livraisons(): Array<Livraison> {

    return this._livraisons;
  }

  public findAll() {
    this._http.get<Array<Livraison>>(this._url).subscribe(
      data => {
        if (data != null) {
          this._livraisons = data;
          console.log(data);
        }

      }, error1 => {
        console.log("errooorr list" + error1);
      }
    );

  }

  public findByQueryLivraison() {
    this._http.post<Array<Livraison>>(this._url + "/query", this.livraisonQuery).subscribe(
      data => {
        console.log(this.livraisonQuery.dateMin);
        console.log(this.livraisonQuery.dateMax);
        this._livraisons = data;
      }, error1 => {
        console.log("errooorr list" + error1);
      }
    );
  }
  public commandeExpressionsFindGlobal(){
    this._http.get<Array<CommandeSourceWithProduit>>(this._url+"commande/"+this._livraisonCreate.referenceCommande+"/entity/"+this._livraisonCreate.referenceEntite).subscribe(

      data=>{
        this.commandesExpressionsGlobals=data;
        console.log(data);
      },error1 => {
        console.log("errroorr ====>"+error1);
      }
    );
  }

  public commandeExpresssionsFind(){
    console.log(this._livraisonDetailCreate.referenceCommande);
    console.log(this._livraisonDetailCreate.referenceEntite);
   this._http.get<Array<CommandeSourceWithProduit>>(this._url+"commande/"+this._livraisonDetailCreate.referenceCommande+"/entity/"+this._livraisonDetailCreate.referenceEntite).subscribe(

     data=>{
        this._commandesExpressions=data;
        console.log(data);
      },error1 => {
        console.log("errroorr ====>"+error1);
     }
   );
  }

  set livraisons(value: Array<Livraison>) {
    this._livraisons = value;
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get livraisonCreate(): Livraison {
    return this._livraisonCreate;
  }

  set livraisonCreate(value: Livraison) {
    this._livraisonCreate = value;
  }

  get livraisonItemCreate(): LivraisonItem {
    return this._livraisonItemCreate;
  }

  set livraisonItemCreate(value: LivraisonItem) {
    this._livraisonItemCreate = value;
  }

  get http(): HttpClient {
    return this._http;
  }

  set http(value: HttpClient) {
    this._http = value;
  }


  get livraisonR(): Livraison {
    return this._livraisonR;
  }

  set livraisonR(value: Livraison) {
    this._livraisonR = value;
  }


  get livraisonDetailCreate(): Livraison {
    return this._livraisonDetailCreate;
  }

  set livraisonDetailCreate(value: Livraison) {
    this._livraisonDetailCreate = value;
  }

  get livraisonDeatailItemCreate(): LivraisonItem {
    return this._livraisonDeatailItemCreate;
  }

  set livraisonDeatailItemCreate(value: LivraisonItem) {
    this._livraisonDeatailItemCreate = value;
  }

  get magasin(): string {
    return this._magasin;
  }

  set magasin(value: string) {
    this._magasin = value;
  }

  get commandesExpressions(): Array<CommandeSourceWithProduit> {
    return this._commandesExpressions;
  }

  set commandesExpressions(value: Array<CommandeSourceWithProduit>) {
    this._commandesExpressions = value;
  }


  get commandesExpressionsGlobals(): Array<CommandeSourceWithProduit> {
    return this._commandesExpressionsGlobals;
  }

  set commandesExpressionsGlobals(value: Array<CommandeSourceWithProduit>) {
    this._commandesExpressionsGlobals = value;
  }

  get commandeExpression(): CommandeSourceWithProduit {
    return this._commandeExpression;
  }

  set commandeExpression(value: CommandeSourceWithProduit) {
    this._commandeExpression = value;
  }
}


