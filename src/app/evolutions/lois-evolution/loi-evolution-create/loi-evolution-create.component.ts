import { Component, OnInit } from '@angular/core';
import {LoiEvolutionService} from "../../../controller/service/evolutions/loi-evolution.service";

@Component({
  selector: 'app-loi-evolution-create',
  templateUrl: './loi-evolution-create.component.html',
  styleUrls: ['./loi-evolution-create.component.css']
})
export class LoiEvolutionCreateComponent implements OnInit {
  constructor(public loiEvolutionService:LoiEvolutionService) { }

  ngOnInit() {
  }

  public  get loiEvolution(){
    return this.loiEvolutionService.loiEvolution;
  }

  addLoiEvolution(){
    this.loiEvolutionService.ajouterLoiEvolution()
  }

}
