import {Injectable} from '@angular/core';
import {Echelle} from "../../model/evolution/echelle.model";
import {HttpClient} from "@angular/common/http";
import Swal from 'sweetalert2';
import {getReact} from "./Util/SwalReact";

@Injectable({
  providedIn: 'root'
})
export class EchelleService {

  private _url = 'http://localhost:8015/evolution/echelle/';
  private _echelle: Echelle = new Echelle('', '', 0, '', null, '');
  private _echelles: Array<Echelle>;
  private _searchInput: string;



  private SWAL_REACT = getReact('Echelle', true);
  private SUCCESS_SUCCESS_CREATE = this.SWAL_REACT.SUCCESS_CREATE;
  private SUCCESS_SUCCESS_EDIT = this.SWAL_REACT.SUCCESS_EDIT;
  private SUCCESS_SUCCESS_DELETE = this.SWAL_REACT.SUCCESS_DELETE;
  private CONFIRMATION_DELETE_CONFIRMATION = this.SWAL_REACT.CONFIRMATION_DELETE_CONFIRMATION;
  private SEARCH_NOT_FOUND = this.SWAL_REACT.SEARCH_NOT_FOUND;
  private ERROR_REF_ALREADY_EXISTS = this.SWAL_REACT.ERROR_REF_ALREADY_EXISTS;
  private ERROR_REF_DOES_NOT_EXIST = this.SWAL_REACT.ERROR_REF_DOES_NOT_EXIST;
  private ERROR_INVALID_REF = this.SWAL_REACT.ERROR_INVALID_REF;
  private ERROR_NOT_ENOUGH_DATA = this.SWAL_REACT.ERROR_NOT_ENOUGH_DATA;
  private ERROR_UNKNOWN_ERROR = this.SWAL_REACT.ERROR_UNKNOWN_ERROR;

  constructor(private http: HttpClient) {
    this.getEchellesFromDatabase();
  }


  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get echelle(): Echelle {
    return this._echelle;
  }

  set echelle(value: Echelle) {
    this._echelle = value;
  }

  get echelles(): Array<Echelle> {
    return this._echelles;
  }

  set echelles(value: Array<Echelle>) {
    this._echelles = value;
  }

  get searchInput(): string {
    return this._searchInput;
  }

  set searchInput(value: string) {
    this._searchInput = value;
  }

  ajouterEchelle() {
    this.http.post(this._url, this._echelle).subscribe(
      res => {
        if (res == -1) {
          // @ts-ignore
          Swal.fire(this.ERROR_NOT_ENOUGH_DATA);
        } else if (res == -2) {
          // @ts-ignore
          Swal.fire(this.ERROR_REF_ALREADY_EXISTS);
        } else if (res == 1) {
          this._echelles.push(this._echelle);
          // @ts-ignore
          Swal.fire(this.SUCCESS_SUCCESS_CREATE);
        } else {
          // @ts-ignore
          Swal.fire(this.ERROR_UNKNOWN_ERROR);
        }
      });
  }


  public getEchellesFromDatabase() {
    this.http.get<Echelle>(this._url).subscribe(
      res => {
        // @ts-ignore
        this._echelles = res;
      }
    );
  }

  public editEchelle(data){
    this.http.put(this._url, data).subscribe(
      (res) => {
        if (res == -1) {
          Swal.fire(this.ERROR_NOT_ENOUGH_DATA);
        } else if (res == -2) {
          Swal.fire(this.ERROR_REF_DOES_NOT_EXIST);
        } else if (res == 1) {
          this.getEchellesFromDatabase();
          Swal.fire(this.SUCCESS_SUCCESS_EDIT);
        } else {
          Swal.fire(this.ERROR_UNKNOWN_ERROR);
        }
      });
  }

  deleteEchelle(data) {
    Swal.fire(this.CONFIRMATION_DELETE_CONFIRMATION)
      .then((result) => {
      if (result.value) {
        this.http.delete(this._url + "/" + data).subscribe(
          (res) => {
            if (res == -1) {
              Swal.fire(this.ERROR_INVALID_REF);
            } else if (res == -2) {
              Swal.fire(this.ERROR_REF_DOES_NOT_EXIST);
            } else if (res == 1) {
              this.getEchellesFromDatabase();
              Swal.fire(this.SUCCESS_SUCCESS_DELETE);
            } else {
              Swal.fire(this.ERROR_UNKNOWN_ERROR);
            }
          });
      }
    });
  }

  search() {
    if (this.searchInput !== "") {
      this.echelles = this.echelles.filter(echelon => echelon.reference.includes(this.searchInput));
      if (this.echelles === undefined || this.echelles.length == 0) {
        Swal.fire(this.SEARCH_NOT_FOUND).then(() => {
          this.getEchellesFromDatabase();
        });
      }
    }
  }
}


