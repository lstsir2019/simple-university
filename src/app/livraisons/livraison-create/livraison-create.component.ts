import { Component, OnInit } from '@angular/core';
import {LivraisonService} from '../../controller/service/livraison.service';

@Component({
  selector: 'app-livraison-create',
  templateUrl: './livraison-create.component.html',
  styleUrls: ['./livraison-create.component.css']
})
export class LivraisonCreateComponent implements OnInit {

  mode:number=0;

 modeGlobal:number=0;


  constructor(private livraisonService: LivraisonService) { }

  ngOnInit() {
  }
  public afficher(){
    this.mode=1;
  }
  public  ok(){
    this.modeGlobal=1;
  }
  public addLivraisonItem() {
    this.livraisonService.addLivraisonItem();
  }
  public get  livraison() {
    return this.livraisonService.livraisonCreate;
}
  public get  livraisonItem() {
    return this.livraisonService.livraisonItemCreate;
  }
  public get  livraisonItems() {
    return this.livraisonService.livraisonCreate.livraisonItemVos;
  }
  public saveLivraison(){
    this.livraisonService.saveLivraison();
    this.modeGlobal=0;
    this.mode=0;
  }
  public get livraisons(){
    return this.livraisonService.livraisons;
  }
}

