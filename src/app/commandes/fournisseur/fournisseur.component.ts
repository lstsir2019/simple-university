import { Component, OnInit } from '@angular/core';
import {CommandeService} from '../../controller/service/commandes/commande.service';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit {

  constructor(private commandeService: CommandeService) { }

  ngOnInit() {
  }

  public get fournisseur(){
    return this.commandeService.fournisseurCreate;
  }
  public get fournisseurSerched(){
    return this.commandeService.fournisseurSerched;
  }
  public get fournisseurtrouver(){
    return this.commandeService.fournisseurtrover;
  }

  public createFournisseur(){
    return this.commandeService.crateFournisseur();
  }

  public findOneFournisseurByReference(){
    return this.commandeService.findOneFournisseurByReference();
  }
  public updatFor(){
    return this.commandeService.updateFournisseur();
  }
}
