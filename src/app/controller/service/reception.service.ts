import {Injectable} from '@angular/core';
import {Reception} from "../model/reception.model";
import {ReceptionItem} from "../model/reception-item.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReceptionService {


  public url: string = 'http://localhost:8041/reception-api/receptions/';
  public urlReceptionItem: string = 'http://localhost:8041/reception-api/receptionitems/';
  public receptionCreate: Reception = new Reception('', '', '');
  public receptionItemCreate: ReceptionItem = new ReceptionItem('', '', '', '', 0);

  constructor(private http: HttpClient) {
  }

  private _receptions: Array<Reception>;
  private _receptionSelected: Reception;
  public receptionSearch: Reception = new Reception('', '', '');

  public addReceptionItem() {
    if (this.receptionItemCreate.qte > 0) {
      let receptionItemClone: ReceptionItem = new ReceptionItem(this.receptionItemCreate.reference, this.receptionItemCreate.referenceCategorie, this.receptionItemCreate.referenceProduit, this.receptionItemCreate.referenceMagasin, this.receptionItemCreate.qte);
      this.receptionCreate.receptionItems.push(receptionItemClone);
    }
  }

  public saveReception() {
    this.http.post<number>(this.url, this.receptionCreate).subscribe(
      data => {
        if (data > 0) this.receptionCreate = new Reception("", "", "");
      },
      error => {
        console.log("error" + error);
      }
    );
  }

  public findReceptionItemsByReceptionReference(reception: Reception) {
    this.receptionSelected = reception;
    if (this.receptionSelected != null) {
      console.log(this.urlReceptionItem + "reference/" + this.receptionSelected.reference);
      this.http.get<Array<ReceptionItem>>(this.urlReceptionItem + "reference/" + this.receptionSelected.reference).subscribe(
        date => {
          this._receptionSelected.receptionItems = date;
          console.log(date);
        }, error => {
          console.log("Error" + error);
        }
      );
    }
  }

  public deleteReception(reception: Reception) {
    this.receptionSelected = reception;
    if (this.receptionSelected != null) {
      console.log(this.url + "reference/" + this.receptionSelected.reference);
      this.http.delete<Reception>(this.url + "reference/" + this.receptionSelected.reference).subscribe(error => {
        console.log('Deleted Reception  with reference = ' + this.receptionSelected.reference + "" + error);
      });
      let index: number = this._receptions.indexOf(reception);
      this._receptions.splice(index, 1);
    }
  }

  public findByQuery() {
    console.log(this.receptionSearch);
    this.http.post<Array<Reception>>(this.url + "search", this.receptionSearch).subscribe(
      date => {
        this._receptions = date;
      }, error => {
        console.log("Error");
      }
    );
  }

  public findAll() {
    this.http.get<Array<Reception>>(this.url).subscribe(
      date => {
        this._receptions = date;
      }, error => {
        console.log("Error" + error);
      }
    );
  }

  get receptions(): Array<Reception> {
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
    let index: number = this.receptionCreate.receptionItems.indexOf(item);
    this.receptionCreate.receptionItems.splice(index, 1);
  }

}

