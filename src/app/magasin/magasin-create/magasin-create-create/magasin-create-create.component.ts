import { Component, OnInit } from '@angular/core';
import {MagasinService} from '../../../controller/service/magasin.service';

@Component({
  selector: 'app-magasin-create-create',
  templateUrl: './magasin-create-create.component.html',
  styleUrls: ['./magasin-create-create.component.css']
})
export class MagasinCreateCreateComponent implements OnInit {

  constructor(private magasinService:MagasinService) { }

  ngOnInit() {
  }

  public saveMagasin(){
    this.magasinService.saveMagasin();
  }

  public get magasin(){
    return this.magasinService.magasinCreate;
  }
}
