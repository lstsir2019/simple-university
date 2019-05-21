import { Injectable } from '@angular/core';
import {Responsabilite} from '../model/responsabilite.model';
import {HttpClient} from '@angular/common/http';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class ResponsabiliteService {

  private url = 'http://localhost:9999/responsabilite/responsabilites/';
  private url2 = 'http://localhost:9999/responsabilite/responsabilites/responsabiliteAll/';
  private url3 = 'http://localhost:9999/responsabilite/responsabilites/deleteResponsabilite/';
   public createResponsabilite: Responsabilite = new Responsabilite('');
   private _listResponsabilites = Array<Responsabilite>();
  private _responsabiliteSelected: Responsabilite;

  constructor(private http: HttpClient) { }

  public addResponsabilite() {
    const responsabiliteClone = new Responsabilite(this.createResponsabilite.referenceResponsabilite);
    this._listResponsabilites.push(responsabiliteClone);
  }
  public saveResponsabilite() {
    this.http.post(this.url, this.createResponsabilite).subscribe(
      data => {
          if (data == 1) {

            Swal.fire('Informations','Responsabilite ajouter avec success','success');
        console.log('responsabilite creer');
        this.createResponsabilite = new Responsabilite('');
        this.findAll();

      }  else if(data == -1) {
            Swal.fire('Erreur','Responsabilite existe déja ','error');
            this.findAll();
          }
      }

      , error => {
        console.log('errooooor creation responsabilite');
      });
  }

  public findAll() {

    this.http.get<Array<Responsabilite>>(this.url2).subscribe(
      data => {
        this._listResponsabilites = data;
        console.log("find all responsabilite");

      },
      error1 => {
        console.log('error find all responsabilite');
      }
    );
  }

  get listResponsabilites(): Array<Responsabilite> {
    if (this._listResponsabilites == null) {
      this.http.get<Array<Responsabilite>>(this.url).subscribe(
        data => {
          this._listResponsabilites = data;
        }, error => {
          console.log('error---->');
        }
      );
    }
    return this._listResponsabilites;
  }


  public deleteResponsabilte(responsabilite: Responsabilite) {
    this.responsabiliteSelected = responsabilite;
    if (this.responsabiliteSelected != null) {

      console.log(this.url3 + this.responsabiliteSelected.referenceResponsabilite );
      this.http.delete<Responsabilite>(this.url3 + this.responsabiliteSelected.referenceResponsabilite ).subscribe(error => {
        Swal.fire('Informations','Responsabilite supprimer avec success','success');
        console.log('Deleted Responsabilite  with poste = ' + this.responsabiliteSelected.referenceResponsabilite + '' + error);
        this.findAll();


      });
      const index: number = this._listResponsabilites.indexOf(responsabilite);

    }

  }


  get responsabiliteSelected(): Responsabilite {
    return this._responsabiliteSelected;
  }

  set responsabiliteSelected(value: Responsabilite) {
    this._responsabiliteSelected = value;
  }


/*
  get url():string{
return this.url;
}*/}


