import {Component, OnInit} from '@angular/core';
import {OffreService} from '../../../controller/service/offre.service';
import {Offre} from '../../../controller/model/offre.model';
import {AppelOffreListeComponent} from '../../appel-offres/appel-offre-liste/appel-offre-liste.component';
import {AppelOffreService} from '../../../controller/service/appel-offre.service';

@Component({
  selector: 'app-offres-list',
  templateUrl: './offres-list.component.html',
  styleUrls: ['./offres-list.component.css']
})
export class OffresListComponent implements OnInit {

  appelOffreReference: string = '';
  offreSelected: Offre = new Offre();

  constructor(private offreService: OffreService, public appelOffreService: AppelOffreService) {

  }

  ngOnInit() {
  }

  findByAppelOffreRefernce() {
    this.offreService.findByAppelOffreRefernce(this.appelOffreReference);
  }

  public get offres() {
    return this.offreService.offresSearch;
  }

  public get offreDetails() {
    return this.offreService.offreDetailsSearch;
  }

  offreDetailByOffreReference(a: Offre) {
    if (null != a) this.offreSelected = a;
    this.offreService.offreDetailByOffreReference(a.reference);
  }

  public get allAppelOffre() {
    return this.appelOffreService.allAppelOffres;
  }

  removeOffre(a: Offre) {
    this.offreService.removeOffre(a);
  }
}
