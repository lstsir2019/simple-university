import { Component, OnInit } from '@angular/core';
import {CommandeService} from '../../controller/service/commandes/commande.service';

@Component({
  selector: 'app-paiemment-modal',
  templateUrl: './paiemment-modal.component.html',
  styleUrls: ['./paiemment-modal.component.css']
})
export class PaiemmentModalComponent implements OnInit {

  constructor(private commandeService:CommandeService) { }

  ngOnInit() {
  }


  public get commande() {
    return this.commandeService.commandeCreate;
  }

  public  get paiement(){
    return this.commandeService.paiementCreate;
  }
  public get payerCommande(){
    return this.commandeService.payerCommande();
  }
  public get commandeSelected() {
    return this.commandeService.commandeSelected;
  }
}
