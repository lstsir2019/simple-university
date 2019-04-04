import { Injectable } from '@angular/core';
import {Livraison} from '../model/livraison.model';
import {LivraisonItem} from '../model/livraison-item.model';
import {HttpClient} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class LivraisonService {
  private _url: string = "http://localhost:8098/Livraison-api/livraisons/";
  private _url2:string="http://localhost:8098/Livraison-api/livraisonItems/";
  private _livraisonCreate: Livraison = new Livraison("", "", "","");
  private _livraisonItemCreate: LivraisonItem = new LivraisonItem('', '', '');
  private _livraisons:Array<Livraison>;
  private _livraisonR:Livraison;
 // private _livraisonItems:Array<LivraisonItem>;

  constructor(private _http: HttpClient) { }
  public addLivraisonItem() {
    let livraisonItemClone = new LivraisonItem(this._livraisonItemCreate.refenceProduit, this._livraisonItemCreate.qte, this._livraisonItemCreate.codeMagasin);
    this._livraisonCreate.livraisonItemVos.push(livraisonItemClone);

  }

  public saveLivraison(){
    this._http.post<Livraison>(this._url,this._livraisonCreate).subscribe(
      data=>{
           this._livraisonCreate=new Livraison("","","","");
           console.log("Ajoute avec success");
         },
      error => {
        console.log("error");
      }

    );
  }

  public livraisonItemsR(livraison:Livraison){
    this._livraisonR=livraison;

  if(this._livraisonR!=null) {

    this._http.get<Array<LivraisonItem>>(this._url2 +"livraison/reference/"+ this._livraisonR.reference).subscribe(
      data => {
      this._livraisonR.livraisonItemVos=data;
        console.log(data);
    },error1 => {
      console.log("errooorr list"+error1);
    });
  }

  }

  get livraisons(): Array<Livraison> {
    if(this._livraisons==null){
      this._http.get<Array<Livraison>>(this._url).subscribe(
        data=>{
          this._livraisons=data;
        },error1 => {
        console.log("errooorr list");
        }

      );
    }
    return this._livraisons;
  }
     public findAll(){
      this._http.get<Array<Livraison>>(this._url).subscribe(
        data=>{
          if(data!=null){
            this._livraisons=data;
            console.log(data);
          }

        },error1 => {
          console.log("errooorr list"+error1);
        }

      );


  }

  set livraisons(value: Array<Livraison>) {
    this._livraisons=value;
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url=value;
  }

  get livraisonCreate(): Livraison {
    return this._livraisonCreate;
  }

  set livraisonCreate(value: Livraison) {
    this._livraisonCreate=value;
  }

  get livraisonItemCreate(): LivraisonItem {
    return this._livraisonItemCreate;
  }

  set livraisonItemCreate(value: LivraisonItem) {
    this._livraisonItemCreate=value;
  }

  get http(): HttpClient {
    return this._http;
  }

  set http(value: HttpClient) {
    this._http=value;
  }



  get livraisonR(): Livraison {
    return this._livraisonR;
  }

  set livraisonR(value: Livraison) {
    this._livraisonR=value;
  }
}


