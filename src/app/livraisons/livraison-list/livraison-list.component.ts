import { Component, OnInit } from '@angular/core';
import {LivraisonService} from "../../controller/service/livraison.service";
import {Livraison} from "../../controller/model/livraison.model";
import {Stock} from "../../controller/model/stock.model";

@Component({
  selector: 'app-livraison-list',
  templateUrl: './livraison-list.component.html',
  styleUrls: ['./livraison-list.component.css']
})
export class LivraisonListComponent implements OnInit {

  constructor(private livraisonService: LivraisonService) { }

  ngOnInit() {
   this.livraisonService.findAll();
  }
  public get livraisons(){
    return this.livraisonService.livraisons;
  }
  public livraisonItemsR(livraison:Livraison){
     this.livraisonService.livraisonItemsR(livraison);
  }
  get livraisonR(){
    return this.livraisonService.livraisonR;
  }
  public findByQueryLivraison(){
    this.livraisonService.findByQueryLivraison();
  }
  get livraisonQuery(){
    return this.livraisonService.livraisonQuery;
  }
  public deleteLivraison(livraison:Livraison){
    this.livraisonService.deleteLivraison(livraison.reference);
    this.livraisons.splice(
      this.livraisons.indexOf(livraison),1
    );

  }
}
