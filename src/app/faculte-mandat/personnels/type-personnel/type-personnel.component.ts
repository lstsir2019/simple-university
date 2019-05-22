import { Component, OnInit } from '@angular/core';
import {PersonnelService} from '../../../controller/service/personnel.service';
import {Projet} from '../../../controller/model/projet.model';
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

public  get personnelSelected() {
    return this.personnelService.pSelected;
  }
}
