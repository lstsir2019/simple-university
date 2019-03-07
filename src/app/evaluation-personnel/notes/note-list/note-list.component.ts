import { Component, OnInit } from '@angular/core';
import {NoteService} from '../../../controller/service/note.service';
import {NoteAnnuel} from '../../../controller/model/note-annuel.model';


@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.noteService.findAllNotesAnnuel();

  }
  public get findNotesAnnuels(){
    return     this.noteService.findAllNotesAnnuel();

  }
  public get listeNotesAnnuels(){
    return this.noteService.listeNotesAnnuel;
  }
  public deleteNoteAnnuel(noteAnnuelSupp){
    return this.noteService.deleteNoteAnnuel(noteAnnuelSupp);
  }

  public findNoteElements(noteAnnuel: NoteAnnuel){
    return this.noteService.findNotesElementsByNoteAnnuel(noteAnnuel);
  }
  public get selectedNoteAnnuel(){
    return this.noteService.noteAnnuelSelected;
  }
  public get listeNoteElements(){
    return this.noteService.listeNoteElements;
  }

}
