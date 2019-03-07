import { Component, OnInit } from '@angular/core';
import {NoteService} from '../../../controller/service/note.service';

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.css']
})
export class NoteCreateComponent implements OnInit {

  constructor(private noteService: NoteService) {
  }

  ngOnInit() {
    this.noteService.findAll();
  }
  public deleteNote(noteSupp){
    return this.noteService.deleteNote(noteSupp);
  }


  public get element(){
    return this.noteService.elementCreate2;
  }
  public findByReference(element){
    return this.noteService.findByReference(element);
  }

  public get notesElements() {
    return this.noteService.noteAnnuelCreate.notesElementVo;
  }

  public get listElements() {
    return this.noteService.listelements;
  }

  public get note() {
    return this.noteService.noteCreate;
  }

  public get noteAnnuel() {
    return this.noteService.noteAnnuelCreate;
  }
  public get saveNoteAnnuel(){
    return this.noteService.saveNoteAnnuel();
  }

  public addNoteElement(selectedElement) {
    return this.noteService.addNoteElement(selectedElement);
  }
  selectedElement: string = '';

  //event handler for the select element's change event
  selectChangeHandler (event: any) {
    //update the ui
    this.selectedElement = event.target.value;
  }

}

