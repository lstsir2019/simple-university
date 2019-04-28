import { Component, OnInit } from '@angular/core';
import {NoteService} from '../../../controller/service/note.service';
import {Note} from '../../../controller/model/note.model';

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
  public get note2(){
    return this.noteService.noteCreate2;
  }

  public findNoteElement(noteElement:Note){
    return this.noteService.findNoteElement(noteElement);
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
  /*public validateUpdateElement(note){
    return this.noteService.validatUpdatedElement(note);
  }*/

  public get notesElements() {
    return this.noteService.noteAnnuelCreate.notesElementVo;
  }

  public get listElements() {
    return this.noteService.listelements;
  }

  public get note() {
    return this.noteService.noteCreate;
  }
  public get note3() {
    return this.noteService.noteCreate3;
  }
  public updateReferencePersonnel(){
    return this.noteService.updateReferencePersonnel();
  }

  public updateReferenceEvaluateur(){
    return this.noteService.updateReferenceEvaluateur();
  }
  public updateObs(){
    return this.noteService.updateObservation();
  }
  public updateNote(){
    return this.noteService.updateNoteElement();
  }
  public updateElement(){
    return this.noteService.updateElement();
  }

  public get noteAnnuel() {
    return this.noteService.noteAnnuelCreate;
  }
  public  saveNoteAnnuel(){
    return this.noteService.saveNoteAnnuel();
  }

  public addNoteElement(selectedElement) {
    return this.noteService.addNoteElement(selectedElement);

  }
  selectedElement: string = '';
  selectedElement2: string = '';

  //event handler for the select element's change event
  selectChangeHandler (event: any) {
    //update the ui
    this.selectedElement = event.target.value;
  }
  selectChangeHandler2 (event: any) {
    //update the ui
    this.selectedElement2 = event.target.value;
  }

}

