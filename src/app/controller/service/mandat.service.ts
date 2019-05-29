import {Injectable} from '@angular/core';
import {Personnel} from '../model/personnel.model';
import {HttpClient} from '@angular/common/http';
import {Mandat} from '../model/mandat.model';
import {Responsabilite} from '../model/responsabilite.model';
import {EntiteAdministratif} from '../model/entite-administratif.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MandatService {
  public url = 'http://localhost:9999/mandat/mandats/';
  public url1 = 'http://localhost:9999/personnel/personnels/personnelAll/';
  public url2 = 'http://localhost:9999/responsabilite/responsabilites/responsabiliteAll/';
  public url3 = 'http://localhost:9999/entiteAdministratif/entiteAdministratifs/entiteAdministratifAll/';
  public url4 = 'http://localhost:9999/mandat/mandats/mandatAll/';

  public mandatCreate: Mandat = new Mandat('', '');
  public _mandat: Mandat = new Mandat('', '');
  public responsabiliteCreate: Responsabilite = new Responsabilite('');
  public entiteAdministratifCreate: EntiteAdministratif = new EntiteAdministratif('');
  public personnelCreate: Personnel = new Personnel('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  public _personnelCreate1: Personnel = new Personnel('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');

  public _listPersonnels: Array<Personnel>;
  public _listResponsabilites: Array<Responsabilite>;
  public _listEntites: Array<EntiteAdministratif>;
  public _listMandats = Array<Mandat>();
  public listM = Array<Mandat>();
  public _mandatSelected: Mandat;
  public mandatSearch : Mandat = new Mandat('','');


  constructor(private http: HttpClient) {
  }

  public addMandat() {
    const mandatClone = new Mandat(this.mandatCreate.dateDebutMandat, this.mandatCreate.dateFinMandat);
    this._listMandats.push(mandatClone);
  }

  public saveMandat() {
    this.http.post(this.url, this.mandatCreate).subscribe(
      data => {
        if (data == 1) {
          Swal.fire('Informations', 'Mandat ajouter avec success', 'success');
          this.personnelCreate = new Personnel('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
          this.responsabiliteCreate = new Responsabilite('');
          this.entiteAdministratifCreate = new EntiteAdministratif('');

          console.log('mandat ajouter avec success');
          this.findAll();
        } else if (data == -1) {
          Swal.fire('Erreur', 'il faut selectionné un personnel ', 'error');
        }
        else if (data == -2) {
          Swal.fire('Erreur', 'il faut selectionné une entite administratif ', 'error');
        } else if (data == -3) {
          Swal.fire('Erreur', 'il faut selectionné une responsabilite', 'error');
        }

      }, error => {
        console.log('error ajouter mandat ');
      });
  }

  public findAll() {

    this.http.get<Array<Mandat>>(this.url4).subscribe(
      data => {
        this.listM = data;
      },
      error1 => {
        console.log('error list mandat');
      }
    );
  }

  set listMandats(value: Mandat[]) {
    this.listM = value;
  }

  get listMandats(): Array<Mandat> {
    return this.listM;
  }

  findMandats() {
    this.http.get<Array<Mandat>>(this.url4).subscribe(
      data => {
        this.listM = data;
      }, error => {
        console.log('error list mandat');
      });
  }


  public findallPersonnel() {

    this.http.get<Array<Personnel>>(this.url1).subscribe(
      data => {
        this._listPersonnels = data;
      }, error => {
        console.log('error listPersonnel');
      }
    );

  }


  public findallResponsabilite() {

    this.http.get<Array<Responsabilite>>(this.url2).subscribe(
      data => {
        this._listResponsabilites = data;
      }, error => {
        console.log('error list Responsabilite');
      }
    );

  }


  public findallEntite() {

    this.http.get<Array<EntiteAdministratif>>(this.url3).subscribe(
      data => {
        this._listEntites = data;
      }, error => {
        console.log('error list Entite Administratif');
      }
    );

  }


  public deleteMandat(mandat: Mandat) {
    this.mandatSelected = mandat;
    if (this.mandatSelected != null) {
      console.log('http://localhost:8090/mandat/mandat/deleteMandat/' + this.mandatSelected.personnelVo.cin);
      this.http.delete<Mandat>('http://localhost:8090/mandat/mandat/deleteMandat/' + this.mandatSelected.personnelVo.cin).subscribe(error => {

        console.log('Deleted Mandat  with personnel cin = ' + this.mandatSelected.personnelVo.cin + '' + error);
        this.findAll();
      });
      const index: number = this._listMandats.indexOf(mandat);

    }

  }


 /* public chercherMandatByPersonnelCin() {

    if (this.mandat != null) {
      console.log('http://localhost:9999/mandat/mandat/chercher/personnel/' + this._mandat.personnelVo.cin + '/entite/' + this._mandat.entiteAdministratifVo.referenceEntiteAdministratif + '/responsabilite/' + this._mandat.responsabiliteVo.referenceResponsabilite);
      this.http.get<Mandat>('http://localhost:9999/mandat/mandat/chercher/personnel/' + this._mandat.personnelVo.cin + '/entite/' + this._mandat.entiteAdministratifVo.referenceEntiteAdministratif + '/responsabilite/' + this._mandat.responsabiliteVo.referenceResponsabilite).subscribe(
        data => {
          console.log(data);
          //this.personnelCreate.cin = data;

        }, error => {
          console.log(error);
        }
      );
    }
  }*/

  public rechercheMandat(){

    this.http.post<Array<Mandat>>("http://localhost:9999/mandat/mandats/chercherMandat",this.mandatSearch).subscribe(
      data=>{
        if (data ==null){
          Swal.fire('Information','Mandat Introuvable','error');
        }else{
        this.listM = data;
        console.log( " ha daaaata  "+data);
        console.log(this.mandatSearch)
          Swal.fire('Information','Mandats trouvé','success');
        }
      },error1 => {
        console.log(error1);
      }
    );
  }

  get mandatSelected(): Mandat {
    return this._mandatSelected;
  }

  set mandatSelected(value: Mandat) {
    this._mandatSelected = value;
  }


  get mandat(): Mandat {
    return this._mandat;
  }

  set mandat(value: Mandat) {
    this._mandat = value;
  }

}
