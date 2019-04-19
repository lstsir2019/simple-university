import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Magasin} from "../model/magasin.model";
import Swal from "sweetalert2";
import {getReact} from "./evolutions/Util/SwalReact";


@Injectable({
  providedIn: 'root'
})

export class MagasinService {

  private _url: string = "http://localhost:8042/magasin-api/magasins/";


  public magasinSelected: Magasin = new Magasin("");
  public magasinToUpdate: Magasin = new Magasin("");
  private SWAL = getReact('Magasin', true);

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

  public upDate() {
    this.http.put<Magasin>(this._url, this.magasinSelected).subscribe(
      data => {
        this.magasinSelected = data;
        if (null != data) {
          this.magasinToUpdate.address = data.address;
          this.magasinToUpdate.libelle = data.libelle;
          this.magasinToUpdate.description = data.description;
          Swal(this.SWAL.SUCCESS_EDIT);
        } else {
          Swal(this.SWAL.ERROR_UNKNOWN_ERROR);
        }
      }, error => {
        console.log("Error" + error);
        Swal(this.SWAL.ERROR_UNKNOWN_ERROR);
      }
    );
  }


  public saveMagasin() {
    this.http.post<number>(this._url, this._magasinCreate).subscribe(
      data => {
        this._magasinCreate = new Magasin("");
        if (data == 1) {
          Swal(this.SWAL.SUCCESS_CREATE);
          this.findAll();
        } else {
          Swal(this.SWAL.ERROR_INVALID_REF);
        }
      },
      error => {
        Swal({
          title: 'Erreur !',
          text: error,
          type: 'error',
          confirmButtonText: 'ok'
        });
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
