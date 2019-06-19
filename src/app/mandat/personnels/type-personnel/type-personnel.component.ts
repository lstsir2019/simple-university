import { Component, OnInit } from '@angular/core';
import {PersonnelService} from '../../../controller/service/personnel.service';

import {Personnel} from '../../../controller/model/personnel.model';

@Component({
  selector: 'app-type-personnel',
  templateUrl: './type-personnel.component.html',
  styleUrls: ['./type-personnel.component.css']
})
export class TypePersonnelComponent implements OnInit {

  constructor(public personnelService: PersonnelService) { }

  ngOnInit() {
    this.personnelService.findAll();
    this.personnelService.findPersonels();
  }
  public get personnels(){
    return this.personnelService.listPersonnels;
  }

  public deletePersonnel(p){
  this.personnelService.deletePersonnel(p);
  }

  public findByCin(personnel: Personnel){
    this.personnelService.findByCin(personnel);

  }

  public saveUpdatePersonnel() {
    this.personnelService.upDatePersonnel();
  }

  public setPersonnelSelect(personnel: Personnel){
    return this.personnelService.setPersonnelSelect(personnel);
  }

  public get personnelToUpdate(){
    return this.personnelService.personnelToUpdate;
  }
public  get personnelSelected() {
    return this.personnelService.pSelected;
  }
  public get listTypePersonnels(){
    return this.personnelService.listTypePersonnels;
  }
  public get personnel(){
    return this.personnelService.personnelCreate;
  }
  public get listPersonnels(){
    return this.personnelService._listPersonnels;
  }


  public printPersonnel(cin:string){
    return this.personnelService.printPersonnel(cin);
  }

  public recherchePersonnel(){
    return this.personnelService.recherchePersonnel();
  }

  public get personnelRecherche(){
    return this.personnelService.personnelSearch;
  }


}
