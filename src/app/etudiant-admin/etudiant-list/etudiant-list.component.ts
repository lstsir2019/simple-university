import { Component, OnInit } from '@angular/core';
import {EtudiantService} from '../../controller/service/etudiant.service';

@Component({
  selector: 'app-etudiant-list',
  templateUrl: './etudiant-list.component.html',
  styleUrls: ['./etudiant-list.component.css']
})
export class EtudiantListComponent implements OnInit {

  constructor(public etudiantService :EtudiantService ) { }

  ngOnInit() {
    this.etudiantService.findAll();
  }

  public get etudiants(){
    return this.etudiantService.listEtudiants;
  }
}
