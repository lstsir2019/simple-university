import { Component, OnInit } from '@angular/core';
import {OffreService} from '../../../controller/service/offre.service';
import {Offre} from '../../../controller/model/offre.model';

@Component({
  selector: 'app-details-offres',
  templateUrl: './details-offres.component.html',
  styleUrls: ['./details-offres.component.css']
})
export class DetailsOffresComponent implements OnInit {

  constructor(private offreService:OffreService) { }
  offreSelected: Offre = new Offre();

  ngOnInit() {
  }

  public get offreDetails() {
    return this.offreService.offreDetailsSearch;
  }
}
