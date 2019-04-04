import { Component, OnInit } from '@angular/core';
import {NoteService} from '../../../controller/service/note.service';
import {NoteAnnuel} from '../../../controller/model/note-annuel.model';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import {Note} from '../../../controller/model/note.model';

/*declare var jsPDF: any;*/



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
  public findNoteAnnuelByReference(referencePersonnel){
    return this.noteService.findNotesAnnuelByReference(referencePersonnel);
  }
  public get noteAnnuel(){
    return this.noteService.noteAnnuelCreate2;
  }
  print(data){
    const doc = new jsPDF();
    this.selectedNoteAnnuel.notesElementVo=new Array<Note>();
    this.findNoteElements(data);
    //this.noteService.findNotesElementsByNoteAnnuel(data);
    let j=0;
    doc.text("Evaluation Personnel",10,20);
    doc.text("Reference du personnel : "+data.referencePersonnel,10,40);
    doc.text("Reference Evaluateur : "+data.referenceEvaluateur,10,50);
  /*for (let i of this.selectedNoteAnnuel.notesElementVo){
      doc.text(i.elementEvaluationVo.reference+" "+i.noteElement,10+j,60);
      j=+10;
    }*/

    //doc.autoTable({html: 'notesPersonnel'});

    doc.text("Note : "+ data.totalNote,10,80);
    doc.text("Mention : "+ data.mentionNoteVo.reference,10,90);
    doc.text("Date d'évaluation : "+ data.dateDevaluation,10,100);

    doc.save(data.referencePersonnel+".pdf");
  }

}
