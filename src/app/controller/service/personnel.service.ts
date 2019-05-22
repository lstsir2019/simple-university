import {Injectable} from '@angular/core';
import {Personnel} from '../model/personnel.model';
import {TypePersonnel} from '../model/type-personnel.model';
import {HttpClient} from '@angular/common/http';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class PersonnelService {


  public url = 'http://localhost:9999/personnel/personnels/';
  public url2 = 'http://localhost:9999/personnel/personnels/personnelAll/';
  public url3 = 'http://localhost:9999/personnel/personnels/deletePersonnel/';
  public url4 = 'http://localhost:9999/personnel/personnels/cin/';
  public url5 = 'http://localhost:9999/typePersonnel/typePersonnels/typePersonnelAll/';
  public url6 = 'http://localhost:9999/personnel/personnels/updatePersonnel/';

  public personnelCreate: Personnel = new Personnel('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  public personnelToUpdate: Personnel = new Personnel('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  public typePersonnelCreate: TypePersonnel = new TypePersonnel('');


  private _personnelSelected: Personnel;
  public pSelected: Personnel = new Personnel('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  public listPers: Array<Personnel>;
  public listTypePersonnels: Array<TypePersonnel>;

  constructor(private http: HttpClient) {
  }

  public addPersonnel() {
    const personnelClone = new Personnel(this.personnelCreate.nom, this.personnelCreate.prenom,
      this.personnelCreate.dateNaissance, this.personnelCreate.etatSocial, this.personnelCreate.cin, this.personnelCreate.numeroLocation,
      this.personnelCreate.lieuNaissance, this.personnelCreate.nombreEnfants, this.personnelCreate.lieuAffectation, this.personnelCreate.dateExerciceEchelle,
      this.personnelCreate.grade, this.personnelCreate.dateActivation, this.personnelCreate.dateAccesFonctionPublique, this.personnelCreate.dateDebutTypePersonnel,
      this.personnelCreate.referenceEchelle, this.personnelCreate.referenceEchelon);
    this.listPers.push(personnelClone);
  }

  public savePersonnel() {
    this.http.post(this.url, this.personnelCreate).subscribe(
      data => {
        if (data == 1) {
          Swal.fire('Informations', 'Personnel ajouter avec success', 'success');
          console.log('personnel ajouter avec success');
          this.personnelCreate = new Personnel('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
          this.typePersonnelCreate = new TypePersonnel('');
          this.findAll();
        }
        else if (data == -1) {
          Swal.fire('Informations', 'CIN existe déja ', 'error');

        }
        else {
          Swal.fire('Erreur', 'Personnel creation erreur ', 'error');

        }
      }, error => {
        console.log('error ajouter personnel  ');

      });
  }

  public findAll() {

    this.http.get<Array<Personnel>>(this.url2).subscribe(
      data => {
        this.listPers = data;
      },
      error => {
        console.log('error find all personnel');
      }
    );
  }

  set listPersonnels(value: Personnel[]) {
    this.listPers = value;
  }

  get listPersonnels(): Array<Personnel> {
    return this.listPers;
  }

  findPersonels() {
    this.http.get<Array<Personnel>>(this.url2).subscribe(
      data => {
        this.listPers = data;
        console.log('find list personnel');

      }, error => {
        console.log('error list personnel');
      }
    );
  }


  public deletePersonnel(personnel: Personnel) {
    this.personnelSelected = personnel;
    if (this.personnelSelected != null) {
      console.log(this.url3 + this.personnelSelected.cin);
      this.http.delete<Personnel>(this.url3 + this.personnelSelected.cin).subscribe(error => {
        Swal.fire('Informations', 'Personnel supprimer avec success', 'success');
        console.log('Deleted Personnel  with cin = ' + this.personnelSelected.cin + '' + error);
        this.findAll();
      });
      const index: number = this.listPers.indexOf(personnel);

    }

  }


  get personnelSelected(): Personnel {
    return this._personnelSelected;
  }

  set personnelSelected(value: Personnel) {
    this._personnelSelected = value;
  }


  public findByCin(personnel: Personnel) {
    this.personnelSelected = personnel;
    if (this.personnelSelected != null) {
      console.log(this.url4 + this.personnelSelected.cin);
      this.http.get<Personnel>(this.url4 + this.personnelSelected.cin).subscribe(
        data => {
          this.pSelected = data;
          console.log(this.pSelected);
        }, error => {
          console.log('Error' + error);
        }
      );
    }
  }


  public findallTypePersonnel() {

    this.http.get<Array<TypePersonnel>>(this.url5).subscribe(
      data => {
        this.listTypePersonnels = data;
      }, error => {
        console.log('error list Type Personnel');
      }
    );

  }


  public upDatePersonnel() {
    this.http.put<Personnel>(this.url6, this.personnelSelected).subscribe(
      data => {
        this.personnelSelected = data;

        this.personnelToUpdate.nom = data.nom;
        this.personnelToUpdate.prenom = data.prenom;
        this.personnelToUpdate.cin = data.cin;
        this.personnelToUpdate.dateActivation = data.dateActivation;
        this.personnelToUpdate.dateDebutTypePersonnel = data.dateDebutTypePersonnel;
        this.personnelToUpdate.dateAccesFonctionPublique = data.dateAccesFonctionPublique;
        this.personnelToUpdate.dateExerciceEchelle = data.dateExerciceEchelle;
        this.personnelToUpdate.dateNaissance = data.dateNaissance;
        this.personnelToUpdate.grade = data.grade;
        this.personnelToUpdate.referenceEchelon = data.referenceEchelon;
        this.personnelToUpdate.referenceEchelon = data.referenceEchelon;
        this.personnelToUpdate.referenceEchelle = data.referenceEchelle;
        this.personnelToUpdate.lieuNaissance = data.lieuNaissance;
        this.personnelToUpdate.etatSocial = data.etatSocial;
        this.personnelToUpdate.nombreEnfants = data.nombreEnfants;
        this.personnelToUpdate.lieuAffectation = data.lieuAffectation;
        this.personnelToUpdate.numeroLocation = data.numeroLocation;
        this.personnelToUpdate.typePersonnelVo.libelle = data.typePersonnelVo.libelle;


      }, error => {
        console.log('Error' + error);
        //Swal.fire(this.SWAL.ERROR_UNKNOWN_ERROR);
      }
    );
  }


}

