import { Component, OnInit } from '@angular/core';
import {ProjetService} from '../../../controller/service/projet.service';
import {SousProjet} from '../../../controller/model/sous-projet.model';
import {Projet} from '../../../controller/model/projet.model';

@Component({
  selector: 'app-projet-create',
  templateUrl: './projet-create.component.html',
  styleUrls: ['./projet-create.component.css']
})
export class ProjetCreateComponent implements OnInit {

  constructor(private projetService: ProjetService) { }

  ngOnInit() {
  }

  public get projet() {
      return this.projetService.projetCreate;
  }
  public get sousProjet() {
    return this.projetService.sousProjetCreate;
  }
  public get sousProjets() {
    return this.projetService.projetCreate.sousProjetsVo;
  }
 public addSousProjet() {
    this.projetService.addSousProjet();
 }
  public findSousProjet(){
     this.projetService.findSousProjet();
  }

 public saveProjet(){
    this.projetService.saveProjet();
 }


  public eleminer(sousProjet:SousProjet){
    this.projetService.projetCreate.sousProjetsVo.splice(
      this.projetService.projetCreate.sousProjetsVo.indexOf(sousProjet),1
    );

}



  public get Projets(){
    return this.projetService.projets;
  }
  public findSousProjetByLibelleProjet(projet:Projet){
    this.projetService.findSousProjetByLibelleProjet(projet);
  }


  public get projetSelected(){
    return this.projetService.projetSelected;
  }

  public deleteProjet(p){
    this.projetService.deleteProjet(p);
  }

  public deleteSousProjet(sp){
    this.projetService.deleteSousProjet(sp);
  }


}
