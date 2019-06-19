import { Component, OnInit } from '@angular/core';
import {CommandeService} from "../../controller/service/commandes/commande.service";
import {CommandeItem} from '../../controller/model/commandes/commande-item.model';

@Component({
  selector: 'app-commande-create',
  templateUrl: './commande-create.component.html',
  styleUrls: ['./commande-create.component.css']
})
export class CommandeCreateComponent implements OnInit {
  constructor(private commandeService: CommandeService) { }

  ngOnInit() {
    this.commandeService.getFournisseurs();
  }

  public get commande() {
    return this.commandeService.commandeCreate;
  }

  public get commandeItem() {
    return this.commandeService.commandeItemCreate;
  }

  public get commandeItemCombo(){
    return this.commandeService.produits;
  }
  public get categories(){
    return this.commandeService.categories;
  }
  public get commandeItems() {
    return this.commandeService.commandeCreate.commandeItemVos;
  }

  public addCommandeItem(){
    return this.commandeService.addCommandeItem();
  }

  public ref:string;
  public saveCommande(){
    this.ref=this.commande.reference;
    this.commandeService.saveCommande();
  }

  public printCommande(){
    return this.commandeService.printCommande(this.ref);
  }
  public fournisseurs(){
    return this.commandeService.fournisseurs;
  }

  public setProduitByCategorier(libelle:string){
    return this.commandeService.setProduitByVategorie(libelle);
  }

  public eleminer(commandeItem:CommandeItem){
    this.commandeService.commandeCreate.commandeItemVos.splice(
      this.commandeService.commandeCreate.commandeItemVos.indexOf(commandeItem),1
    );
    return this.commandeService.commandeCreate.total-=commandeItem.prix*commandeItem.qte;
  }
}

