import {Injectable} from '@angular/core';
import {Magasin} from "../model/magasin.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MagasinService {

  private _url: string = "http://localhost:8040/magasin-api/magasins/";

  constructor(private http: HttpClient) {
  }

  private _magasinCreate: Magasin = new Magasin("");
  private _magasins: Array<Magasin>;

  public findAll() {

    this.http.get<Array<Magasin>>(this._url).subscribe(
      data => {
        this._magasins = data;
      }, error => {
        console.log("Error" + error);
      }
    );
  }


  public saveMagasin() {
    this.http.post<Magasin>(this._url, this._magasinCreate).subscribe(
      data => {
        this._magasinCreate = new Magasin("");
        console.log("Ajouter avec success:" + data);
      },
      error => {
        console.log("error" + error);
      }
    );
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get magasinCreate(): Magasin {
    return this._magasinCreate;
  }

  set magasinCreate(value: Magasin) {
    this._magasinCreate = value;
  }

  get magasins(): Array<Magasin> {
    return this._magasins;
  }

  set magasins(value: Array<Magasin>) {
    this._magasins = value;
  }
}
