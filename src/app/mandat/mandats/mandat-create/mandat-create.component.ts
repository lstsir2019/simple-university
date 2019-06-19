import { Component, OnInit } from '@angular/core';
import {MandatService} from '../../../controller/service/mandat.service';

@Component({
  selector: 'app-mandat-create',
  templateUrl: './mandat-create.component.html',
  styleUrls: ['./mandat-create.component.css']
})
export class MandatCreateComponent implements OnInit {

  constructor(public mandatService: MandatService) { }

  ngOnInit() {
    this.mandatService.findAll();
    this.mandatService.findallPersonnel();
    this.mandatService.findallResponsabilite();
    this.mandatService.findallEntite();
  }
  public get mandat(){
    return this.mandatService.mandatCreate;
  }
  public addMandat(){
    this.mandatService.addMandat();
  }
  public saveMandat(){
    this.mandatService.saveMandat();
  }

  public get listPersonnels(){
    return this.mandatService._listPersonnels;
  }
  public get listResponsabilites(){
    return this.mandatService._listResponsabilites;
  }
  public get listEntites(){
    return this.mandatService._listEntites;
  }


}
