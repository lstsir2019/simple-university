import { Injectable } from '@angular/core';
import {ExpressionBesoin} from '../model/expression-besoin.model';
import {reference} from '@angular/core/src/render3';
import {ExpressionBesoinItem} from '../model/expression-besoin-item.model';
import {HttpClient} from "@angular/common/http";
import {Stock} from '../model/stock.model';
import {error} from 'selenium-webdriver';


@Injectable({
  providedIn: 'root'
})
export class ExpressionBesoinService {
  public url:string = "http://localhost:8099/faculte-besoin/expressionbesoins/"
  public expressionBesoinCreate: ExpressionBesoin = new ExpressionBesoin('' , '' , '', '');
  public expressionBesoinItemCreate: ExpressionBesoinItem = new ExpressionBesoinItem(0,
    '', '', 0,'',0,0,0);
  private _expressionBesoins:Array<ExpressionBesoin>;
  private _expressionBesoinSelect:ExpressionBesoin;
  private _expressionBesoinItemSelect:ExpressionBesoinItem;

  constructor(private http:HttpClient) {

  }


  public addExpressionBesoinItem() {
    let expressionBesoinItemClone = new ExpressionBesoinItem(this.expressionBesoinItemCreate.id,this.expressionBesoinItemCreate.referenceCategorieProduit, this.expressionBesoinItemCreate.referenceProduit, this.expressionBesoinItemCreate.quantiteDemande, this.expressionBesoinItemCreate.description,this.expressionBesoinItemCreate.quantiteAccorder,this.expressionBesoinItemCreate.quantiteCommander,this.expressionBesoinItemCreate.quantiteLivre );
    this.expressionBesoinCreate.expressionBesoinItemsVos.push(expressionBesoinItemClone);
    this.expressionBesoinItemCreate = new ExpressionBesoinItem(0,'','',0,'',0,0,0 );
  }


  public saveExpressionBesoin(){
    if (this.expressionBesoinSelect!=null){
      this.http.post<ExpressionBesoin>(this.url,this.expressionBesoinCreate).subscribe(
        date=>{
          console.log("done");
          this.expressionBesoinCreate = new ExpressionBesoin('' , '' , '', '');
        },error=>{
          console.log("error");
        }
      );
    }

  }
  public findItemsByReference(expressionBesoin:ExpressionBesoin){
    this._expressionBesoinSelect=expressionBesoin;
    if (this._expressionBesoinSelect !=null){
      this.http.get<Array<ExpressionBesoinItem>>("http://localhost:8099/faculte-besoin/expressionbesoins/items/"+this.expressionBesoinSelect.reference+"").subscribe(
        data=>{
          this.expressionBesoinSelect.expressionBesoinItemsVos=data;
        },error1 => {
          console.log("error while loading ...");
        }
      );
    }

  }

  public accorder(expressionBesoinItem: ExpressionBesoinItem){
    if (expressionBesoinItem !=null){
      console.log("koko");
      this.http.put('http://localhost:8099/faculte-besoin/item/accorder',expressionBesoinItem).subscribe(
        data=>{
          console.log("Done ... !");},
            error=>{
            console.log(error);
            }

      );
    }
  }

  public deleteItem(){

    if (this._expressionBesoinItemSelect !=null){
      this.http.delete("http://localhost:8099/faculte-besoin/item/delete/"+this.expressionBesoinItemSelect.id+"",{}).subscribe(
        data=>{
          console.log("deleted ...");
        },error => {
          console.log("error while deleting ...");
        }
      );
    }

  }

  get expressionBesoins(): Array<ExpressionBesoin> {
    if (this._expressionBesoins==null){
      this.http.get<Array<ExpressionBesoin>>(this.url).subscribe(
        data=>{
            this._expressionBesoins=data;
        },error1 => {
            console.log("error while loading ...")
        }
      );
    }
    return this._expressionBesoins;
  }

  set expressionBesoins(value: Array<ExpressionBesoin>) {
    this._expressionBesoins = value;
  }


  get expressionBesoinSelect(): ExpressionBesoin {
    if(this._expressionBesoinSelect == null){
      this._expressionBesoinSelect = new ExpressionBesoin('',"","","");
    }
    return this._expressionBesoinSelect;
  }

  set expressionBesoinSelect(value: ExpressionBesoin) {
    this._expressionBesoinSelect = value;
  }


  get expressionBesoinItemSelect(): ExpressionBesoinItem {
    if(this._expressionBesoinItemSelect == null){
      this._expressionBesoinItemSelect = new ExpressionBesoinItem(0,"","",0,"",0,0,0);
    }
    return this._expressionBesoinItemSelect;
  }

  set expressionBesoinItemSelect(value: ExpressionBesoinItem) {
    this._expressionBesoinItemSelect = value;
  }

  public setItemSelect(expressionBesoinItem: ExpressionBesoinItem) {
    this.expressionBesoinItemSelect = expressionBesoinItem;
  }




}
