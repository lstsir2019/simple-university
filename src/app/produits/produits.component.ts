import { Component, OnInit } from '@angular/core';
import "bootstrap";
import {ProduitService} from "../controller/service/produit.service";

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


}
