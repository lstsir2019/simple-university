import { Component, OnInit } from '@angular/core';
import {Commande} from '../../controller/model/commandes/commande.model';
import {CommandeService} from '../../controller/service/commandes/commande.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {


  constructor(private commandeService:CommandeService) { }

  ngOnInit() {
  }

  public findPaiementByCommande(c:Commande){
    this.commandeService.findPaiementByCommande(c);
  }

  public get commandes() {
    return this.commandeService.commandes;
  }

  public get commandeSelected() {
    return this.commandeService.commandeSelected;
  }

}
