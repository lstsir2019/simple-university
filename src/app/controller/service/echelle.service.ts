import {Injectable} from '@angular/core';
import {Echelle} from '../model/echelle.model';

@Injectable({
    providedIn: 'root'
})
export class EchelleService {

    public url = 'http://localhost:8099/evolution/echelon/';
    public echelle: Echelle = new Echelle('', '', 0, '', null, '');

    constructor() {
    }

    ajouterEchelle(data) {
        console.log(data);
    }
}
