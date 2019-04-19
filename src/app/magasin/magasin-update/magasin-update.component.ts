import {Component, OnInit} from '@angular/core';
import {MagasinService} from "../../controller/service/magasin.service";


@Component({
  selector: 'app-magasin-update',
  templateUrl: './magasin-update.component.html',
  styleUrls: ['./magasin-update.component.css']
})
export class MagasinUpdateComponent implements OnInit {

  constructor(private magasinService: MagasinService) {
  }

  get magasinSelected() {
    return this.magasinService.magasinSelected;
  }

  ngOnInit() {
  }

  public saveUpdate() {
    this.magasinService.upDate();
  }
}
