import { Component, OnInit } from '@angular/core';
import {PersonnelService} from '../../../controller/service/personnel.service';
import {EchelonService} from '../../../controller/service/evolutions/echelon.service';
import {EchelleService} from '../../../controller/service/evolutions/echelle.service';




@Component({
  selector: 'app-personnel-create',
  templateUrl: './personnel-create.component.html',
  styleUrls: ['./personnel-create.component.css']
})
export class PersonnelCreateComponent implements OnInit {

  constructor(public personnelService: PersonnelService , public echelonService: EchelonService , public echelleService : EchelleService) { }

  ngOnInit() {
    this.personnelService.findAll();
    this.personnelService.findallTypePersonnel();
    this.echelleService.getEchellesFromDatabase();
    this.echelonService.getEchelonsFromDatabase();
 
  }
  public get personnel(){
    return this.personnelService.personnelCreate;
  }
  public addPersonnel(){
    this.personnelService.addPersonnel();
  }
  public savePersonnel(){
    this.personnelService.savePersonnel();
  }
  public get personnels(){
    return this.personnelService.listPersonnels;
  }

  public get listTypePersonnels(){
    return this.personnelService.listTypePersonnels;
  }
  public get echelons(){
    return this.echelonService.echelons;
  }
  public get echelles(){
    return this.echelleService.echelles;
  }
  public get echlonsByEchelle(){
    return this.echelonService.listeEchelonsByEchelle;
  }
  public findEchelonByEchelle(){
    this.echelonService.getEchelonByEchelle(this.personnel.referenceEchelle);
  }

}
