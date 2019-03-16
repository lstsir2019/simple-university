import {Injectable} from '@angular/core';
import {LoiEvolutionTypePersonnel} from "../../model/evolution/loi-evolution-type-personnel.model";
import Swal from "sweetalert2";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoiEvolutionTypePersonnelService {

  public url = 'http://localhost:8099/evolution/loi/loi-type-personnel/';
  public loiEvolutionTypePersonnel = new LoiEvolutionTypePersonnel('', '', null, null, 0, null);
  public loisEvolutionTypePersonnel = new Array<LoiEvolutionTypePersonnel>();

  constructor(private http: HttpClient) {
    this.getLoisEvolutionTypePersonnelFromDatabase();
  }

  public getLoisEvolutionTypePersonnelFromDatabase() {
    this.http.get<LoiEvolutionTypePersonnel>(this.url + 'all').subscribe(
      res => {
        // @ts-ignore
        this.loisEvolutionTypePersonnel = res;
      }
    );
  }


  ajouterLoiEvolutionPersonnel() {
    this.http.post(this.url, this.loiEvolutionTypePersonnel).subscribe(
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
          Swal({
            title: 'Succes',
            text: 'Loi evolution type personnel creee avec succes',
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

  public modifierLoiEvolutionTypePersonnel(data) {
    this.http.put(this.url+'edit', data).subscribe(
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
            text: 'Reference exist deja',
            type: 'error',
            confirmButtonText: 'ok'
          });
        } else if (res == 1) {
          this.getLoisEvolutionTypePersonnelFromDatabase();
          Swal({
            title: 'Succes',
            text: 'Loi evolution type personnel modofiee avec succes',
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

  deleteLoiEvolutionTypePersonnel(data){
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
          this.getLoisEvolutionTypePersonnelFromDatabase();
          Swal({
            title: 'Succes',
            text: 'Loi evolution type personnel supprime avec succes',
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


