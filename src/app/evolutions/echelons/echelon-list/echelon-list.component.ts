import {Component, OnInit} from '@angular/core';
import {EchelonService} from '../../../controller/service/evolutions/echelon.service';
import {Echelon} from "../../../controller/model/evolution/echelon.model";


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

  public get newEchelon() {
    return this.echelonService.newEchelon;
  }

  public set newEchelon(data) {
    this.echelonService.newEchelon = data;
  }

  public get searchInput() {
    return this.echelonService.searchInput;
  }

  public set searchInput(data) {
    this.echelonService.searchInput = data;
  }



  toggleDataToModal(data) {
    // @ts-ignore
    $('#modal').modal('show');
    this.newEchelon = new Echelon(data.reference, data.ordre, data.libelle);
  }

  modifierEchelon() {
    this.echelonService.modifierEchelon(this.newEchelon);
  }

  exit() {
    this.echelonService.getEchelonsFromDatabase();
  }

  supprimerEchelon(data) {
    this.echelonService.supprimerEchelon(data);
  }

  search() {
    this.echelonService.search();
  }

  getAll(){
    this.echelonService.getEchelonsFromDatabase();
  }


}

