import {Component, OnInit} from '@angular/core';
import {EchelleService} from "../../../controller/service/evolutions/echelle.service";
import {Echelon} from "../../../controller/model/evolution/echelon.model";
import {Echelle} from "../../../controller/model/evolution/echelle.model";
import {EchelonService} from "../../../controller/service/evolutions/echelon.service";

@Component({
  selector: 'app-echelle-list',
  templateUrl: './echelle-list.component.html',
  styleUrls: ['./echelle-list.component.css']
})
export class EchelleListComponent implements OnInit {

  public selected = new Array<Echelon>();
  public echelleToEdit = new Echelle('', '', 0, '', null, '');

  constructor(private echelleService: EchelleService, private echelonService: EchelonService) {
  }

  ngOnInit() {
  }

  public get echelles() {
    return this.echelleService.echelles;
  }

  public get echelons() {
    return this.echelonService.echelons;
  }

  public get searchInput() {
    return this.echelleService.searchInput;
  }

  public set searchInput(data) {
    this.echelleService.searchInput = data;
  }

  afficherListeEchelons(echelons) {
    // @ts-ignore
    $('#modalListeEchelons').modal('show');
    this.selected = echelons;
  }

  echelleEdit(echelle) {
    // @ts-ignore
    $('#modalEditEchelle').modal('show');
    this.echelleToEdit = new Echelle(echelle.reference, echelle.libelle, echelle.ordre, echelle.description, echelle.echelons, echelle.referenceTypePersonnel);
  }

  modifierEchelle() {
    this.echelleService.editEchelle(this.echelleToEdit);
  }

  supprimerEchelle(data) {
    this.echelleService.deleteEchelle(data);
  }

  search() {
    this.echelleService.search();
  }

  getAll() {
    this.echelleService.getEchellesFromDatabase();
  }
}
