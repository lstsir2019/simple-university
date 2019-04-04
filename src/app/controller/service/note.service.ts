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
private _noteTmp:Note=new Note('','',0,'',this._elementVoCreate);
  private _noteAnnuelCreate:NoteAnnuel=new NoteAnnuel('AAAA-MM-JJ','','',0);
  private _noteAnnuelCreate2:NoteAnnuel=new NoteAnnuel('AAAA-MM-JJ','','',0);
  private _noteCreate3:Note=new Note('','',0,'',this._elementVoCreate);

  private _noteCreate2:Note=new Note('','',0,'',this._elementVoCreate);
  private _listeNotesAnnuel:Array<NoteAnnuel>;
  private _url = 'http://localhost:8099/sample-faculte-EvaluationPersonnel/elementsDevaluation/';
  private _listelements:Array<Element>;
  private _listelements2:Array<Element>=new Array<Element>();

  private _listeNoteElements:Array<Note>;
  private _noteAnnuelSelected:NoteAnnuel=new NoteAnnuel('AAAA-MM-JJ','','',0);

  private _url1 = 'http://localhost:8099/sample-faculte-EvaluationPersonnel/elementsDevaluation/reference/';
  private _elementCreate2 :Element = new Element('','',0,0);
  private _validate :number ;

  private _url3 = 'http://localhost:8099/sample-faculte-EvaluationPersonnel/notePersonnelAnnuel/';
  private _url6 = 'http://localhost:8099/sample-faculte-EvaluationPersonnel/notePersonnelAnnuel/referencePersonnel/';

  private _url5 = 'http://localhost:8099/sample-faculte-EvaluationPersonnel/noteElement/referencePersonnel/';
  private _url7 = 'http://localhost:8099/sample-faculte-EvaluationPersonnel/noteElement/';

  private _url4='http://localhost:8099/sample-faculte-EvaluationPersonnel/mentionsNote/note/';
  constructor(private http: HttpClient) { }
/*public validatUpdatedElement(note:Note){
  const index: number = this._noteAnnuelCreate.notesElementVo.indexOf(note);
  if (index !== -1) {
    this._noteAnnuelCreate.notesElementVo.splice(index, 1);
  }
  for (let i of this._noteAnnuelCreate.notesElementVo) {


    if (i.elementEvaluationVo.reference == this._noteCreate2.elementEvaluationVo.reference) {
      this._validate=0;
      break;
    }
    else {
      this._validate=1;
    }
  }
  if(this._validate==0){

    this._noteAnnuelCreate.notesElementVo.push(note);

    Swal({
      type: 'error',
      title: 'Erreur',
      text: "Élément deja évaluer",
    });
  }
  else {
    this._noteAnnuelCreate.notesElementVo.push(this._noteCreate2);
  }

}*/



public updateNoteElement(){

    Swal({
      title: 'Modification',
      text: "Vous êtes sûr de la modification",
      type: 'warning',
      showCancelButton: true,
      cancelButtonText:'Annuler',

      confirmButtonColor: '#d6d20b',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Modifier'
    }).then((result) => {
      if (result.value) {


        if(this._noteCreate2.elementEvaluationVo.baremMax>=this._noteCreate3.noteElement){
          this._noteCreate2.noteElement=this._noteCreate3.noteElement;
          this._noteCreate3=new Note('','',0,'',this._elementVoCreate);

          Swal({
            title: 'Modification Note Element',
            text: 'Modification réussite',
            type: 'success',
          });
        }
        else {
          this._noteCreate3=new Note('','',0,'',this._elementVoCreate);

          Swal({
            type: 'error',
            title: 'Erreur',
            text: 'La note donnée est supérieure au barem Max : Barem Max pour  '+this._noteCreate2.elementEvaluationVo.reference+' : '+this._noteCreate2.elementEvaluationVo.baremMax,
          });

        }


      }



    });

}




public updateObservation(){
  if (this._noteCreate3.observation === '') {
    this._noteCreate3=new Note('','',0,'',this._elementVoCreate);

    Swal({
      type: 'error',
      title: 'Erreur',
      text: "Manque d'infos:la nouvelle observation",
    });
  }
  else {
    Swal({
      title: 'Modification',
      text: "Vous êtes sûr de la modification",
      type: 'warning',
      showCancelButton: true,
      cancelButtonText:'Annuler',

      confirmButtonColor: '#d6d20b',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Modifier'
    }).then((result) => {
      if (result.value) {
        this._noteCreate2.observation=this._noteCreate3.observation;
        this._noteCreate3=new Note('','',0,'',this._elementVoCreate);


        Swal({
          title: 'Modification Observation',
          text: 'Modification réussite',
          type: 'success',
        });

      }



    });
  }
}





public updateReferenceEvaluateur(){
  if (this._noteCreate3.referenceEvaluateur === '') {
    this._noteCreate3=new Note('','',0,'',this._elementVoCreate);

    Swal({
      type: 'error',
      title: 'Erreur',
      text: "Manque d'infos:la nouvelle référence evaluateur",
    });
  }
  else {
    Swal({
      title: 'Modification',
      text: "Vous êtes sûr de la modification",
      type: 'warning',
      showCancelButton: true,
      cancelButtonText:'Annuler',

      confirmButtonColor: '#d6d20b',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Modifier'
    }).then((result) => {
      if (result.value) {
        this._noteCreate2.referenceEvaluateur=this._noteCreate3.referenceEvaluateur;
        this._noteCreate3=new Note('','',0,'',this._elementVoCreate);


        Swal({
          title: 'Modification Référence evaluateur',
          text: 'Modification réussite',
          type: 'success',
        });

      }



    });
  }

}





public updateReferencePersonnel(){
  if (this._noteCreate3.referencePersonnel === '') {
    this._noteCreate3=new Note('','',0,'',this._elementVoCreate);

    Swal({
      type: 'error',
      title: 'Erreur',
      text: "Manque d'infos:la nouvelle référence Personnel",
    });
  }
  else {
    Swal({
      title: 'Modification',
      text: "Vous êtes sûr de la modification",
      type: 'warning',
      showCancelButton: true,
      cancelButtonText:'Annuler',

      confirmButtonColor: '#d6d20b',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Modifier'
    }).then((result) => {
      if (result.value) {
        this._noteCreate2.referencePersonnel=this._noteCreate3.referencePersonnel;
        this._noteCreate3=new Note('','',0,'',this._elementVoCreate);


              Swal({
                title: 'Modification Référence personnel',
                text: 'Modification réussite',
                type: 'success',
              });

            }



  });
}
}





public updateElement(selectedElement2:Element){
  this.findByReferenceUpdate(selectedElement2);
  if (this._noteCreate3.elementEvaluationVo == null) {
    this._noteCreate3=new Note('','',0,'',this._elementVoCreate);

    Swal({
      type: 'error',
      title: 'Erreur',
      text: "Veuillez mentionner la référence de l'élément d'évaluation ",
    });
  }
  else {
    this._noteTmp=this._noteCreate2;
    const index: number = this._noteAnnuelCreate.notesElementVo.indexOf(this._noteCreate2);
    if (index !== -1) {
      this._noteAnnuelCreate.notesElementVo.splice(index, 1);
    }
    for (let i of this._noteAnnuelCreate.notesElementVo) {


      if (i.elementEvaluationVo.reference == this._noteCreate3.elementEvaluationVo.reference) {
        this._validate=0;
        break;
      }
      else {
        this._validate=1;
      }
    }
    if(this._validate==0){
      this._noteAnnuelCreate.notesElementVo.push(this._noteTmp);
      this._noteCreate3=new Note('','',0,'',this._elementVoCreate);

      Swal({
        type: 'error',
        title: 'Erreur',
        text: "Cette élément est déja evalué ",
      });
    }
  else
    {
      Swal({
        title: 'Modification',
        text: "Vous êtes sûr de la modification",
        type: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Annuler',

        confirmButtonColor: '#d6d20b',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Modifier'
      }).then((result) => {
        if (result.value) {


          this._noteTmp.elementEvaluationVo= this._noteCreate3.elementEvaluationVo;
          this._noteAnnuelCreate.notesElementVo.push(this._noteTmp);
      this._noteCreate3=new Note('','',0,'',this._elementVoCreate);

          Swal({
            title: 'Modification Référence personnel',
            text: 'Modification réussite',
            type: 'success',
          });

        }


      });
    }
  }
}






  // add la note/Element dans le tableau
  public addNoteElement(selectedElement:Element) {
    this.findByReference(selectedElement);

    if (this._noteCreate.referencePersonnel === '' || this._noteCreate.referenceEvaluateur === '') {
      Swal({
        type: 'error',
        title: 'Erreur',
        text: "Manque d'infos:Référence evaluateur ou personnel ",
      });
    } else if (this._noteCreate.elementEvaluationVo == null) {

      Swal({
        type: 'error',
        title: 'Erreur',
        text: "Veuillez mentionner la référence de l'élément d'évaluation ",
      });
    }

    else {
      if (this._noteAnnuelCreate.notesElementVo.length == 0){
        if (this._noteCreate.noteElement > this._noteCreate.elementEvaluationVo.baremMax) {

          this._noteCreate = new Note(this._noteCreate.referencePersonnel, this._noteCreate.referenceEvaluateur, 0, this._noteCreate.observation, this._noteCreate.elementEvaluationVo);

          Swal({
            type: 'error',
            title: 'Erreur',
            text: 'La note donnée est supérieure au barem Max : Barem Max pour  '+this._noteCreate.elementEvaluationVo.reference+' : '+this._noteCreate.elementEvaluationVo.baremMax,
          });
        }
        else {
          this._noteAnnuelCreate.totalNote += this._noteCreate.noteElement;
          let noteElementClone = new Note(this._noteCreate.referencePersonnel, this._noteCreate.referenceEvaluateur, this._noteCreate.noteElement, this._noteCreate.observation, this._noteCreate.elementEvaluationVo);
          this._noteAnnuelCreate.notesElementVo.push(noteElementClone);

          this._noteCreate = new Note(this._noteCreate.referencePersonnel, this._noteCreate.referenceEvaluateur, 0, '', this._elementVoCreate);
          Swal({
            position: 'center',
            type: 'success',
            title: 'Note enregistrée',
            showConfirmButton: false,
            timer: 1500
          });
        }
      }



      else {


        for (let i of this._noteAnnuelCreate.notesElementVo) {


          if (i.elementEvaluationVo.reference == this._noteCreate.elementEvaluationVo.reference) {
            this._noteCreate = new Note(this._noteCreate.referencePersonnel, this._noteCreate.referenceEvaluateur, 0, '', this._elementVoCreate);

            this._validate=0;
            break;
          }
          else {
            this._validate=1;
          }
        }
        if(this._validate==1){
          if (this._noteCreate.noteElement > this._noteCreate.elementEvaluationVo.baremMax) {

            this._noteCreate = new Note(this._noteCreate.referencePersonnel, this._noteCreate.referenceEvaluateur, 0, this._noteCreate.observation, this._noteCreate.elementEvaluationVo);

            Swal({
              type: 'error',
              title: 'Erreur',
              text: 'La note donnée est supérieure au barem Max : Barem Max pour  '+this._noteCreate.elementEvaluationVo.reference+' : '+this._noteCreate.elementEvaluationVo.baremMax,
            });
          } else {
            this._noteAnnuelCreate.totalNote += this._noteCreate.noteElement;
            let noteElementClone = new Note(this._noteCreate.referencePersonnel, this._noteCreate.referenceEvaluateur, this._noteCreate.noteElement, this._noteCreate.observation, this._noteCreate.elementEvaluationVo);
            this._noteAnnuelCreate.notesElementVo.push(noteElementClone);

            this._noteCreate = new Note(this._noteCreate.referencePersonnel, this._noteCreate.referenceEvaluateur, 0, '', this._elementVoCreate);
            Swal({
              position: 'center',
              type: 'success',
              title: 'Note enregistrée',
              showConfirmButton: false,
              timer: 1500
            });
          }

        }
        else {
          Swal({
            type: 'error',
            title: 'Erreur',
            text: "Élément déja evalué ",
          });
        }

     }









    }


  }




  // avoir la note/Element séléctonnée dans le tableau pour la modification
  public findNoteElement(noteElement:Note){
    for (let i of this._noteAnnuelCreate.notesElementVo) {
      if(i==noteElement){
this._noteCreate2=noteElement;
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


  public findByReferenceUpdate(element:Element){
    this.http.get<Element>(this._url1+element.reference).subscribe(
      data => {
        this._noteCreate3.elementEvaluationVo=data;
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


    if(this._noteAnnuelCreate.referenceEvaluateur===''){
      Swal({
        title: 'Erreur!',
        text: "Manque d'infos:Référence evaluateur",
        type: 'error',
      });
    }
    else if(this._noteAnnuelCreate.referencePersonnel===''){
      Swal({
        title: 'Erreur!',
        text: "Manque d'infos:Référence personnel ",
        type: 'error',
      });
    }
    else if(this._noteAnnuelCreate.dateDevaluation==='AAAA-MM-JJ'){
      Swal({
        title: 'Erreur!',
        text: "Manque d'infos:Date d'évaluation",
        type: 'error',
      });
    }
    else if(this._noteAnnuelCreate.notesElementVo.length==0){
      Swal({
        title: 'Erreur!',
        text: "Veuillez d'abord saisir les notes pour chaque élément",
        type: 'error',
      });
    }
    else if(this._noteAnnuelCreate.notesElementVo.length!=this.listelements.length){
      Swal({
        title: 'Erreur!',
        text: "Manque de notes:le personnel: "+ this._noteAnnuelCreate.referencePersonnel +" n'as pas été évaluer dans touts les élémenrs",
        type: 'error',
      });
    }


    else {
      for (let i of this._noteAnnuelCreate.notesElementVo) {


        if (i.referencePersonnel != this._noteAnnuelCreate.referencePersonnel) {

          this._validate = 0;
          break;
        } else {
          this._validate = 1;
        }
      }
      if (this._validate == 0) {
        Swal({
          title: 'Erreur!',
          text: "Erreur au niveau des Notes/Éléments : Existance d'une note qui ne convient pas à ce personnel",
          type: 'error',
        });
      }

else {
      this.http.post(this._url3, this._noteAnnuelCreate).subscribe(
        (res) => {
          if (res == 3) {
            Swal({
              title: 'Ajout de la Note annuel',
              text: 'Note annuel enregistrée',
              type: 'success',
            });
            this.definirMention();
            let noteAnnuelclone = new NoteAnnuel(this.noteAnnuelCreate.dateDevaluation, this.noteAnnuelCreate.referencePersonnel, this.noteAnnuelCreate.referenceEvaluateur, this.noteAnnuelCreate.totalNote);
            noteAnnuelclone.mentionNoteVo = this.noteAnnuelCreate.mentionNoteVo;
            noteAnnuelclone.notesElementVo = this.noteAnnuelCreate.notesElementVo;
            this._listeNotesAnnuel.push(noteAnnuelclone);
            this.noteAnnuelCreate = new NoteAnnuel('', '', '', 0);
            this.noteAnnuelCreate.mentionNoteVo = new Mention('', '', 0, 0);
            this.noteAnnuelCreate.notesElementVo = new Array<Note>();
            this.findAllNotesAnnuel();

          } else if (res == -5) {
            Swal({
              title: 'Erreur!',
              text: 'Le personnel: ' + this._noteAnnuelCreate.referencePersonnel + ' a déjà été noté cette année',
              type: 'error',
            });
          } else {
            Swal({
              title: 'Erreur!',
              text: "Manque de notes : le personnel:  " + this._noteAnnuelCreate.referencePersonnel + "  n'as pas été évalué dans touts les éléments",
              type: 'error',
            });
          }


        });
    }
    }


  }






  //Suppression de la note annuel et de ses notes /Element
  public deleteNoteAnnuel(noteAnnuelSupp:NoteAnnuel) {
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
        this.http.delete(this._url6+noteAnnuelSupp.referencePersonnel+'/dateDevaluation/'+noteAnnuelSupp.dateDevaluation).subscribe(          (res) => {
            if(res==1){
              const index: number = this._listeNotesAnnuel.indexOf(noteAnnuelSupp);
              if (index !== -1) {
                this._listeNotesAnnuel.splice(index, 1);
              }


              Swal({
                title: 'Suppression Mention',
                text: 'Suppression réussite',
                type: 'success',
              });

            }


            else {
              Swal({
                title: 'Erreur!',
                text: 'Suppression échouée:Erreur Inconnue',
                type: 'error',
              });
            }


          },

        );

      }
    })




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

  get listelements2(): Array<Element> {
    if(this._listelements2==null){
      this._listelements2=new Array<Element>();
    }    return this._listelements2;
  }

  set listelements2(value: Array<Element>) {
    this._listelements2 = value;
  }

  get validate(): number {
    return this._validate;
  }

  set validate(value: number) {
    this._validate = value;
  }

  get noteCreate3(): Note {
    return this._noteCreate3;
  }

  set noteCreate3(value: Note) {
    this._noteCreate3 = value;
  }

  get noteTmp(): Note {
    return this._noteTmp;
  }

  set noteTmp(value: Note) {
    this._noteTmp = value;
  }
}
