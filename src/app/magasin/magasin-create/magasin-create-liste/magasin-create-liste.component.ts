import {Component, OnInit} from '@angular/core';
import {MagasinService} from '../../../controller/service/magasin.service';
import {Magasin} from "../../../controller/model/magasin.model";

@Component({
  selector: 'app-magasin-create-liste',
  templateUrl: './magasin-create-liste.component.html',
  styleUrls: ['./magasin-create-liste.component.css']
})
export class MagasinCreateListeComponent implements OnInit {

  constructor(private magasinService:MagasinService) { }

  ngOnInit() {
    this.magasinService.findAll();
  }
  get magasins(){
      return this.magasinService.magasins;
  }

  miseAjour(m: Magasin) {
    this.magasinService.magasinToUpdate = m;
    let magasinClone: Magasin = new Magasin(m.reference);
    magasinClone.description = m.description;
    magasinClone.libelle = m.libelle;
    magasinClone.address = m.address;
    this.magasinService.magasinSelected = magasinClone;

  }

}
