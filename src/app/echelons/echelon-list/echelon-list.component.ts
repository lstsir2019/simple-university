import {Component, OnInit} from '@angular/core';
import {EchelonService} from '../../controller/service/echelon.service';


@Component({
    selector: 'app-echelon-list',
    templateUrl: './echelon-list.component.html',
    styleUrls: ['./echelon-list.component.css']
})
export class EchelonListComponent implements OnInit {


    constructor(public echelonService: EchelonService) {
    }

    ngOnInit() {
    }

    public get echelons() {
        return this.echelonService.echelons;
    }

    public get newEchelon(){
        return this.echelonService.newEchelon;
    }

    public set newEchelon(data){
        this.echelonService.newEchelon = data;
    }

    toggleDataToModal(data){
        // @ts-ignore
        $('#modal').modal('show');
        this.newEchelon = data;
    }

    modifierEchelon(){
        this.echelonService.modifierEchelon(this.newEchelon);
    }

    exit(){
        this.echelonService.getEchelonsFromDatabase();
    }
    supprimerEchelon(data){
        this.echelonService.supprimerEchelon(data);
    }


}

