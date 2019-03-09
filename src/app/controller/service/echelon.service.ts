import {Injectable} from '@angular/core';
import {Echelon} from '../model/echelon.model';
import {HttpClient} from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class EchelonService {
    public url = 'http://localhost:8099/evolution/echelon/';
    public echelon = new Echelon('', 0, '');
    public echelons = new Array<Echelon>();
    public newEchelon = new Echelon('', 0, '');

    // public echelons = new Array<Echelon>();
    constructor(private http: HttpClient) {
        this.getEchelonsFromDatabase();
    }

    public ajouterEchelon() {
        let echelonClone = new Echelon(this.echelon.reference, this.echelon.ordre, this.echelon.libelle);
        this.echelons.push(echelonClone);
        this.http.post(this.url, echelonClone).subscribe(
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
                        text: 'Echelon modifie avec succes',
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

    public getEchelonsFromDatabase() {
        this.http.get<Echelon>(this.url + 'all').subscribe(
            res => {
                // @ts-ignore
                this.echelons = res;
            }
        );
    }

    public modifierEchelon(data) {
        this.http.put(this.url+"edit", data).subscribe(
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
                    Swal({
                        title: 'Succes',
                        text: 'Echelon cree avec succes',
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

    supprimerEchelon(data){
        this.http.delete(this.url+"delete/"+data).subscribe(
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
                    Swal({
                        title: 'Succes',
                        text: 'Echelon supprime avec succes',
                        type: 'success',
                        confirmButtonText: 'ok'
                    });
                    this.getEchelonsFromDatabase();
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
