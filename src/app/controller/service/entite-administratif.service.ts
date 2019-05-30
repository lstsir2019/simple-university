import {Injectable} from '@angular/core';


import {HttpClient} from '@angular/common/http';
import {EntiteAdministratif} from '../model/entite-administratif.model';
import {SousProjet} from '../model/sous-projet.model';
import Swal from 'sweetalert2';
import {TypeEntiteAdministratif} from '../model/type-entite-administratif.model';
import {Personnel} from '../model/personnel.model';


@Injectable({
  providedIn: 'root'
})
export class EntiteAdministratifService {
  public url = 'http://localhost:9999/entiteAdministratif/entiteAdministratifs/';
  public url2 = 'http://localhost:9999/sousProjet/sousProjets/sousProjetAll/';
  public url3 = 'http://localhost:9999/typeEntiteAdministratif/typeEntiteAdministratifs/typeEntiteAdministratifAll/';
  public url4 = 'http://localhost:9999/entiteAdministratif/entiteAdministratifs/deleteEntiteAdministratif/';
  public url5 = 'http://localhost:9999/entiteAdministratif/entiteAdministratifs/entiteAdministratifAll/';

  private _createEntiteAdministratif: EntiteAdministratif = new EntiteAdministratif('');
  public sousProjetCreate: SousProjet = new SousProjet(0, '');
 public typeEntiteCreate : TypeEntiteAdministratif = new TypeEntiteAdministratif('');
  public _listEntiteAdministratifs : Array<EntiteAdministratif>;
  public _sousProjetss: Array<SousProjet>;
  public _typeEntiteAdmin : Array<TypeEntiteAdministratif>;
  private _entiteSelected: EntiteAdministratif;
  public entiteSearch : EntiteAdministratif = new  EntiteAdministratif('');
  public listEntiteAdmin = Array<EntiteAdministratif>();



  constructor(private http: HttpClient) {
  }

  public addEntiteAdministratif() {
    const entiteAdministratifClone = new EntiteAdministratif(
      this._createEntiteAdministratif.referenceEntiteAdministratif);
    this._listEntiteAdministratifs.push(entiteAdministratifClone);
  }

  public saveEntiteAdministratif() {
    console.log(this._createEntiteAdministratif.sousProjetVo.referenceSousProjet);
    this.http.post(this.url, this._createEntiteAdministratif).subscribe(
      data => {

        if (data == 1) {
          console.log('entite creer avec success');
          Swal.fire('Informations', 'Entite administratif ajouter avec success', 'success');
          this._createEntiteAdministratif = new EntiteAdministratif('');
          this.sousProjetCreate = new SousProjet(0, '');
          this.findAll();
        }
        else if (data == -1) {
          Swal.fire('Informations', 'Entite administratif existe déja ', 'error');
          this.findAll();
        }
        else if (data == -2) {
          Swal.fire('Erreur', 'Sous projet existe déja ', 'error');
        }
      }, error => {
        console.log('errooooor');
      });
  }

  public findAll() {

    this.http.get<Array<EntiteAdministratif>>(this.url5).subscribe(
      data => {
        this.listEntiteAdmin = data;
      },
      error1 => {
        console.log('error while loading elements...');
      }
    );
  }

  get listEntiteAdministratifs(): Array<EntiteAdministratif> {
    return this.listEntiteAdmin;
  }

  findEntiteAdmin(){
    this.http.get<Array<EntiteAdministratif>>(this.url).subscribe(
      data => {
        this.listEntiteAdmin = data;
      }, error => {
        console.log('error---->');
      }
    );
  }

  set listEntiteAdministratifs(value: EntiteAdministratif[]) {
    this.listEntiteAdmin = value;
  }

  public findallSousProjets() {

    this.http.get<Array<SousProjet>>(this.url2).subscribe(
      data => {
        this._sousProjetss = data;
      }, error => {
        console.log('error whith loading sousProjets');
      }
    );

  }

  public findallTypeEntite() {

    this.http.get<Array<TypeEntiteAdministratif>>(this.url3).subscribe(
      data => {
        this._typeEntiteAdmin= data;
      }, error => {
        console.log('error whith loading type entite Admin');
      }
    );

  }


  public findallEntite() {

    this.http.get<Array<EntiteAdministratif>>(this.url5).subscribe(
      data => {
        this._listEntiteAdministratifs = data;
      }, error => {
        console.log('error list Entite Administratif');
      }
    );

  }

  public deleteEntite(entite: EntiteAdministratif) {
    this.entiteSelected = entite;
    if (this.entiteSelected != null) {
      console.log(this.url4 + this.entiteSelected.referenceEntiteAdministratif);
      this.http.delete<EntiteAdministratif>(this.url4 + this.entiteSelected.referenceEntiteAdministratif).subscribe(error => {

        console.log('Deleted Entite administratif  with poste = ' + this.entiteSelected.referenceEntiteAdministratif + '' + error);
        this.findAll();
      });
      const index: number = this._listEntiteAdministratifs.indexOf(entite);

    }

  }




  public rechercheEntite(){

    this.http.post<Array<EntiteAdministratif>>("http://localhost:9999/entiteAdministratif/entiteAdministratifs/chercherEntite",this.entiteSearch).subscribe(
      data=>{
        if (data ==null){
          Swal.fire('Information','Entite administratif Introuvable','error');
        }else{
          this.listEntiteAdmin = data;
          console.log( " ha daaaata  "+data);
          console.log(this.entiteSearch)
          Swal.fire('Information','Entités administratifs trouvé','success');
        }

      },error1 => {
        console.log(error1);
      }
    );
  }

  get entiteSelected(): EntiteAdministratif {
    return this._entiteSelected;
  }

  set entiteSelected(value: EntiteAdministratif) {
    this._entiteSelected = value;
  }


//  public UpdateEtudiant(){
  //   this.http.post(this.url+"update/",this.etudiantCreate).subscribe(
  //    data=>{
  //      console.log("succes"+this.etudiantCreate.nom);

  //   },error1 => {
  //     console.log("eroor")
  //  })}


  get createEntiteAdministratif(): EntiteAdministratif {
    return this._createEntiteAdministratif;
  }

  set createEntiteAdministratif(value: EntiteAdministratif) {
    this._createEntiteAdministratif = value;
  }

}

