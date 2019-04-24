import { Injectable } from '@angular/core';
import {ExpressionBesoin} from '../model/expression-besoin.model';
import {ExpressionBesoinItem} from '../model/expression-besoin-item.model';
import {HttpClient} from "@angular/common/http";
import Swal from 'sweetalert2';
import {CategoriProduit} from '../model/categori-produit.model';
import {Produit} from '../model/produit.model';


@Injectable({
  providedIn: 'root'
})
export class ExpressionBesoinService {
  public url:string = "http://localhost:8099/faculte-besoin/expressionbesoins/"
  public expressionBesoinCreate: ExpressionBesoin = new ExpressionBesoin('' , '' , '', '','','');
  public expressionBesoinItemCreate: ExpressionBesoinItem = new ExpressionBesoinItem(0,
    '', '', 0,'',0,0,0,'');
  public expressionBesoins:Array<ExpressionBesoin>;
  public expressionBesoinSelect:ExpressionBesoin;
  private _expressionBesoinItemSelect:ExpressionBesoinItem;
  public expressionBesoinSearch:ExpressionBesoin = new ExpressionBesoin('','','','','','');
  public produitCategories:Array<CategoriProduit>;
  public produits:Array<Produit>

  constructor(private http:HttpClient) {

  }


  public addExpressionBesoinItem() {
    let expressionBesoinItemClone = new ExpressionBesoinItem(this.expressionBesoinItemCreate.id,this.expressionBesoinItemCreate.referenceCategorieProduit, this.expressionBesoinItemCreate.referenceProduit, this.expressionBesoinItemCreate.quantiteDemande, this.expressionBesoinItemCreate.description,this.expressionBesoinItemCreate.quantiteAccorder,this.expressionBesoinItemCreate.quantiteCommander,this.expressionBesoinItemCreate.quantiteLivre,this.expressionBesoinItemCreate.entityAdmin );
    this.expressionBesoinCreate.expressionBesoinItemsVos.push(expressionBesoinItemClone);
    this.expressionBesoinItemCreate = new ExpressionBesoinItem(0,'','',0,'',0,0,0,'' );
  }

  public print():any{
    const httpOptions = {

      responseType  : 'blob' as 'json'        //This also worked
    };
    return this.http.get("http://localhost:8090/produit_api/produit/pdf",httpOptions).subscribe((resultBlob: Blob) => {
      var downloadURL = URL.createObjectURL(resultBlob);
      window.open(downloadURL);});


  }


  public saveExpressionBesoin(){
    if (this.expressionBesoinSelect!=null){
      this.http.post<number>(this.url,this.expressionBesoinCreate).subscribe(
        date=>{
          if (date == -1){
            Swal({
              title: 'cannot save !',
              text: 'Référence déja utilisé',
              type: 'error',
            });
          }
          if (date == 1) {
            Swal({
              title: 'done !',
              text: 'Expression Besoin crée',
              type: 'success',
            });
          }
          console.log("done");
          this.expressionBesoinCreate = new ExpressionBesoin('' , '' , '', '','','');
        },error=>{
          console.log("error");
        }
      );
    }

  }

  public findAll(){
    this.http.get<Array<ExpressionBesoin>>('http://localhost:8099/faculte-besoin/expressionbesoins/').subscribe(
      data=>{
        this.expressionBesoins=data;
      }, error1 => {
        console.log("error while loding all exp besoin =>"+error1);
      }
    );
  }

  public findItemsByReference(expressionBesoin:ExpressionBesoin){
    this.expressionBesoinSelect=expressionBesoin;
    if (this.expressionBesoinSelect !=null){
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
          if (data == -1) {
            Swal({
              title: 'failed !',
              text: 'déja accorder',
              type: 'error',
            });
          }

          if (data == -2) {
            Swal({
              title: 'failed !',
              text: 'qte non acceptable',
              type: 'error',
            });
          }

          if (data == 1) {
            Swal({
              title: 'done !!',
              text: 'une qte a été accorder',
              type: 'success',
            });
          }
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
          if (data == -2) {
            Swal({
              title: 'failed !',
              text: 'déja commander',
              type: 'error',
            });
          }

          if (data == 1) {
            Swal({
              title: 'done !!',
              text: 'suppression réussite',
              type: 'success',
            });
          }
          console.log("deleted ...");
          this.findItemsByReference(this.expressionBesoinSelect);
        },error => {
          console.log("error while deleting ...");
        }
      );
    }

  }



  public findByCriteria(){

    this.http.post<Array<ExpressionBesoin>>("http://localhost:8099/faculte-besoin/expressionbesoins/search",this.expressionBesoinSearch).subscribe(
      data=>{
        this.expressionBesoins = data;
      },error1 => {
        console.log(error1);
      }
    );
  }











  get expressionBesoinItemSelect(): ExpressionBesoinItem {
    if(this._expressionBesoinItemSelect == null){
      this._expressionBesoinItemSelect = new ExpressionBesoinItem(0,"","",0,"",0,0,0,'');
    }
    return this._expressionBesoinItemSelect;
  }

  set expressionBesoinItemSelect(value: ExpressionBesoinItem) {
    this._expressionBesoinItemSelect = value;
  }

  public setItemSelect(expressionBesoinItem: ExpressionBesoinItem) {
    this.expressionBesoinItemSelect = expressionBesoinItem;
  }


  public getCategories() {
    if(this.produitCategories == null){
    this.http.get<Array<CategoriProduit>>("http://localhost:8099/faculte-besoin/expressionbesoins/categorieProduit").subscribe(
      data=>{
        this.produitCategories = data;
        console.log("haaa data"+data);
      },error1 => {
        console.log("error loading categories ..."+error1);
      }
    );
    return this.produitCategories;}
  }

  public setProduitsByCategorie(libelle : string){
    this.http.get<Array<Produit>>("http://localhost:8099/faculte-besoin/expressionbesoins/Produit/categorie/"+libelle).subscribe(
      data=>{
        console.log("haaaa products ...")
        this.produits=data;
      },error1 => {
        console.log(error1);
      }
    );
  }




}
