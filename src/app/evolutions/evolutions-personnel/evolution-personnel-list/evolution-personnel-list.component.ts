import {Component, OnInit} from '@angular/core';
import {EvolutionPersonnelService} from "../../../controller/service/evolutions/evolution-personnel.service";
import {EvolutionPersonnel} from "../../../controller/model/evolution/evolution-personnel.model";
import {EchelonService} from "../../../controller/service/evolutions/echelon.service";
import {LoiEvolutionTypePersonnelService} from "../../../controller/service/evolutions/loi-evolution-type-personnel.service";
import * as jsPDF from 'jspdf';


@Component({
  selector: 'app-evolution-personnel-list',
  templateUrl: './evolution-personnel-list.component.html',
  styleUrls: ['./evolution-personnel-list.component.css']
})
export class EvolutionPersonnelListComponent implements OnInit {

  public newLocalEvolutionPersonnel = new EvolutionPersonnel('', null, '', '', null, null, '');


  constructor(private evolutionPersonnelService: EvolutionPersonnelService,  private echelonService:EchelonService, private loiEvolutionTypePersonnelService:LoiEvolutionTypePersonnelService) {
  }


  ngOnInit() {
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

  public get searchInput(){
    return this.evolutionPersonnelService.searchInput;
  }

  public set searchInput(data){
    this.evolutionPersonnelService.searchInput = data;
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

  search(){
    this.evolutionPersonnelService.search();
  }

  getAll(){
    this.evolutionPersonnelService.getEvolutionsPersonnelFromDatabase();
  }

  print(data){
    const doc = new jsPDF();
    doc.text("RAPPORT D'EVOLUION PERSONNEL",10,20);
    doc.text("Reference : "+data.reference,10,40);
    doc.text("Reference personnel : "+data.referencePersonnel,10,50);
    doc.text("Reference type personnel : "+ data.referenceTypePersonnel,10,60);
    doc.save(data.reference+".pdf");
  }




}
