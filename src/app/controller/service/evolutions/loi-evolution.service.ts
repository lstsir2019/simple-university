import {Injectable} from '@angular/core';
import {LoiEvolution} from "../../model/evolution/loi-evolution.model";
import Swal from 'sweetalert2';
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root',

})
export class LoiEvolutionService {

  public url = 'http://localhost:8099/evolution/loi/';
  public loiEvolution = new LoiEvolution('', '', '', '');
  public loisEvolution = new Array<LoiEvolution>();
  public loiEvolutionToEdit = new LoiEvolution('', '', '', '');

  constructor(private http:HttpClient, private datePipe: DatePipe) {
    this.getLoisEvolutionsFromDatabase();
  }

  public getLoisEvolutionsFromDatabase(){
    this.http.get<Array<LoiEvolution>>(this.url+"all").subscribe(res => this.loisEvolution = res)
  }

  public ajouterLoiEvolution() {
    this.loiEvolution.dateDebut = this.datePipe.transform(this.loiEvolution.dateDebut, 'dd-MM-yyyy');
    this.loiEvolution.dateFin = this.datePipe.transform(this.loiEvolution.dateFin, 'dd-MM-yyyy');
    this.http.post(this.url, this.loiEvolution).subscribe(
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
          this.getLoisEvolutionsFromDatabase();
          Swal({
            title: 'Succes',
            text: 'Loi evolution creee avec succes',
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

  public modifierLoiEvolution(data) {
    data.dateDebut = this.datePipe.transform(data.dateDebut, 'dd-MM-yyyy');
    data.dateFin = this.datePipe.transform(data.dateFin, 'dd-MM-yyyy');
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
          Swal({
            title: 'Succes',
            text: 'Loi evolution modofiee avec succes',
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

  deleteLoiEvolution(data){
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
          this.getLoisEvolutionsFromDatabase();
          Swal({
            title: 'Succes',
            text: 'Loi evolution supprime avec succes',
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
