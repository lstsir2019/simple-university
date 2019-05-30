import {Component, OnInit} from '@angular/core';
import {ReceptionService} from '../../controller/service/reception.service';
import {MagasinService} from '../../controller/service/magasin.service';
import {CommandeService} from '../../controller/service/commandes/commande.service';
import {CommandeItem} from '../../controller/model/commandes/commande-item.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reception-create',
  templateUrl: './reception-create.component.html',
  styleUrls: ['./reception-create.component.css']
})
export class ReceptionCreateComponent implements OnInit {

  constructor(private commndeService: CommandeService, private receptionservice: ReceptionService, private magasinService: MagasinService) {
  }

  ngOnInit() {
    this.magasinService.findAll();
  }

  ;

  public saveReception() {
    this.receptionservice.saveReception();
  }

  public addReceptionItem() {
    if (this.commandeItems != null) {
      let commandeItem = this.commandeItems.find(a => a.referenceProduit == this.receptionItem.referenceProduit);
      if (commandeItem != null) {
        if (parseFloat(String(commandeItem.qte)) - parseFloat(String(commandeItem.qteReception)) < parseFloat(String(this.receptionItem.qte))) {
          Swal.fire({
            title: 'Erreur !',
            text: 'Il faut regler la qunatite',
            type: 'error',
            confirmButtonText: 'ok'
          });
        } else {
          commandeItem.qteReception = parseFloat(String(commandeItem.qteReception)) + parseFloat(String(this.receptionItem.qte));
          this.receptionservice.addReceptionItem();
        }
      }
    }


  }

  public get reception() {
    return this.receptionservice.receptionCreate;
  }

  public get receptionItem() {
    return this.receptionservice.receptionItemCreate;
  }

  public get receptionItems() {
    return this.receptionservice.receptionCreate.receptionItems;
  }

  public get magasins() {
    return this.magasinService.magasins;
  }

  public deleteReceptionItems(item) {
    if (this.commandeItems != null) {
      let commandeItem = this.commandeItems.find(a => a.referenceProduit == item.referenceProduit);
      if (commandeItem != null) {
        commandeItem.qteReception = parseFloat(String(commandeItem.qteReception)) - parseFloat(String(item.qte));
        this.receptionservice.deleteReceptionItems(item);
        
      }
    }
  }

  public get commandeItems() {
    return this.commndeService.commandeItemsReception;
  }

  public findCommndeItems() {
    this.commndeService.findCommandeItemsReceptionByReference(this.reception.referenceCommande);
  }

}
