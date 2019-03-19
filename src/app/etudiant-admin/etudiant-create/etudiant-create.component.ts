import { Component, OnInit } from '@angular/core';
import {EtudiantService} from '../../controller/service/etudiant.service';
import {ConcoursService} from '../../controller/service/concours.service';

@Component({
  selector: 'app-etudiant-create',
  templateUrl: './etudiant-create.component.html',
  styleUrls: ['./etudiant-create.component.css']
})
export class EtudiantCreateComponent implements OnInit {


  constructor(public etudiantService: EtudiantService, public concoursService: ConcoursService) { }

  ngOnInit() {
    this.concoursService.findAll();
  }
  public get etudiant(){
    return this.etudiantService.etudiantCreate;
  }
  public addEtudiant(){
    this.etudiantService.addEtudiant();
  }
  public saveEtudiant(){
    this.etudiantService.saveEtudiant();
  }
  public get etudiants(){
    return this.etudiantService.listEtudiants;
  }
  public get concourss(){
    return this.concoursService.listConcours;
  }
}
