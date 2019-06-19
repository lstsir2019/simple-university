import { Component, OnInit } from '@angular/core';
import {CommandeService} from '../../controller/service/commandes/commande.service';
import * as $ from 'jquery';

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
  public typePaiement:string;
  public  payerCommande(){
    return this.commandeService.payerCommande(this.typePaiement);

  }
  public get commandeSelected() {
    return this.commandeService.commandeSelected;
  }

  public selectType(type:string){
    this.typePaiement=type;
  }
}
