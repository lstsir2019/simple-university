import { Component, OnInit } from '@angular/core';
import {LoiEvolutionTypePersonnelService} from "../../../controller/service/evolutions/loi-evolution-type-personnel.service";
import {EchelonService} from "../../../controller/service/evolutions/echelon.service";
import {LoiEvolutionService} from "../../../controller/service/evolutions/loi-evolution.service";

@Component({
  selector: 'app-loi-evolution-type-personnel-create',
  templateUrl: './loi-evolution-type-personnel-create.component.html',
  styleUrls: ['./loi-evolution-type-personnel-create.component.css']
})
export class LoiEvolutionTypePersonnelCreateComponent implements OnInit {

  constructor(public loiEvolutionTypePersonnelService:LoiEvolutionTypePersonnelService, public echelonService:EchelonService, public loiEvolutionService:LoiEvolutionService) { }

  ngOnInit() {
  }

  public get echelons(){
    return this.echelonService.echelons;
  }

  public get loisEvolution(){
    return this.loiEvolutionService.loisEvolution;
  }

  public  get loiEvolutionTypePersonnel(){
    return this.loiEvolutionTypePersonnelService.loiEvolutionTypePersonnel;
  }

  ajouterLoiEvolutionTypePersonnel(){
    this.loiEvolutionTypePersonnelService.ajouterLoiEvolutionPersonnel();
  }

}
