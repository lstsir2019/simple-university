import {Component, OnInit} from '@angular/core';
import {EchelleService} from '../../../controller/service/evolutions/echelle.service';
import {EchelonService} from '../../../controller/service/evolutions/echelon.service';
import {Echelon} from "../../../controller/model/evolution/echelon.model";

@Component({
  selector: 'app-echelle-create',
  templateUrl: './echelle-create.component.html',
  styleUrls: ['./echelle-create.component.css']
})
export class EchelleCreateComponent implements OnInit {

  constructor(public echelleService: EchelleService, public echelonService: EchelonService) {
  }

  ngOnInit() {
  }

  public get echelons() {
    return this.echelonService.echelons;
  }

  public get echelle() {
    return this.echelleService.echelle;
  }

  public ajouterEchelle() {
    // this.echelleService.ajouterEchelle();
  console.log(this.echelle)
  }



}
