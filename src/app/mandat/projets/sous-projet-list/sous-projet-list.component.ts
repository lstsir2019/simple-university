import { Component, OnInit } from '@angular/core';
import {ProjetService} from '../../../controller/service/projet.service';
import {SousProjet} from '../../../controller/model/sous-projet.model';
import {Projet} from '../../../controller/model/projet.model';

@Component({
  selector: 'app-sous-projet-list',
  templateUrl: './sous-projet-list.component.html',
  styleUrls: ['./sous-projet-list.component.css']
})
export class SousProjetListComponent implements OnInit {

  constructor(private projetService:ProjetService) { }

  ngOnInit() {
    this.projetService.findProjet();
  }



  public get Projets(){
    return this.projetService.projets;
  }
  public findSousProjetByLibelleProjet(projet:Projet){
    this.projetService.findSousProjetByLibelleProjet(projet);
  }

  public deleteSousProjet(sp){
    this.projetService.deleteSousProjet(sp);
  }
  public printProjet(libelleP:string){
    return this.projetService.printProjet(libelleP);
  }


  public rechercheProjet(){
    return this.projetService.rechercheProjet();
  }

  public get projetRecherche(){
    return this.projetService.projetSearch;
  }

  public get projetSelected(){
    return this.projetService.projetSelected;
  }

  public deleteProjet(p){
    this.projetService.deleteProjet(p);
  }




  public get sousPrjs() {
    return this.projetService.projetSelected.sousProjetsVo;
  }
  public ajouterSousProjet() {
    this.projetService.ajouterSousProjet();
  }

 public  Add(){
     this.projetService.add();
 }

  public get sousProjetPush() {
    return this.projetService.projetPush.sousProjetsVo;
  }

  public setProjetSelect(projet: Projet){
    return this.projetService.setProjetSelect(projet);
  }


  public saveUpdateProjet() {
    this.projetService.upDateProjet();
  }


  public get projetToUpdate(){
    return this.projetService.projetToUpdate;
  }
}
