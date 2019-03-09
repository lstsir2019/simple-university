import {Component, OnInit} from '@angular/core';
import {EchelleService} from '../../controller/service/echelle.service';
import {EchelonService} from '../../controller/service/echelon.service';

@Component({
    selector: 'app-echelle-create',
    templateUrl: './echelle-create.component.html',
    styleUrls: ['./echelle-create.component.css']
})
export class EchelleCreateComponent implements OnInit {

    constructor(public echelleService: EchelleService, public echelonService:EchelonService) {
    }

    ngOnInit() {
    }

    public get echelons(){
        return this.echelonService.echelons;
    }

    public get echelle() {
        return this.echelleService.echelle;
    }

    public ajouterEchelle() {
        this.echelleService.ajouterEchelle(this.echelle);
    }
}
