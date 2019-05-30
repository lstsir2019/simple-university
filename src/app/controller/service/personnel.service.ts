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
  public url6 = 'http://localhost:9999/personnel/personnels/updatePersonnel';

  public personnelCreate: Personnel = new Personnel('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  public personnelToUpdate: Personnel = new Personnel('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  public typePersonnelCreate: TypePersonnel = new TypePersonnel('');
  private _personnelSelected: Personnel;
  public pSelected: Personnel = new Personnel('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  public listPers: Array<Personnel>;
  public listTypePersonnels: Array<TypePersonnel>;
  public personnelSearch : Personnel = new Personnel('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  public listPersonnel : Array<Personnel>;
  public _listPersonnels: Array<Personnel>;

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
        this._listPersonnels = data;
      },
      error => {
        console.log('error find all personnel');
      }
    );
  }


  set listPersonnels(value: Personnel[]) {
    this.listPersonnel = value;
  }

  get listPersonnels(): Array<Personnel> {
    return this.listPersonnel;
  }

  findPersonels() {
    this.http.get<Array<Personnel>>(this.url2).subscribe(
      data => {
        this.listPersonnel = data;
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
    this.http.put<number>(this.url6, this.personnelSelected).subscribe(
      data => {
        if(data == 1){
          Swal.fire('Informations', ' update Personnel avec success', 'success');
          console.log( " ha data dyali "+ data);
        }else{
          Swal.fire('Informations', ' no update', 'error');
        }
      }, error => {
        console.log('Error' + error);
        //Swal.fire(this.SWAL.ERROR_UNKNOWN_ERROR);
      }
    );
  }

  public printPersonnel(cin :string){
    const httpOptions = {

      responseType  : 'blob' as 'json'
    };
    return this.http.get("http://localhost:9999/personnel/personnels/personnel/"+cin +"/pdf",httpOptions).subscribe((resultBlob: Blob) => {
      console.log("http://localhost:9999/personnel/personnels/personnel/"+cin +"/pdf");
      var downloadURL = URL.createObjectURL(resultBlob);
      window.open(downloadURL);});
  }



  public recherchePersonnel(){

    this.http.post<Array<Personnel>>("http://localhost:9999/personnel/personnels/chercherPersonnel",this.personnelSearch).subscribe(
      data=>{
        if (data ==null){
          Swal.fire('Information','Personnel Introuvable','error');
        }else{
          this.listPersonnel = data;
          console.log( " ha daaaata  "+data);
          console.log(this.personnelSearch)
          Swal.fire('Information','Personnels trouvé','success');
        }

      },error1 => {
        console.log(error1);
      }
    );
  }



  get personnelSelected(): Personnel {
    return this._personnelSelected;
  }

  set personnelSelected(value: Personnel) {
    this._personnelSelected = value;
  }

}

