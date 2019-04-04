import {Injectable} from '@angular/core';
import {LoiEvolutionTypePersonnel} from "../../model/evolution/loi-evolution-type-personnel.model";
import Swal from "sweetalert2";
import {HttpClient} from "@angular/common/http";
import {getReact} from "./Util/SwalReact";

@Injectable({
  providedIn: 'root'
})
export class LoiEvolutionTypePersonnelService {

  private _url = 'http://localhost:8099/evolution/loi/loi-type-personnel/';
  private _loiEvolutionTypePersonnel = new LoiEvolutionTypePersonnel('', '', null, null, 0, null);
  private _loisEvolutionTypePersonnel = new Array<LoiEvolutionTypePersonnel>();
  private _searchInput: string;

  private SWAL_REACT = getReact('Evolution personnel', true);
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
    this.getLoisEvolutionTypePersonnelFromDatabase();
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get loiEvolutionTypePersonnel(): LoiEvolutionTypePersonnel {
    return this._loiEvolutionTypePersonnel;
  }

  set loiEvolutionTypePersonnel(value: LoiEvolutionTypePersonnel) {
    this._loiEvolutionTypePersonnel = value;
  }

  get loisEvolutionTypePersonnel(): LoiEvolutionTypePersonnel[] {
    return this._loisEvolutionTypePersonnel;
  }

  set loisEvolutionTypePersonnel(value: LoiEvolutionTypePersonnel[]) {
    this._loisEvolutionTypePersonnel = value;
  }


  get searchInput(): string {
    return this._searchInput;
  }

  set searchInput(value: string) {
    this._searchInput = value;
  }

  public getLoisEvolutionTypePersonnelFromDatabase() {
    this.http.get<LoiEvolutionTypePersonnel>(this._url).subscribe(
      res => {
        // @ts-ignore
        this._loisEvolutionTypePersonnel = res;
      }
    );
  }


  ajouterLoiEvolutionPersonnel() {
    this.http.post(this._url, this._loiEvolutionTypePersonnel).subscribe(
      res => {
        if (res == -1) {
          Swal(this.ERROR_NOT_ENOUGH_DATA);
        } else if (res == -2) {
          Swal(this.ERROR_REF_ALREADY_EXISTS);
        } else if (res == 1) {
          this.getLoisEvolutionTypePersonnelFromDatabase();
          Swal(this.SUCCESS_SUCCESS_CREATE);
        } else {
          Swal(this.ERROR_UNKNOWN_ERROR);
        }
      });
  }

  public modifierLoiEvolutionTypePersonnel(data) {
    this.http.put(this._url , data).subscribe(
      (res) => {
        if (res == -1) {
          Swal(this.ERROR_NOT_ENOUGH_DATA);
        } else if (res == -2) {
          Swal(this.ERROR_REF_ALREADY_EXISTS);
        } else if (res == 1) {
          this.getLoisEvolutionTypePersonnelFromDatabase();
          Swal(this.SUCCESS_SUCCESS_EDIT);
        } else {
          Swal(this.ERROR_UNKNOWN_ERROR);
        }
      });
  }

  deleteLoiEvolutionTypePersonnel(data) {
    Swal(this.CONFIRMATION_DELETE_CONFIRMATION)
      .then((result) => {
        if (result.value) {
          this.http.delete(this._url + "/" + data).subscribe(
            (res) => {
              if (res == -1) {
                Swal(this.ERROR_INVALID_REF);
              } else if (res == -2) {
                Swal(this.ERROR_REF_DOES_NOT_EXIST);
              } else if (res == 1) {
                this.getLoisEvolutionTypePersonnelFromDatabase();
                Swal(this.SUCCESS_SUCCESS_DELETE);
              } else {
                Swal(this.ERROR_UNKNOWN_ERROR);
              }
            });
        }
      });
  }

  search() {
    if (this.searchInput !== "") {
      this.loisEvolutionTypePersonnel = this.loisEvolutionTypePersonnel.filter(echelon => echelon.reference.includes(this.searchInput));
      if (this.loisEvolutionTypePersonnel === undefined || this.loisEvolutionTypePersonnel.length == 0) {
        Swal(this.SEARCH_NOT_FOUND).then(() => {
          this.getLoisEvolutionTypePersonnelFromDatabase();
        });
      }
    }
  }
}


