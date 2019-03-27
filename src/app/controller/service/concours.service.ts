import { Injectable } from '@angular/core';
import {Concours} from '../model/concours.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConcoursService {

  constructor(private http: HttpClient) { }
  public url:string="http://localhost:8090/concours-api/concours/  ";
  private _listConcours=Array<Concours>();

  public findAll(){

    this.http.get<Array<Concours>>(this.url).subscribe(
      data => {
        this._listConcours = data;
      },
      error1 => {
        console.log('error while loading elements...');
      }
    );
  }
  get listConcours(): Array<Concours> {
    if(this._listConcours==null){
      this._listConcours=new Array<Concours>();
    }
    return this._listConcours;
  }

  set listConcours(value: Concours[]) {
    this._listConcours = value;
  }
}
