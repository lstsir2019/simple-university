import { Component, OnInit } from '@angular/core';
import {MagasinService} from '../../../controller/service/magasin.service';

@Component({
  selector: 'app-magasin-create-liste',
  templateUrl: './magasin-create-liste.component.html',
  styleUrls: ['./magasin-create-liste.component.css']
})
export class MagasinCreateListeComponent implements OnInit {

  constructor(private magasinService:MagasinService) { }

  ngOnInit() {
  }
  get magasins(){
      return this.magasinService.magasins;
  }

}
