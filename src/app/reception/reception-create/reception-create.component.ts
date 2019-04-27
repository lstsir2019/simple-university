import {Component, OnInit} from '@angular/core';
import {ReceptionService} from "../../controller/service/reception.service";
import {MagasinService} from "../../controller/service/magasin.service";
import {CommandeService} from "../../controller/service/commandes/commande.service";

@Component({
  selector: 'app-reception-create',
  templateUrl: './reception-create.component.html',
  styleUrls: ['./reception-create.component.css']
})
export class ReceptionCreateComponent implements OnInit {

  constructor(private commndeService: CommandeService, private receptionservice: ReceptionService, private magasinService: MagasinService) {
  }

  ngOnInit() {

  }

  public saveReception(){
    this.receptionservice.saveReception();
  }
  public addReceptionItem(){
    this.receptionservice.addReceptionItem();
  }
  public get reception(){
    return this.receptionservice.receptionCreate;
  }
  public get receptionItem(){
    return this.receptionservice.receptionItemCreate;
  }
  public get receptionItems(){
    return this.receptionservice.receptionCreate.receptionItems;
  }
  public get magasins(){
    return this.magasinService.magasins;
  }

  public deleteReceptionItems(item) {
    this.receptionservice.deleteReceptionItems(item);
  }

  public get commandeItems() {
    return this.commndeService.commandeItemsReception;
  }

  /*public findCommndeItems() {
    this.commndeService.findCommandeItemsReceptionByReference(this.reception.referenceCommande);
  }*/

}
