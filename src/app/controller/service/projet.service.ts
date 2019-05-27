import { Injectable } from '@angular/core';
import {Projet} from '../model/projet.model';
import {SousProjet} from '../model/sous-projet.model';
import {HttpClient} from '@angular/common/http';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private url = 'http://localhost:9999/projet/projets/';
  private url2 = 'http://localhost:9999/projet/projets/projetAll/';
  private url3 = 'http://localhost:9999/sousProjet/sousProjets/libelleProjet/';
  private url4 = 'http://localhost:9999/projet/projets/deleteProjet/';
  private url5 = 'http://localhost:9999/sousProjet/sousProjets/deleteSousProjetById/';
  private _projetCreate: Projet = new Projet('');
  private _sousProjetCreate: SousProjet = new SousProjet(0,'');
  private _projets: Array<Projet>;
  private _sousProjets: Array<SousProjet>;
  private _projetSelected: Projet;
  private _sousProjetSelected: SousProjet;
   private _projet: Projet = new Projet('');
  constructor( private http: HttpClient) { }



  public addSousProjet() {
    const sousProjetClone = new SousProjet(this.sousProjetCreate.id,this.sousProjetCreate.referenceSousProjet);
    this.projetCreate.sousProjetsVo.push(sousProjetClone);
  }
  public saveProjet() {
    this.http.post<number>(this.url , this.projetCreate).subscribe(
      data => {
        if (data == -1) {
          Swal.fire('Error','Projet existe déja','error');
        console.log('ok');
      }else if(data == 1) {
          Swal.fire('Informations','Projet et sous projet ajouter avec success','success');
          this.projetCreate = new Projet('');
          this.sousProjetCreate = new SousProjet(0,'');
          this.findAll();
        }else if(data == -2){
          Swal.fire('Error','Erro ','error');
        }


      }, error => {
        console.log('error');
      }
    );
      }

  public findAll() {
    this.http.get<Array<Projet>>(this.url2).subscribe(
      data => {
        this._projets = data;
        console.log('ok');
      }, error => {
        console.log('error 1');
      }
    );
  }

  public findSousProjet() {

    if (this.projetCreate != null) {
      console.log(this.url3+ this._projetCreate.libelleP + "/sous-projet");
      this.http.get<Array<SousProjet>>(this.url3+ this._projetCreate.libelleP + "/sous-projet").subscribe(
        data => {
          if (data == null) {
            Swal.fire('Error','Projet introuvable ' ,'error');
          console.log(data);

          }else{
            this._projetCreate.sousProjetsVo = data;
          }
        }, error => {
          console.log(error);
        }
      );
    }
  }

  public findSousProjetByLibelleProjet(projet: Projet) {
    this._projetSelected = projet;
    if (this.projetSelected != null) {

    this.http.get<Array<SousProjet>>(this.url3  + this.projetSelected.libelleP + "/sous-projet").subscribe(
      data => {
        this._projetSelected.sousProjetsVo = data;
        console.log('ok');
      }, error => {
        console.log('error sous projets');
      }
    );
    }
  }

  get projets(): Array<Projet> {
    return this._projets;
  }
  findProjet(){
    this.http.get<Array<Projet>>( this.url2).subscribe(
      data => {
        this._projets = data;
      }, errorrr => {
        console.log('error**');
      }
    );
  }


  set projets(value: Array<Projet>) {
    this._projets = value;
  }


  public deleteProjet(projet: Projet) {
    this.projetSelected = projet;
    if (this.projetSelected != null) {
      console.log(this.url4 + this.projetSelected.libelleP );
      this.http.delete<Projet>(this.url4 + this.projetSelected.libelleP ).subscribe(error => {

          Swal.fire('Informations','Projet et sous projet supprimer avec success','success');
        console.log('Deleted projet  with libelleP = ' + this.projetSelected.libelleP + '' + error);
        this.findAll();
        this.projetSelected.sousProjetsVo = [];
      });
      const index: number = this._projets.indexOf(projet);

    }

  }


  public deleteSousProjet(sousProjet: SousProjet) {
    this.sousProjetSelected = sousProjet;
    if (this.sousProjetSelected != null) {
      console.log(this.url5 + this.sousProjetSelected.id);
      this.http.delete<SousProjet>(this.url5 + this.sousProjetSelected.id).subscribe(error => {

        Swal.fire('Informations','Sous projet supprimer avec success','success');
        console.log('Deleted sous projet  with id sous projet = ' + this.sousProjetSelected.id + '' + error);
        

      });
      const index: number = this._sousProjets.indexOf(sousProjet);

    }

  }

  public printProjet(libelleP :string){
    const httpOptions = {

      responseType  : 'blob' as 'json'
    };
    return this.http.get("http://localhost:9999/projet/projets/projet/"+libelleP +"/pdf",httpOptions).subscribe((resultBlob: Blob) => {
      console.log("http://localhost:9999/personnel/personnels/personnel/"+libelleP +"/pdf");
      var downloadURL = URL.createObjectURL(resultBlob);
      window.open(downloadURL);});
  }











  get projet(): Projet {
    return this._projet;
  }

  set projett(value: Projet) {
    this._projet = value;
  }

/*  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }*/

  get projetCreate(): Projet {
    return this._projetCreate;
  }

  set projetCreate(value: Projet) {
    this._projetCreate = value;
  }

  get sousProjetCreate(): SousProjet {
    return this._sousProjetCreate;
  }

  set sousProjetCreate(value: SousProjet) {
    this._sousProjetCreate = value;
  }


  get projetSelected(): Projet {
    return this._projetSelected;
  }

  set projetSelected(value: Projet) {
    this._projetSelected = value;
  }


  get sousProjetSelected(): SousProjet {
    return this._sousProjetSelected;
  }

  set sousProjetSelected(value: SousProjet) {
    this._sousProjetSelected = value;
  }
}

