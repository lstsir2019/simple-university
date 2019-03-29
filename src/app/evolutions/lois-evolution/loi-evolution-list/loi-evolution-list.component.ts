import {Component, OnInit} from '@angular/core';
import {LoiEvolutionService} from "../../../controller/service/evolutions/loi-evolution.service";
import {LoiEvolution} from "../../../controller/model/evolution/loi-evolution.model";

@Component({
  selector: 'app-loi-evolution-list',
  templateUrl: './loi-evolution-list.component.html',
  styleUrls: ['./loi-evolution-list.component.css']
})
export class LoiEvolutionListComponent implements OnInit {

  public localLoiEvolutionToEdit = new LoiEvolution('', '', '', '');

  constructor(private loiEvolutionService: LoiEvolutionService) {
  }

  ngOnInit() {
  }

  public get loisEvolution() {
    return this.loiEvolutionService.loisEvolution;
  }

  public get searchInput() {
    return this.loiEvolutionService.searchInput;
  }

  public set searchInput(data) {
    this.loiEvolutionService.searchInput = data;
  }


  toggleLoiEvolution(data) {
    // @ts-ignore
    $('#modalEditLoiEvolution').modal('show');
    this.localLoiEvolutionToEdit = new LoiEvolution(data.reference, data.dateDebut, data.dateFin, data.description);
  }

  editLoiEvolution() {
    this.loiEvolutionService.modifierLoiEvolution(this.localLoiEvolutionToEdit)
  }

  deleteLoiEvolution(data) {
    this.loiEvolutionService.deleteLoiEvolution(data);
  }

  search() {
    this.loiEvolutionService.search();
  }

  getAll() {
    this.loiEvolutionService.getLoisEvolutionsFromDatabase();
  }
}
