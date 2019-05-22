import { Component, OnInit } from '@angular/core';
import {EntiteAdministratifService} from '../../../controller/service/entite-administratif.service';
import {ProjetService} from '../../../controller/service/projet.service';
import {EntiteAdministratif} from '../../../controller/model/entite-administratif.model';


@Component({
  selector: 'app-create-entite-administratif',
  templateUrl: './create-entite-administratif.component.html',
  styleUrls: ['./create-entite-administratif.component.css']
})
export class CreateEntiteAdministratifComponent implements OnInit {

  constructor(public entiteAdministratifService: EntiteAdministratifService,public projetService:ProjetService) { }

  ngOnInit() {
    this.entiteAdministratifService.findAll();
    this.entiteAdministratifService.findallSousProjets();
    this.entiteAdministratifService.findallTypeEntite();


  }

  public get entiteAdministratif(){
    return this.entiteAdministratifService.createEntiteAdministratif;
  }
  public addEntiteAdministratif(){
    this.entiteAdministratifService.addEntiteAdministratif();
  }
  public saveEntiteAdministratif(){
    this.entiteAdministratifService.saveEntiteAdministratif();
  }

  public get entiteAdministratifs(){
    return this.entiteAdministratifService.listEntiteAdministratifs;
  }
  public get sousProjets() {
    return this.projetService.projetCreate.sousProjetsVo;
  }

  public get listSousProjet(){
    return this.entiteAdministratifService._sousProjetss;
  }

  public get listTypeEntite(){
    return this.entiteAdministratifService._typeEntiteAdmin;
  }

  public deleteEntite(e){
    this.entiteAdministratifService.deleteEntite(e);
  }

  public findEntite(){
    return this.entiteAdministratifService.findEntite();
  }
}

