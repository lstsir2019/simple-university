import { Component, OnInit } from '@angular/core';
import {MandatService} from '../../../controller/service/mandat.service';
import {Mandat} from '../../../controller/model/mandat.model';


@Component({
  selector: 'app-mandat-list',
  templateUrl: './mandat-list.component.html',
  styleUrls: ['./mandat-list.component.css']
})
export class MandatListComponent implements OnInit {

  constructor( public mandatService : MandatService) { }

  ngOnInit() {
    this.mandatService.findAll();
    this.mandatService.findallPersonnel();
    this.mandatService.findallResponsabilite();
    this.mandatService.findallEntite();
    this.mandatService.findMandats();

  }

  public get mandats(){
    return this.mandatService.listMandats;
  }
  public get mandat(){
    return this.mandatService.mandat;
  }


  public deleteMandat(m){
    this.mandatService.deleteMandat(m);
  }


  public rechercheMandat(){
    return this.mandatService.rechercheMandat();
  }
  public get mandatRecherche(){
    return this.mandatService.mandatSearch;
  }

  public printMandat(cin:string){
    return this.mandatService.printMandat(cin);
  }


  public get listPersonnels(){
    return this.mandatService._listPersonnels;
  }
  public get listResponsabilites(){
    return this.mandatService._listResponsabilites;
  }
  public get listEntites(){
    return this.mandatService._listEntites;
  }

  public setMandatSelect(mandat: Mandat){
    return this.mandatService.setMandatSelect(mandat);
  }


  public saveUpdateMandat() {
    this.mandatService.upDateMandat();
  }


  public get mandatToUpdate(){
    return this.mandatService.mandatToUpdate;
  }
}
