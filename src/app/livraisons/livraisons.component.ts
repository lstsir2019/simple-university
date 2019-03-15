import { Component, OnInit } from '@angular/core';
import {LivraisonService} from "../controller/service/livraison.service";
import "bootstrap";
@Component({
  selector: 'app-livraisons',
  templateUrl: './livraisons.component.html',
  styleUrls: ['./livraisons.component.css']
})
export class LivraisonsComponent implements OnInit {

  mode:number=0;
  constructor() { }

  ngOnInit() {
  }

  addExpression(){
    this.mode=1;
  }
}
