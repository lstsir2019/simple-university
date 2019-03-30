import { Injectable } from '@angular/core';
import {Reception} from "../model/reception.model";
import {ReceptionItem} from "../model/reception-item.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReceptionService {

  public url: string='http://localhost:8041/reception-api/receptions/';
  public urlReceptionItem:'http://localhost:8041/reception-api/receptionitems/';
  public receptionCreate:Reception=new Reception('','','');
  public receptionItemCreate:ReceptionItem= new ReceptionItem('','','','',0);
  constructor(private http: HttpClient) { }
  private _receptions:Array<Reception>;
  private _receptionSelected:Reception;
  public addReceptionItem(){
    if(this.receptionItemCreate.qte>0){
      let receptionItemClone:ReceptionItem= new ReceptionItem(this.receptionItemCreate.reference,this.receptionItemCreate.referenceCategorie,this.receptionItemCreate.referenceProduit,this.receptionItemCreate.referenceMagasin,this.receptionItemCreate.qte);
      this.receptionCreate.receptionItems.push(receptionItemClone);
    }
  }
  public  saveReception(){
    this.http.post<number>(this.url,this.receptionCreate).subscribe(
      data=> {
        console.log("Ajouter avec success"+data);
       if(data>0) this.receptionCreate = new Reception("","","");
      },
      error=>{
        console.log("error"+error);
      }
    );
  }
  public findReceptionItemsByReceptionReference(reception:Reception){
    this.receptionSelected=reception;
    if(this.receptionSelected!=null){
      this.http.get<Array<ReceptionItem>>(this.urlReceptionItem+"/reference/"+this.receptionSelected.reference).subscribe(
        date => {
          this._receptionSelected.receptionItems = date;
        }, error => {
          console.log("Error"+error);
        }
      );
    }
  }
  public findAll(){
    if (this._receptions == null) {
      this.http.get<Array<Reception>>(this.url+"receptions").subscribe(
        date => {
          this._receptions = date;
        }, error => {
          console.log("Error"+error);
        }
      );
    }
  }
  get receptions(): Array<Reception> {
    if (this._receptions == null) {
      this.http.get<Array<Reception>>(this.url+"receptions").subscribe(
        date => {
          this._receptions = date;
        }, error => {
          console.log("Error"+error);
        }
      );
    }
    return this._receptions;
  }

  set receptions(value: Array<Reception>) {
    this._receptions = value;
  }

  get receptionSelected(): Reception {
    return this._receptionSelected;
  }

  set receptionSelected(value: Reception) {
    this._receptionSelected = value;
  }

  deleteReceptionItems(item: ReceptionItem) {
    let index:number=this.receptionCreate.receptionItems.indexOf(item);
    this.receptionCreate.receptionItems.splice(index,1);
  }

}

