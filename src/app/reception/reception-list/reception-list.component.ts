import {Component, OnInit} from '@angular/core';
import {ReceptionService} from '../../controller/service/reception.service';
import {Reception} from '../../controller/model/reception.model';

@Component({
  selector: 'app-reception-list',
  templateUrl: './reception-list.component.html',
  styleUrls: ['./reception-list.component.css']
})
export class ReceptionListComponent implements OnInit {

  constructor(private receptionService: ReceptionService) {
  }

  ngOnInit() {
    this.receptionService.findAll();
  }

  public get receptions() {
    return this.receptionService.receptions;
  }

  public get receptionSearch() {
    return this.receptionService.receptionSearch;
  }

  public findReceptionItemsByReceptionReference(reception: Reception) {
    this.receptionService.findReceptionItemsByReceptionReference(reception);
  }

  get receptionSelected() {
    return this.receptionService.receptionSelected;
  }

  public findByQuery() {
    this.receptionService.findByQuery();
  }
}
