import {Component, OnInit} from '@angular/core';
import {OffreService} from '../../../controller/service/offre.service';
import {Offre} from '../../../controller/model/offre.model';
import {AppelOffreListeComponent} from '../../appel-offres/appel-offre-liste/appel-offre-liste.component';
import {AppelOffreService} from '../../../controller/service/appel-offre.service';
import {CommandeService} from '../../../controller/service/commandes/commande.service';
import {Router} from '@angular/router';
import {BudgetCompteBudgitaireCreateComponent} from '../../../budget/Opperation/budget-compte-budgitaire-create/budget-compte-budgitaire-create.component';
import {MatDialog} from '@angular/material';
import {DetailsOffresComponent} from '../details-offres/details-offres.component';

@Component({
  selector: 'app-offres-list',
  templateUrl: './offres-list.component.html',
  styleUrls: ['./offres-list.component.css']
})
export class OffresListComponent implements OnInit {

  appelOffreReference: string = '';
  offreSelected: Offre = new Offre();
  public reference: string;

  openDialog() {
    const dialogRef = this.dialog.open(DetailsOffresComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  constructor(private detailsOffresComponent: DetailsOffresComponent, private dialog: MatDialog, private commandeService: CommandeService, private router: Router, private offreService: OffreService, public appelOffreService: AppelOffreService) {

  }

  ngOnInit() {
  }

  findByAppelOffreRefernce() {
    this.offreService.findByAppelOffreRefernce(this.appelOffreReference);
  }

  public get offres() {
    return this.offreService.offresSearch;
  }

  mode = -1;

  offreDetailByOffreReference(a: Offre) {
    this.offreSelected = a;
    this.offreService.offreDetailByOffreReference(a.reference);
    this.detailsOffresComponent.offreSelected=a;
    console.log(this.detailsOffresComponent.offreSelected);
    this.openDialog();
  }

  public get allAppelOffre() {
    return this.appelOffreService.allAppelOffres;
  }

  public get appelOffreSearch() {
    return this.appelOffreService.appelOffreSearch;
  }

  removeOffre(a: Offre) {
    this.offreService.removeOffre(a);
  }

  get bestOffre() {
    return this.offreService.offreSelected;
  }

  chekBestOffre(a: Offre) {
    this.offreService.chekBestOffre(a);
    this.offreService.findOffreSelectedByRefernceAppelOffre(a.reference);

  }

  changeOffreToCommande(a) {
    this.offreService.offreDetailByOffreReference(a.reference);
    this.commandeService.offreToCommande(a, this.offreService.offreDetailsSearch);
    this.router.navigate(['/commandeCreate']);


  }

  findOffresByAppelOffreReference() {
    this.offreService.findOffreSelectedByRefernceAppelOffre(this.reference);
    this.offreService.findByAppelOffreRefernce(this.reference);
    let number = -1;
    if (this.bestOffre != null && this.bestOffre.reference != null) {
      number = this.offres.findIndex(o => o.reference == this.bestOffre.reference);
    }
    console.log(number);
    if (number != null) {
      this.mode = number;
    } else {
      this.mode = -1;
    }
  }
}
