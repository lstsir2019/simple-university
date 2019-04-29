import { Component, OnInit } from '@angular/core';
import {CommandeService} from '../../controller/service/commandes/commande.service';
import {Commande} from '../../controller/model/commandes/commande.model';
import {CommandeItem} from '../../controller/model/commandes/commande-item.model';
import {ExpressionBesoinItem} from '../../controller/model/expression-besoin-item.model';
import {CommandeSource} from '../../controller/model/commandes/commandeSource.model';

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

  public findExpressionBesoinItemsByProduit(commandeItem: CommandeItem){
    return this.commandeService.findExpressionBesoinItemsByProduit(commandeItem);
  }

  public get expressionBesoinItems(){
    return this.commandeService.expressionBesoinItems;
  }

  public setItemSelect(expressionBesoinItem: ExpressionBesoinItem){
    return this.commandeService.setItemSelect(expressionBesoinItem);
  }

  public affecter(){
    return this.commandeService.affecter();

  }

  public deleteCommandeSource(){
    return this.commandeService.deleteCommandeSource();
  }

  public setCommandeSourceSelect(commandeSource:CommandeSource){
    return this.commandeService.setCommandeSourceSelect(commandeSource);
  }

  public get commandeSourceCreate(){
    return this.commandeService.commandeSourceCreate;
  }


  public findCommandeSources(commandeItem: CommandeItem){
    return this.commandeService.findCommandeSources(commandeItem);
  }

  public get commandeSources(){
    return this.commandeService.commandeSources;
  }

  public chercherCommandeSource(){
    return this.commandeService.chercherCommandeSource();
  }



}
