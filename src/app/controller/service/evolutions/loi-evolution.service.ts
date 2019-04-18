import {Injectable} from '@angular/core';
import {LoiEvolution} from "../../model/evolution/loi-evolution.model";
import Swal from 'sweetalert2';
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {getReact} from "./Util/SwalReact";

@Injectable({
  providedIn: 'root',

})
export class LoiEvolutionService {

  private _url = 'http://localhost:8099/evolution/loi/';
  private _loiEvolution = new LoiEvolution('', '', '', '');
  private _loisEvolution = new Array<LoiEvolution>();
  private _searchInput: string;

  private SWAL_REACT = getReact('Loi d\'evolution personnel', true);
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

  constructor(private http: HttpClient, private datePipe: DatePipe) {
    this.getLoisEvolutionsFromDatabase();
  }


  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get loiEvolution(): LoiEvolution {
    return this._loiEvolution;
  }

  set loiEvolution(value: LoiEvolution) {
    this._loiEvolution = value;
  }

  get loisEvolution(): LoiEvolution[] {
    return this._loisEvolution;
  }

  set loisEvolution(value: LoiEvolution[]) {
    this._loisEvolution = value;
  }

  get searchInput(): string {
    return this._searchInput;
  }

  set searchInput(value: string) {
    this._searchInput = value;
  }

  public getLoisEvolutionsFromDatabase() {
    this.http.get<Array<LoiEvolution>>(this._url).subscribe(res => this._loisEvolution = res)
  }

  public ajouterLoiEvolution() {
    this._loiEvolution.dateDebut = this.datePipe.transform(this._loiEvolution.dateDebut, 'dd-MM-yyyy');
    this._loiEvolution.dateFin = this.datePipe.transform(this._loiEvolution.dateFin, 'dd-MM-yyyy');
    this.http.post(this._url, this._loiEvolution).subscribe(
      (res) => {
        if (res == -1) {
          Swal(this.ERROR_NOT_ENOUGH_DATA);
        } else if (res == -2) {
          Swal(this.ERROR_REF_ALREADY_EXISTS);
        } else if (res == 1) {
          this.getLoisEvolutionsFromDatabase();
          Swal(this.SUCCESS_SUCCESS_CREATE);
        } else {
          Swal(this.ERROR_UNKNOWN_ERROR);
        }
      });
  }

  public modifierLoiEvolution(data) {
    data.dateDebut = this.datePipe.transform(data.dateDebut, 'dd-MM-yyyy');
    data.dateFin = this.datePipe.transform(data.dateFin, 'dd-MM-yyyy');
    this.http.put(this._url , data).subscribe(
      (res) => {
        if (res == -1) {
          Swal(this.ERROR_NOT_ENOUGH_DATA);
        } else if (res == -2) {
          Swal(this.ERROR_REF_ALREADY_EXISTS);
        } else if (res == 1) {
          Swal(this.SUCCESS_SUCCESS_EDIT);
        } else {
          Swal(this.ERROR_UNKNOWN_ERROR);
        }
      });
  }

  deleteLoiEvolution(data) {
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
                this.getLoisEvolutionsFromDatabase();
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
      this.loisEvolution = this.loisEvolution.filter(echelon => echelon.reference.includes(this.searchInput));
      if (this.loisEvolution === undefined || this.loisEvolution.length == 0) {
        Swal(this.SEARCH_NOT_FOUND).then(() => {
          this.getLoisEvolutionsFromDatabase();
        });
      }
    }
  }
}
