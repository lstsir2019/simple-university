import { Component, OnInit } from '@angular/core';
import {AppelOffreService} from '../../../controller/service/appel-offre.service';

@Component({
  selector: 'app-appel-offre-create',
  templateUrl: './appel-offre-create.component.html',
  styleUrls: ['./appel-offre-create.component.css']
})
export class AppelOffreCreateComponent implements OnInit {

  constructor(private appelOffreService: AppelOffreService) { }

  ngOnInit() {
  }

  public get appelOffre() {
  return this.appelOffreService.appelOffreCreate;
  }
  public get appelOffreDetail() {
    return this.appelOffreService.appelOffreDetailCreate;
  }
  public get appelOffreDetails() {
    return this.appelOffreService.appelOffreCreate.appelOffreDetailVo;
  }
  public addAppelOffreDetail() {
    return this.appelOffreService.addAppelOffreDetail();
  }
  public  savAppelOffre() {
    this.appelOffreService.savAppelOffre();
  }
}
