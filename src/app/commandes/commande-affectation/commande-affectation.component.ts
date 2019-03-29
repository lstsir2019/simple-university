import { Component, OnInit } from '@angular/core';
import {CommandeService} from '../../controller/service/commandes/commande.service';
import {Commande} from '../../controller/model/commandes/commande.model';

@Component({
  selector: 'app-commande-affectation',
  templateUrl: './commande-affectation.component.html',
  styleUrls: ['./commande-affectation.component.css']
})
export class CommandeAffectationComponent implements OnInit {

  constructor(private commandeService:CommandeService) { }

  ngOnInit() {

  }

  public findCommandeItemsByCommandeReference(){
    return this.commandeService.findCommandeItemsByCommandeReference();
  }

  public get commandeItems(){
    return this.commandeService.commandeItems;
  }
  public get commande(){
    return this.commandeService.commande;
  }

}
