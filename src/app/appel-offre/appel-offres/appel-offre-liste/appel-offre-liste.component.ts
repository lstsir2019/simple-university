import { Component, OnInit } from '@angular/core';
import {AppelOffreService} from '../../../controller/service/appel-offre.service';
import {AppelOffre} from '../../../controller/model/appel-offre.model';
import {OffreService} from '../../../controller/service/offre.service';
import {Router} from '@angular/router';
import {CommandeService} from '../../../controller/service/commandes/commande.service';


@Component({
  selector: 'app-appel-offre-liste',
  templateUrl: './appel-offre-liste.component.html',
  styleUrls: ['./appel-offre-liste.component.css']
})
export class AppelOffreListeComponent implements OnInit {

  constructor(private commandeService:CommandeService,private router:Router,private appelOffreService: AppelOffreService,private offreService:OffreService) { }

  ngOnInit() {
    this.appelOffreService.findAll();
    this.appelOffreService.findAppelOffreDetailByObjectifAppelOffre(this.appelOffreSelected);
  }

  public findAppelOffreDetailByObjectifAppelOffre(appelOffre: AppelOffre ) {
    this.appelOffreService.findAppelOffreDetailByObjectifAppelOffre(appelOffre);

  }
  public get appelOffreSearch(){
    return this.appelOffreService.appelOffreSearch;
  }
  public get appelOffres() {
    return this.appelOffreService.appelOffres;
  }

  public get appelOffreSelected() {
    return this.appelOffreService.appelOffreSelected;
  }

  findAppelOffreByCriteria() {
    this.appelOffreService.findAppelOffreByCriteria();
  }

  findOffreDetailByAppelOffre(a) {
  this.offreService.findByAppelOffreRefernce(a.reference);
  this.appelOffreService.findOffreSelectedByRefernceAppelOffre(a.reference);
  }

  removeAppelOffre(a) {
    this.appelOffreService.removeAppelOffre(a);


  }
  printAppelOffre(a:AppelOffre) {
    this.appelOffreService.printAppelOffre(a.reference);


  }

}
