import { Injectable } from '@angular/core';
import {LoiEvolutionTypePersonnel} from "../../model/evolution/loi-evolution-type-personnel.model";
import {EvolutionPersonnel} from "../../model/evolution/evolution-personnel.model";
import Swal from "sweetalert2";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EvolutionPersonnelService {


  public url = 'http://localhost:8099/evolution/evolution-personnel/';
  public evolutionPersonnel = new EvolutionPersonnel('',null,'','',null,null,'');
  public evolutionsPersonnel = new Array<EvolutionPersonnel>();


  constructor(private http:HttpClient) {
    this.getEvolutionsPersonnelFromDatabase();
  }


  public getEvolutionsPersonnelFromDatabase() {
    this.http.get<EvolutionPersonnel>(this.url + 'all').subscribe(
      res => {
        // @ts-ignore
        this.evolutionsPersonnel = res;
      }
    );
  }


  ajouterEvolutionPersonnel() {
    this.http.post(this.url, this.evolutionsPersonnel).subscribe(
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
            text: 'Evolution personnel creee avec succes',
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

  public modifierEvolutionPersonnel(data) {
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
          this.getEvolutionsPersonnelFromDatabase();
          Swal({
            title: 'Succes',
            text: 'Evolution personnel modofiee avec succes',
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

  deleteEvolutionPersonnel(data){
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
          this.getEvolutionsPersonnelFromDatabase();
          Swal({
            title: 'Succes',
            text: 'Evolution personnel supprime avec succes',
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
