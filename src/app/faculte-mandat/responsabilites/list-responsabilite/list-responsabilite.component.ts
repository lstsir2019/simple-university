

















import { Component, OnInit } from '@angular/core';
import {ResponsabiliteService} from '../../../controller/service/responsabilite.service';

@Component({
  selector: 'app-list-responsabilite',
  templateUrl: './list-responsabilite.component.html',
  styleUrls: ['./list-responsabilite.component.css']
})
export class ListResponsabiliteComponent implements OnInit {

  constructor(public responsabiliteService :ResponsabiliteService) { }

  ngOnInit() {
    //this.responsabiliteService.findAll();
  }
 // public get responsabilites(){
   // return this.responsabiliteService.listResponsabilites;
 // }
}
