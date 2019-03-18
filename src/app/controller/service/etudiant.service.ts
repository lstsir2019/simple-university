import { Injectable } from '@angular/core';
import {Etudiant} from '../model/etudiant.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  public url:string="http://localhost:8099/inscription/etudiants/  ";
  public etudiantCreate: Etudiant = new Etudiant("","","","","","","","");

  private _listEtudiants=Array<Etudiant>();
  constructor(private http: HttpClient){
  }

  public addEtudiant() {
    let etudiantClone = new Etudiant(this.etudiantCreate.cne,this.etudiantCreate.cin,this.etudiantCreate.nom,this.etudiantCreate.prenom,this.etudiantCreate.tel,this.etudiantCreate.email,this.etudiantCreate.typeDiplome,this.etudiantCreate.niveauDetudes);
    this._listEtudiants.push(etudiantClone);
  }
  public saveEtudiant(){
    this.http.post<Etudiant>(this.url,this.etudiantCreate).subscribe(
      data=>{
        console.log("ok");
        this.etudiantCreate =new Etudiant("","","","","","","","");
      },error=>{
        console.log("errooooor");
      });
  }

  public findAll(){

    this.http.get<Array<Etudiant>>(this.url).subscribe(
      data => {
        this._listEtudiants = data;
      },
      error1 => {
        console.log('error while loading elements...');
      }
    );
  }
  set listEtudiants(value: Etudiant[]) {
    this._listEtudiants = value;
  }
  get listEtudiants(): Array<Etudiant> {
    if(this._listEtudiants==null){
      this._listEtudiants=new Array<Etudiant>();
    }
    return this._listEtudiants;
  }

}
