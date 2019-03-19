import { Injectable } from '@angular/core';
import {Note} from "../model/note.model";
import {NoteAnnuel} from "../model/note-annuel.model";
import {HttpClient} from "@angular/common/http";
import {Element} from "../model/element.model";
import {Mention} from "../model/mention.model";
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private _elementVoCreate:Element=new Element('','',0,0);
  private _noteCreate:Note=new Note('','',0,'',this._elementVoCreate);
  private _noteCreateValidate:Note=new Note('','',0,'',this._elementVoCreate);

  private _noteAnnuelCreate:NoteAnnuel=new NoteAnnuel('AAAA-MM-JJ','','',0);
  private _noteAnnuelCreate2:NoteAnnuel=new NoteAnnuel('AAAA-MM-JJ','','',0);
  private _noteCreate2:Note=new Note('','',0,'',this._elementVoCreate);
  private _listeNotesAnnuel:Array<NoteAnnuel>;
  private _url = 'http://localhost:8099/sample-faculte-EvaluationPersonnel/elementsDevaluation/';
  private _listelements:Array<Element>;
  private _listeNoteElements:Array<Note>;
  private _noteAnnuelSelected:NoteAnnuel=new NoteAnnuel('AAAA-MM-JJ','','',0);

  private _url1 = 'http://localhost:8099/sample-faculte-EvaluationPersonnel/elementsDevaluation/reference/';
  private _elementCreate2 :Element = new Element('','',0,0);

  private _url3 = 'http://localhost:8099/sample-faculte-EvaluationPersonnel/notePersonnelAnnuel/';
  private _url6 = 'http://localhost:8099/sample-faculte-EvaluationPersonnel/notePersonnelAnnuel/referencePersonnel/';

  private _url5 = 'http://localhost:8099/sample-faculte-EvaluationPersonnel/noteElement/referencePersonnel/';
  private _url7 = 'http://localhost:8099/sample-faculte-EvaluationPersonnel/noteElement/';

  private _url4='http://localhost:8099/sample-faculte-EvaluationPersonnel/mentionsNote/note/';


  constructor(private http: HttpClient) { }

// fonction Test
  public findNoteInModal(){
    this.noteCreate2=this.noteCreate;
  }


  // add la note/Element dans le tableau
  public addNoteElement(selectedElement:Element) {
    this.findByReference(selectedElement);

    if(this._noteCreate.elementEvaluationVo==null) {

      Swal({
        type: 'error',
        title: 'Erreur',
        text: "Veuillez mentionner la référence de l'élément d'évaluation ",
      });
    }
    else {

      if (this._noteCreate.noteElement > this._noteCreate.elementEvaluationVo.baremMax) {

        this._noteCreate = new Note(this._noteCreate.referencePersonnel, this._noteCreate.referenceEvaluateur, 0, this._noteCreate.observation, this._noteCreate.elementEvaluationVo);

        Swal({
          type: 'error',
          title: 'Erreur',
          text: 'La note donnée est supérieure au barem Max',
        });
      }
      /*else if (this._noteCreate.elementEvaluationVo.reference == '') {
        this.findByReference(selectedElement);

        this._noteCreate = new Note(this._noteCreate.referencePersonnel, this._noteCreate.referenceEvaluateur, this._noteCreate.noteElement, this._noteCreate.observation, this._elementVoCreate);

        Swal({
          type: 'error',
          title: 'Erreur',
          text: "Veuillez mentionner la référence de l'élément d'évaluation ",
        });
      }*/
      else {


        this._noteAnnuelCreate.totalNote += this._noteCreate.noteElement;
        let noteElementClone = new Note(this._noteCreate.referencePersonnel, this._noteCreate.referenceEvaluateur, this._noteCreate.noteElement, this._noteCreate.observation, this._noteCreate.elementEvaluationVo);

        this._noteAnnuelCreate.notesElementVo.push(noteElementClone);
        this._noteCreate = new Note(this._noteCreate.referencePersonnel, this._noteCreate.referenceEvaluateur, 0, '', this._elementVoCreate);
        Swal({
          position: 'top-end',
          type: 'success',
          title: 'Note enregistrée',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }

  }


  // avoir la note/Element séléctonnée dans le tableau pour la modification
  public findNoteElement(noteElement:Note){
    for (let i of this.noteAnnuelCreate.notesElementVo) {
      if(i==noteElement){
this.noteCreate2=noteElement;
      }
    }
  }


  //Definir la mention
  public definirMention(){
    this.http.get<Mention>(this._url4+this.noteAnnuelCreate.totalNote).subscribe(
      data => {
        this.noteAnnuelCreate.mentionNoteVo=data;
      },
      error => {
        console.log('error while loading Mention...');
      }
    );
  }




  //Get Element
  public findByReference(element:Element){
    this.http.get<Element>(this._url1+element.reference).subscribe(
      data => {
        this._noteCreate.elementEvaluationVo=data;
      },
      error => {
        console.log('error while loading the element...');
      }
    );

  }

//Get touts les elements
  public  findAll(){

    this.http.get<Array<Element>>(this._url).subscribe(
      data => {
        this._listelements = data;
      },
      error => {
        console.log('error while loading elements...');
      }
    );
  }

  /*
  public get validationNote(){
    this.http.get<Note>(this._url7+"/validation",this._noteCreate).subscribe(
      data => {
         this._noteCreateValidate= data;
      },
      error => {
        console.log('error while loading noteElement...');
      }
    );
  }
  */





  // Get toutes les notes Annuels
  public  findAllNotesAnnuel(){

    this.http.get<Array<NoteAnnuel>>(this._url3).subscribe(
      data => {
        this._listeNotesAnnuel = data;
      },
      error => {
        console.log('error while loading notes annuels...');
      }
    );
  }





  // Recherche des notes Annuels par reference
  public  findNotesAnnuelByReference(referencePersonnel:String){

    this.http.get<Array<NoteAnnuel>>(this._url6+referencePersonnel).subscribe(
      data => {
        this._listeNotesAnnuel = data;
      },
      error => {
        console.log('error while loading notes annuels...');
      }
    );
  }





  //Get la list des notes /Elements pour chaque note Annuel
  public  findNotesElementsByNoteAnnuel(noteAnnuel:NoteAnnuel) {
    this._noteAnnuelSelected=noteAnnuel;
    //if (this._noteAnnuelSelected != null) {
    this.http.get<Array<Note>>(this._url5+this._noteAnnuelSelected.referencePersonnel+"/dateDevaluation/"+this._noteAnnuelSelected.dateDevaluation).subscribe(
      data => {
        this._noteAnnuelSelected.notesElementVo = data;
      },
      error => {
        console.log('error while loading notes elements...');
      }
    );
    //}
  }



  // Création de la note annuel avec les note /Elements
  public saveNoteAnnuel() {
    this.http.post< NoteAnnuel>(this._url3, this._noteAnnuelCreate).subscribe(
      data => {
        console.log('ok');
        this.definirMention();
        let noteAnnuelclone= new NoteAnnuel(this.noteAnnuelCreate.dateDevaluation,this.noteAnnuelCreate.referencePersonnel,this.noteAnnuelCreate.referenceEvaluateur,this.noteAnnuelCreate.totalNote);
        noteAnnuelclone.mentionNoteVo=this.noteAnnuelCreate.mentionNoteVo;
        noteAnnuelclone.notesElementVo=this.noteAnnuelCreate.notesElementVo;
        this._listeNotesAnnuel.push(noteAnnuelclone);
        this.noteAnnuelCreate=new NoteAnnuel('','','',0);
        this.noteAnnuelCreate.mentionNoteVo=new Mention('','',0,0);
        this.noteAnnuelCreate.notesElementVo=new Array<Note>();
        this.findAllNotesAnnuel();


      },

      error => {
        console.log('error');
      }
    );



  }






  //Suppression de la note annuel et de ses notes /Element
  public deleteNoteAnnuel(noteAnnuelSupp:NoteAnnuel) {
    this.http.delete(this._url6+noteAnnuelSupp.referencePersonnel+'/dateDevaluation/'+noteAnnuelSupp.dateDevaluation).subscribe(
      data => {
        console.log("ok");
        const index: number = this._listeNotesAnnuel.indexOf(noteAnnuelSupp);
        if (index !== -1) {
          this._listeNotesAnnuel.splice(index, 1);
        }

      },
      error => {
        console.log('error while deleting Note Annuel...');
      }
    );


  }










  //Suppression de la  note /Element dans la table des notes /Elements avant la création dans la BD
  public deleteNote(noteSupp:Note) {
    Swal({
      title: 'Etes vous sûrs de la suppression',
      text: "Cette note sera supprimer de façon définitive",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Supprimer'
    }).then((result) => {
      if (result.value) {
        const index: number = this._noteAnnuelCreate.notesElementVo.indexOf(noteSupp);
        if (index !== -1) {
          this._noteAnnuelCreate.notesElementVo.splice(index, 1);
        }
        Swal({
          type: 'success',
          title: 'Suppression',
          text: 'Note Supprimée',
        });
      }
    })


  }







































  get url6(): string {
    return this._url6;
  }

  set url6(value: string) {
    this._url6 = value;
  }

  get url4(): string {
    return this._url4;
  }

  set url4(value: string) {
    this._url4 = value;
  }

  get elementVoCreate(): Element {
    return this._elementVoCreate;
  }

  set elementVoCreate(value: Element) {
    this._elementVoCreate = value;
  }

  get url3(): string {
    return this._url3;
  }

  set url3(value: string) {
    this._url3 = value;
  }

  get url1(): string {
    return this._url1;
  }

  set url1(value: string) {
    this._url1 = value;
  }

  get elementCreate2(): Element {
    return this._elementCreate2;
  }

  set elementCreate2(value: Element) {
    this._elementCreate2 = value;
  }

  get noteCreate(): Note {
    return this._noteCreate;
  }

  set noteCreate(value: Note) {
    this._noteCreate = value;
  }

  get noteAnnuelCreate(): NoteAnnuel {
    return this._noteAnnuelCreate;
  }

  set noteAnnuelCreate(value: NoteAnnuel) {
    this._noteAnnuelCreate = value;
  }

  get listeNotesAnnuel(): Array<NoteAnnuel> {
    if(this._listeNotesAnnuel==null){
      this._listeNotesAnnuel=new Array<NoteAnnuel>();
    }
    return this._listeNotesAnnuel;
  }

  set listeNotesAnnuel(value: Array<NoteAnnuel>) {
    this._listeNotesAnnuel = value;
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get listelements(): Array<Element> {
    if(this._listelements==null){
      this._listelements=new Array<Element>();
    }    return this._listelements;
  }

  set listelements(value: Array<Element>) {
    this._listelements = value;
  }

  get listeNoteElements(): Array<Note> {
    if(this._listeNoteElements==null){
      this._listeNoteElements=new Array<Note>();
    }
    return this._listeNoteElements;
  }

  set listeNoteElements(value: Array<Note>) {
    this._listeNoteElements = value;
  }

  get url5(): string {
    return this._url5;
  }

  set url5(value: string) {
    this._url5 = value;
  }

  get noteAnnuelSelected(): NoteAnnuel {
    return this._noteAnnuelSelected;
  }

  set noteAnnuelSelected(value: NoteAnnuel) {
    this._noteAnnuelSelected = value;
  }

  get noteAnnuelCreate2(): NoteAnnuel {
    return this._noteAnnuelCreate2;
  }

  set noteAnnuelCreate2(value: NoteAnnuel) {
    this._noteAnnuelCreate2 = value;
  }

  get noteCreate2(): Note {
    return this._noteCreate2;
  }

  set noteCreate2(value: Note) {
    this._noteCreate2 = value;
  }


  get url7(): string {
    return this._url7;
  }

  set url7(value: string) {
    this._url7 = value;
  }
}
