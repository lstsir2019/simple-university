import { Component, OnInit } from '@angular/core';
import {LivraisonService} from "../controller/service/livraison.service";
import "bootstrap";
import {EntiteAdministratifService} from '../controller/service/entite-administratif.service';
import {CommandeService} from '../controller/service/commandes/commande.service';
@Component({
  selector: 'app-livraisons',
  templateUrl: './livraisons.component.html',
  styleUrls: ['./livraisons.component.css']
})
export class LivraisonsComponent implements OnInit {

  mode:number=0;
  constructor(private entiteService:EntiteAdministratifService,private commandeService:CommandeService) { }

  ngOnInit() {
    this.entiteService.findAll();
    this.commandeService.findAll();
  }

  addExpression(){
    this.mode=1;
  }
}
