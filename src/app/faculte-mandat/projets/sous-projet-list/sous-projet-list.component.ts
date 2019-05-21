import { Component, OnInit } from '@angular/core';
import {ProjetService} from '../../../controller/service/projet.service';
import {Projet} from '../../../controller/model/projet.model';
import {EntiteAdministratifService} from '../../../controller/service/entite-administratif.service';

@Component({
  selector: 'app-sous-projet-list',
  templateUrl: './sous-projet-list.component.html',
  styleUrls: ['./sous-projet-list.component.css']
})
export class SousProjetListComponent implements OnInit {

  constructor(private projetService:ProjetService) { }

  ngOnInit() {
    this.projetService.findAll();
}

}
