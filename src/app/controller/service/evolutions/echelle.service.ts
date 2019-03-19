import {Injectable} from '@angular/core';
import {Echelle} from "../../model/evolution/echelle.model";
import {HttpClient} from "@angular/common/http";
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EchelleService {

  public url = 'http://localhost:8099/evolution/echelle/';
  public echelle: Echelle = new Echelle('', '', 0, '', null, '');
  public echelles: Array<Echelle>;

  constructor(private http: HttpClient) {
    this.getEchellesFromDatabase();
  }

  ajouterEchelle() {
    this.http.post(this.url, this.echelle).subscribe(
      res => {
        if (res == -1) {
          Swal({
            title: 'Erreur!',
            text: 'Insuffisance de donnees',
            type: 'error',
            confirmButtonText: 'ok'
          });
        } else if (res == -2) {
          Swal({
            title: 'Erreur!',
            text: 'Reference exist deja',
            type: 'error',
            confirmButtonText: 'ok'
          });
        } else if (res == 1) {
          this.echelles.push(this.echelle);
          Swal({
            title: 'Succes',
            text: 'Echelle cree avec succes',
            type: 'success',
            confirmButtonText: 'ok'
          });
        } else {
          Swal({
            title: 'Erreur!',
            text: 'Erreur inconnue',
            type: 'error',
            confirmButtonText: 'ok'
          });
        }
      });
  }


  public getEchellesFromDatabase() {
    this.http.get<Echelle>(this.url + 'all').subscribe(
      res => {
        // @ts-ignore
        this.echelles = res;
      }
    );
  }

  public editEchelle(data){
    this.http.put(this.url + "edit", data).subscribe(
      (res) => {
        if (res == -1) {
          Swal({
            title: 'Erreur!',
            text: 'Insuffisance de donnees',
            type: 'error',
            confirmButtonText: 'ok'
          });
        } else if (res == -2) {
          Swal({
            title: 'Erreur!',
            text: 'Reference n\'existe pas',
            type: 'error',
            confirmButtonText: 'ok'
          });
        } else if (res == 1) {
          this.getEchellesFromDatabase();
          Swal({
            title: 'Succes',
            text: 'Echelle modifie avec succes',
            type: 'success',
            confirmButtonText: 'ok'
          });
        } else {
          Swal({
            title: 'Erreur!',
            text: 'Erreure inconnue',
            type: 'error',
            confirmButtonText: 'ok'
          });
        }
      });
  }

  deleteEchelle(data){
    this.http.delete(this.url + "delete/" + data).subscribe(
      (res) => {
        if (res == -1) {
          Swal({
            title: 'Erreur!',
            text: 'Reference invalide',
            type: 'error',
            confirmButtonText: 'ok'
          });
        } else if (res == -2) {
          Swal({
            title: 'Erreur!',
            text: 'Reference n\'existe pas',
            type: 'error',
            confirmButtonText: 'ok'
          });
        } else if (res == 1) {
          this.getEchellesFromDatabase();
          Swal({
            title: 'Succes',
            text: 'Echelle supprime avec succes',
            type: 'success',
            confirmButtonText: 'ok'
          });
        } else {
          Swal({
            title: 'Erreur!',
            text: 'Erreure inconnue',
            type: 'error',
            confirmButtonText: 'ok'
          });
        }
      });
  }
}
