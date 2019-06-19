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
  public url7 = 'http://localhost:9999/entiteAdministratif/entiteAdministratifs/updateEntiteAdmin';
  public url6 = 'http://localhost:9999/personnel/personnels/personnelAll/';

  private _createEntiteAdministratif: EntiteAdministratif = new  EntiteAdministratif(0,'');
  public sousProjetCreate: SousProjet = new SousProjet(0, '');
  public personelCreate: Personnel =  new Personnel(0,'','','','','','','','','','','','','','','','');
 public typeEntiteCreate : TypeEntiteAdministratif = new TypeEntiteAdministratif('');
  public _listEntiteAdministratifs : Array<EntiteAdministratif>;
  public _sousProjetss: Array<SousProjet>;
  public _typeEntiteAdmin : Array<TypeEntiteAdministratif>;
  public _listPersonnel : Array<Personnel>;
  private _entiteSelected: EntiteAdministratif;
  public entiteSearch : EntiteAdministratif = new  EntiteAdministratif(0,'');
  public listEntiteAdmin = Array<EntiteAdministratif>();
  public  entiteAdministratifToUpdate : EntiteAdministratif = new  EntiteAdministratif(0,'');


  constructor(private http: HttpClient) {
  }

  public addEntiteAdministratif() {
    const entiteAdministratifClone = new EntiteAdministratif(this._createEntiteAdministratif.id,
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
          this._createEntiteAdministratif = new  EntiteAdministratif(0,'');
          this.sousProjetCreate = new SousProjet(0, '');
          this.personelCreate =  new Personnel(0,'','','','','','','','','','','','','','','','');
          console.log('if data ==1  ha data =====>' + data);
          this.findAll();
        }
        else if (data == -1) {
          Swal.fire('Informations', 'Entite administratif existe déja ', 'error');
          console.log('if data == -1  ha data =====>' + data);
          this.findAll();
        }
        else if (data == -2) {
          console.log('if data == -2  ha data =====>' + data);
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
  public findallPersonnel() {

    this.http.get<Array<Personnel>>(this.url6).subscribe(
      data => {
        this._listPersonnel = data;
      }, error => {
        console.log('error listPersonnel');
      }
    );

  }

  public deleteEntite(entite: EntiteAdministratif) {
    this.entiteSelected = entite;
    if (this.entiteSelected != null) {
      console.log(this.url4 + this.entiteSelected.referenceEntiteAdministratif);
      this.http.delete<EntiteAdministratif>(this.url4 + this.entiteSelected.referenceEntiteAdministratif).subscribe(error => {
        Swal.fire('Information','Entités administratifs supprimer avec succes','success');
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


  public setEntiteSelect(entiteAdmin: EntiteAdministratif) {
    let entiteClone:EntiteAdministratif = new EntiteAdministratif(
      entiteAdmin.id,
      entiteAdmin.referenceEntiteAdministratif,
    );
    this.entiteAdministratifToUpdate = entiteClone;
    this.entiteSelected.typeEntiteAdministratifVo.libelle = entiteAdmin.typeEntiteAdministratifVo.libelle;
    this.entiteSelected.sousProjetVo=entiteAdmin.sousProjetVo;
    this.entiteSelected.chefVo = entiteAdmin.chefVo;
    this.entiteSelected = entiteAdmin;

  }


  public upDateEntite() {

    this.http.put(this.url7, this.entiteAdministratifToUpdate).subscribe(

      data => {
        console.log("debut data  " + data);

        if(data == 1 ){
          Swal.fire('Informations', ' Modification entité adminstrative  avec success', 'success');
          this.findAll();
        }else{
          Swal.fire('Error', ' Probleme update', 'error');
        }
      }, error => {
        console.log('Error' + error);
        //Swal.fire(this.SWAL.ERROR_UNKNOWN_ERROR);
      }
    );
  }


  public printEntite(referenceEntiteAdministratif :string){
    const httpOptions = {

      responseType  : 'blob' as 'json'
    };
    return this.http.get("http://localhost:9999/entiteAdministratif/entiteAdministratifs/entite/"+referenceEntiteAdministratif +"/pdf",httpOptions).subscribe((resultBlob: Blob) => {
      console.log("http://localhost:9999/entiteAdministratif/entiteAdministratifs/entite/"+referenceEntiteAdministratif +"/pdf");
      var downloadURL = URL.createObjectURL(resultBlob);
      window.open(downloadURL);});
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

