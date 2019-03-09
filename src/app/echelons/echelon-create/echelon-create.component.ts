import {Component, OnInit} from '@angular/core';
import {EchelonService} from '../../controller/service/echelon.service';

@Component({
    selector: 'app-echelon-create',
    templateUrl: './echelon-create.component.html',
    styleUrls: ['./echelon-create.component.css']
})
export class EchelonCreateComponent implements OnInit {


    constructor(public echelonService: EchelonService) {
    }

    ngOnInit() {
    }

    public get echelon() {
        return this.echelonService.echelon;
    }

    public ajouterEchelon() {
        this.echelonService.ajouterEchelon();
    }
}
