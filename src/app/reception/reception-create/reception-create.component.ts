import { Component, OnInit } from '@angular/core';
import {ReceptionService} from "../../controller/service/reception.service";
import {MagasinService} from "../../controller/service/magasin.service";

@Component({
  selector: 'app-reception-create',
  templateUrl: './reception-create.component.html',
  styleUrls: ['./reception-create.component.css']
})
export class ReceptionCreateComponent implements OnInit {

  constructor(private receptionservice:ReceptionService,private magasinService:MagasinService) { }

  ngOnInit() {

  }

  public saveReception(){
    console.log("SaveReception Create");
    this.receptionservice.saveReception();
  }
  public addReceptionItem(){
    this.receptionservice.addReceptionItem();
  }
  public get reception(){
    return this.receptionservice.receptionCreate;
  }
  public get receptionItem(){
    return this.receptionservice.receptionItemCreate;
  }
  public get receptionItems(){
    return this.receptionservice.receptionCreate.receptionItems;
  }
  public get magasins(){
    return this.magasinService.magasins;
  }
}
