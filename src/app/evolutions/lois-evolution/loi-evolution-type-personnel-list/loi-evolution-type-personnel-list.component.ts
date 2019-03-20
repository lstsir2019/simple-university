import { Component, OnInit } from '@angular/core';
import {LoiEvolutionTypePersonnelService} from "../../../controller/service/evolutions/loi-evolution-type-personnel.service";
import {LoiEvolutionTypePersonnel} from "../../../controller/model/evolution/loi-evolution-type-personnel.model";
import {EchelonService} from "../../../controller/service/evolutions/echelon.service";
import {LoiEvolutionService} from "../../../controller/service/evolutions/loi-evolution.service";

@Component({
  selector: 'app-loi-evolution-type-personnel-list',
  templateUrl: './loi-evolution-type-personnel-list.component.html',
  styleUrls: ['./loi-evolution-type-personnel-list.component.css']
})
export class LoiEvolutionTypePersonnelListComponent implements OnInit {

  public loiEvolutionTypePersonnelToEdit = new LoiEvolutionTypePersonnel('', '', null, null, 0, null);


  constructor(public loiEvolutionTypePersonnelService:LoiEvolutionTypePersonnelService, public echelonService:EchelonService, public loiEvolutionService:LoiEvolutionService) { }

  ngOnInit() {
  }


  get loisEvolutionTypePersonnel() {
    return this.loiEvolutionTypePersonnelService.loisEvolutionTypePersonnel;
  }

  public get echelons(){
    return this.echelonService.echelons;
  }

  public get loisEvolution(){
    return this.loiEvolutionService.loisEvolution
  }

  toggleLoiEvolutionTypePersonnel(data){
    // @ts-ignore
    $('#modalEditLoiEvolutionTypePersonnel').modal('show');
    this.loiEvolutionTypePersonnelToEdit = new LoiEvolutionTypePersonnel(data.reference,data.referenceTypePersonnel,data.echelonDepart,data.echelonFin,data.nombreAnnees,data.loiEvolution)
  }

  editLoiEvolutionTypePersonnel(){
    this.loiEvolutionTypePersonnelService.modifierLoiEvolutionTypePersonnel(this.loiEvolutionTypePersonnelToEdit);
  }

  deleteLoiEvolutionTypePersonnel(data){
    this.loiEvolutionTypePersonnelService.deleteLoiEvolutionTypePersonnel(data);
  }
}
