import { Component, OnInit } from '@angular/core';
import {Commande} from "../../controller/model/commandes/commande.model";
import {CommandeService} from "../../controller/service/commandes/commande.service";
import {CommandeItem} from '../../controller/model/commandes/commande-item.model';

@Component({
  selector: 'app-commande-list',
  templateUrl: './commande-list.component.html',
  styleUrls: ['./commande-list.component.css']
})
export class CommandeListComponent implements OnInit {

  constructor(private commandeService:CommandeService) { }

  ngOnInit() {
  }



  public get commandeCherch() {
    return this.commandeService.commandecherch;
  }

  public  get commandeItemSelected(){
    return this.commandeService.commandeItemSelected;
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

  public itemToModal(commandeSelected: Commande) {
    this.commandeService.itemToModal(commandeSelected);
  }
  public commandeItemToModal(commandeItemSelected: CommandeItem){
    this.commandeService.commandeItemToModal(commandeItemSelected);
  }

  public deletCommande(commande:Commande){
    return this.commandeService.deleteCommande();
  }

  public chercherCommande(){
    this.commandeService.chercherCommande();
  }
  public printCommande(reference:string){
    return this.commandeService.printCommande(reference);
  }
  public deleteCommandeItem(){
    return this.commandeService.deleteCommandeItem();
  }

  public updateItem(){
    return this.commandeService.updateItem();
  }
}

