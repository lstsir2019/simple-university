import { Component, OnInit } from '@angular/core';
import {MagasinService} from "../controller/service/magasin.service";

@Component({
  selector: 'app-magasin',
  templateUrl: './magasin.component.html',
  styleUrls: ['./magasin.component.css']
})
export class MagasinComponent implements OnInit {

  constructor(private magasinService:MagasinService) { }

  ngOnInit() {
    this.magasinService.findAll();
  }

}
