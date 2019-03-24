import { Component, OnInit } from '@angular/core';
import {Commande} from "../../controller/model/commandes/commande.model";
import {CommandeService} from "../../controller/service/commandes/commande.service";

@Component({
  selector: 'app-commande-list',
  templateUrl: './commande-list.component.html',
  styleUrls: ['./commande-list.component.css']
})
export class CommandeListComponent implements OnInit {

  constructor(private commandeService:CommandeService) { }

  ngOnInit() {
  }


  public findCommandeItemByReference(c:Commande){
    this.commandeService.findCommandeItemByReference(c);
  }

  public get commandes() {
    return this.commandeService.commandes;
  }

  public get commandeSelected() {
    return this.commandeService.commandeSelected;
  }

}

