import { Component, OnInit } from '@angular/core';
import {CommandeService} from "../../controller/service/commande.service";
import {CommandeItem} from '../../controller/model/commande-item.model';

@Component({
  selector: 'app-commande-create',
  templateUrl: './commande-create.component.html',
  styleUrls: ['./commande-create.component.css']
})
export class CommandeCreateComponent implements OnInit {
  constructor(private commandeService: CommandeService) { }

  ngOnInit() {
  }

  public get commande() {
    return this.commandeService.commandeCreate;
  }

  public get commandeItem() {
    return this.commandeService.commandeItemCreate;
  }

  public get commandeItems() {
    return this.commandeService.commandeCreate.commandeItemVos;
  }

  public addCommandeItem(){
    return this.commandeService.addCommandeItem();
  }

  public saveCommande(){
    this.commandeService.saveCommande();
  }

  public fournisseurs(){
    return this.commandeService.fournisseurs;
  }

  public eleminer(commandeItem:CommandeItem){
    this.commandeService.commandeCreate.commandeItemVos.splice(
      this.commandeService.commandeCreate.commandeItemVos.indexOf(commandeItem),1
    );
  }
}

