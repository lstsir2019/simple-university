import {Injectable} from '@angular/core';
import {EvolutionPersonnel} from "../../model/evolution/evolution-personnel.model";
import Swal from "sweetalert2";
import {HttpClient} from "@angular/common/http";
import {getReact} from "./Util/SwalReact";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class EvolutionPersonnelService {


  private _url = 'http://localhost:8015/evolution/evolution-personnel/';
  private _evolutionPersonnel = new EvolutionPersonnel('', null, '', '', null, null, '');
  private _newEvolutionPersonnel = new EvolutionPersonnel('', null, '', '', null, null, '');
  private _evolutionsPersonnel = new Array<EvolutionPersonnel>();
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

  constructor(private http: HttpClient, private datePipe: DatePipe) {
    this.getEvolutionsPersonnelFromDatabase();
  }


  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get evolutionPersonnel(): EvolutionPersonnel {
    return this._evolutionPersonnel;
  }

  set evolutionPersonnel(value: EvolutionPersonnel) {
    this._evolutionPersonnel = value;
  }

  get newEvolutionPersonnel(): EvolutionPersonnel {
    return this._newEvolutionPersonnel;
  }

  set newEvolutionPersonnel(value: EvolutionPersonnel) {
    this._newEvolutionPersonnel = value;
  }

  get evolutionsPersonnel(): EvolutionPersonnel[] {
    return this._evolutionsPersonnel;
  }

  set evolutionsPersonnel(value: EvolutionPersonnel[]) {
    this._evolutionsPersonnel = value;
  }

  public getEvolutionsPersonnelFromDatabase() {
    this.http.get<EvolutionPersonnel>(this._url).subscribe(
      res => {
        // @ts-ignore
        this._evolutionsPersonnel = res;
      }
    );
  }

  get searchInput(): string {
    return this._searchInput;
  }

  set searchInput(value: string) {
    this._searchInput = value;
  }

  ajouterEvolutionPersonnel() {
    this._evolutionPersonnel.dateEvolution = this.datePipe.transform(this._evolutionPersonnel.dateEvolution, 'dd-MM-yyyy');
    this.http.post(this._url, this._evolutionPersonnel).subscribe(
      res => {
        if (res == -1) {
          Swal.fire(this.ERROR_NOT_ENOUGH_DATA);
        } else if (res == -2) {
          Swal.fire(this.ERROR_REF_ALREADY_EXISTS);
        } else if (res == 1) {
          this.getEvolutionsPersonnelFromDatabase();
          // @ts-ignore
          Swal.fire(this.SUCCESS_SUCCESS_CREATE);
        } else {
          Swal.fire(this.ERROR_UNKNOWN_ERROR);
        }
      });
  }

  public modifierEvolutionPersonnel(data) {
    data.dateEvolution = this.datePipe.transform(data.dateEvolution, 'dd-MM-yyyy');
    this.http.put(this._url, data).subscribe(
      (res) => {
        if (res == -1) {
          Swal.fire(this.ERROR_NOT_ENOUGH_DATA);
        } else if (res == -2) {
          Swal.fire(this.ERROR_REF_DOES_NOT_EXIST);
        } else if (res == 1) {
          this.getEvolutionsPersonnelFromDatabase();
          Swal.fire(this.SUCCESS_SUCCESS_EDIT);
        } else {
          Swal.fire(this.ERROR_UNKNOWN_ERROR);
        }
      });
  }

  deleteEvolutionPersonnel(data) {
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
                this.getEvolutionsPersonnelFromDatabase();
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
      this.evolutionsPersonnel = this.evolutionsPersonnel.filter(echelon => echelon.reference.includes(this.searchInput));
      if (this.evolutionsPersonnel === undefined || this.evolutionsPersonnel.length == 0) {
        Swal.fire(this.SEARCH_NOT_FOUND).then(() => {
          this.getEvolutionsPersonnelFromDatabase();
        });
      }
    }
  }
}
