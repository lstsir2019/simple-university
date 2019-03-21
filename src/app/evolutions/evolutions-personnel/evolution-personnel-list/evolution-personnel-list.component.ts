import {Component, OnInit} from '@angular/core';
import {EvolutionPersonnelService} from "../../../controller/service/evolutions/evolution-personnel.service";
import {EvolutionPersonnel} from "../../../controller/model/evolution/evolution-personnel.model";
import {EchelonService} from "../../../controller/service/evolutions/echelon.service";
import {LoiEvolutionTypePersonnelService} from "../../../controller/service/evolutions/loi-evolution-type-personnel.service";

@Component({
  selector: 'app-evolution-personnel-list',
  templateUrl: './evolution-personnel-list.component.html',
  styleUrls: ['./evolution-personnel-list.component.css']
})
export class EvolutionPersonnelListComponent implements OnInit {

  public newLocalEvolutionPersonnel = new EvolutionPersonnel('', null, '', '', null, null, '');


  constructor(private evolutionPersonnelService: EvolutionPersonnelService,  private echelonService:EchelonService, private loiEvolutionTypePersonnelService:LoiEvolutionTypePersonnelService) {
  }

  public get evolutionsPersonnel() {
    return this.evolutionPersonnelService.evolutionsPersonnel;
  }

  public get newEvolutionPersonnel() {
    return this.evolutionPersonnelService.newEvolutionPersonnel
  }

  public get echelons(){
    return this.echelonService.echelons;
  }

  public get loisEvolutionTypePersonnel(){
    return this.loiEvolutionTypePersonnelService.loisEvolutionTypePersonnel;
  }


  toggleData(data) {
    // @ts-ignore
    $('#modalEvolutionPersonnel').modal('show');
    this.newLocalEvolutionPersonnel = new EvolutionPersonnel(data.reference, data.loiEvolutionTypePersonnel, data.referencePersonnel, data.referenceTypePersonnel, data.echelonDepart, data.echelonFin, data.dateEvolution);
  }

  modifierEvolutionPersonnel(){
    this.evolutionPersonnelService.modifierEvolutionPersonnel(this.newLocalEvolutionPersonnel);
  }

  supprimerEvolutionPersonnel(data){
    this.evolutionPersonnelService.deleteEvolutionPersonnel(data);
  }


  ngOnInit() {
  }

}
