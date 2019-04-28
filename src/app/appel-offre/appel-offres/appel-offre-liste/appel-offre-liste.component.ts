import { Component, OnInit } from '@angular/core';
import {AppelOffreService} from '../../../controller/service/appel-offre.service';
import {AppelOffre} from '../../../controller/model/appel-offre.model';


@Component({
  selector: 'app-appel-offre-liste',
  templateUrl: './appel-offre-liste.component.html',
  styleUrls: ['./appel-offre-liste.component.css']
})
export class AppelOffreListeComponent implements OnInit {

  constructor(private appelOffreService: AppelOffreService) { }

  ngOnInit() {
    this.appelOffreService.findAll();
    this.appelOffreService.findAppelOffreDetailByObjectifAppelOffre(this.appelOffreSelected);
  }

  public findAppelOffreDetailByObjectifAppelOffre(appelOffre: AppelOffre ) {
    this.appelOffreService.findAppelOffreDetailByObjectifAppelOffre(appelOffre);

  }
  public get appelOffres() {
    return this.appelOffreService.appelOffres;
  }
  public get appelOffreSelected() {
    return this.appelOffreService.appelOffreSelected;
  }
}
