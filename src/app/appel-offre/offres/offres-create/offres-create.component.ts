import {Component, OnInit} from '@angular/core';
import {OffreService} from '../../../controller/service/offre.service';
import {AppelOffre} from '../../../controller/model/appel-offre.model';
import {AppelOffreService} from '../../../controller/service/appel-offre.service';
import {OffreDetail} from '../../../controller/model/offre-detail.model';
import {CommandeService} from '../../../controller/service/commandes/commande.service';

@Component({
  selector: 'app-offres-create',
  templateUrl: './offres-create.component.html',
  styleUrls: ['./offres-create.component.css']
})
export class OffresCreateComponent implements OnInit {
  appleOffresDet: any;


  constructor(private offreService: OffreService, private appelOffreService: AppelOffreService, private commandeService: CommandeService) {
  }

  ngOnInit() {
    this.appelOffreService.findAll();
     this.offreService.allFournisseur();
  }

  public get appleOffreDetails() {
    return this.appelOffreService.appleOffreDetailsByReference;
  }

  public get offreDetail() {
    return this.offreService.offreDetailCreate;
  }

  public get offre() {
    return this.offreService.offreCreate;
  }

  public findAppelOffreByRefernce() {
    this.appelOffreService.findAppelOffreByRefernce(this.offre.appelOffreVo.reference);
  }

  addOffreDetail() {
    this.offreService.addOffreDetail();
  }

  public get allAppelOffre() {
    return this.appelOffreService.allAppelOffres;
  }

  saveOffre() {
    this.offreService.saveOffre();
  }

  removeoffreDetailsVo(item: OffreDetail) {
    let index: number = this.offre.offreDetailsVo.indexOf(item);
    this.offre.offreDetailsVo.splice(index, 1);
  }

  public get fournisseurs() {
    return this.offreService._fournisseurs;

  }
}
