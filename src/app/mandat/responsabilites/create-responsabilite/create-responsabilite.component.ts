import { Component, OnInit } from '@angular/core';
import {ResponsabiliteService} from '../../../controller/service/responsabilite.service';
import {EntiteAdministratif} from '../../../controller/model/entite-administratif.model';
import {Responsabilite} from '../../../controller/model/responsabilite.model';

@Component({
  selector: 'app-create-responsabilite',
  templateUrl: './create-responsabilite.component.html',
  styleUrls: ['./create-responsabilite.component.css']
})
export class CreateResponsabiliteComponent implements OnInit {

  constructor(public responsabiliteService: ResponsabiliteService) { }

  ngOnInit() {
    this.responsabiliteService.findAll();
    this.responsabiliteService.findResponsabilite();
  }

  public get responsabilite(){
    return this.responsabiliteService.createResponsabilite;
  }
  public addResponsabilite(){
    this.responsabiliteService.addResponsabilite();
  }
  public saveResponsabilite(){
    this.responsabiliteService.saveResponsabilite();
  }

  public get responsabilites(){
    return this.responsabiliteService.listResponsabilites;
  }

  public deleteResponsabilite(r){
    this.responsabiliteService.deleteResponsabilte(r);
  }

  public saveUpdateResponsabilite() {
    this.responsabiliteService.upDateResponsabilite();
  }
  public setResponSelect(reponsabilite: Responsabilite){
    return this.responsabiliteService.setResponSelect(reponsabilite);
  }

  public get responsabiliteToUpdate(){
    return this.responsabiliteService.responsabiliteToUpdate;
  }
}
