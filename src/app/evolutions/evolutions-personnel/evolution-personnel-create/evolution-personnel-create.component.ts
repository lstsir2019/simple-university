import { Component, OnInit } from '@angular/core';
import {EvolutionPersonnelService} from "../../../controller/service/evolutions/evolution-personnel.service";
import {EchelonService} from "../../../controller/service/evolutions/echelon.service";
import {LoiEvolutionService} from "../../../controller/service/evolutions/loi-evolution.service";
import {LoiEvolutionTypePersonnel} from "../../../controller/model/evolution/loi-evolution-type-personnel.model";
import {LoiEvolutionTypePersonnelService} from "../../../controller/service/evolutions/loi-evolution-type-personnel.service";

@Component({
  selector: 'app-evolution-personnel-create',
  templateUrl: './evolution-personnel-create.component.html',
  styleUrls: ['./evolution-personnel-create.component.css']
})
export class EvolutionPersonnelCreateComponent implements OnInit {



  constructor(private evolutionPersonnelService:EvolutionPersonnelService, private echelonService:EchelonService, private loiEvolutionTypePersonnelService:LoiEvolutionTypePersonnelService) { }

  ngOnInit() {
  }


  public get evolutionsPersonnel(){
    return this.evolutionPersonnelService.evolutionsPersonnel;
  }

  public get evolutionPersonnel(){
    return this.evolutionPersonnelService.evolutionPersonnel;
  }

  public get echelons(){
    return this.echelonService.echelons;
  }

  public get loisEvolutionTypePersonnel(){
    return this.loiEvolutionTypePersonnelService.loisEvolutionTypePersonnel;
  }



  ajouterEvolutionPersonnel(){
    this.evolutionPersonnelService.ajouterEvolutionPersonnel();
  }




}
