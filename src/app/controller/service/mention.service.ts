import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Mention} from "../model/mention.model";
import {Element} from "../model/element.model";
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MentionService {
  private _url = 'http://localhost:8099/sample-faculte-EvaluationPersonnel/mentionsNote/';
  private _url1 = 'http://localhost:8099/sample-faculte-EvaluationPersonnel/mentionsNote/reference/';
  private _url2 = 'http://localhost:8099/sample-faculte-EvaluationPersonnel/mentionsNote/reference/RefLib/';
  private _url3 = 'http://localhost:8099/sample-faculte-EvaluationPersonnel/mentionsNote/reference/NoteMax/';
  private _url4 = 'http://localhost:8099/sample-faculte-EvaluationPersonnel/mentionsNote/reference/NoteMin/';

  private _listeMention:Array<Mention>;
  private _mentionCreate :Mention = new Mention('','',0,0);
  private _mentionCreate1 :Mention = new Mention('','',0,0);
  private _mentionCreate2 :Mention = new Mention('','',0,0);


  constructor(private http: HttpClient) { }



  public saveMention() {
    if(this.mentionCreate.reference==='' || this.mentionCreate.libelle===''){
      Swal.fire({
        title: 'Erreur!',
        text: "Manque d'infos:Référence ou libellé",
        type: 'error',
      });
    }
    else {

      this.http.post(this._url, this._mentionCreate).subscribe(
        (res) => {
          if (res == 1) {
            Swal.fire({
              title: 'Création Mention',
              text: 'Création réussite',
              type: 'success',
            });
            let mentionclone = new Mention(this._mentionCreate.reference, this._mentionCreate.libelle, this._mentionCreate.noteMin, this._mentionCreate.noteMax);
            this._listeMention.push(mentionclone);
            this._mentionCreate = new Mention('', '', 0, 0);
          } else if (res == -1) {
            Swal.fire({
              title: 'Erreur!',
              text: 'Mention existe déjà',
              type: 'error',
            });
          } else {
            Swal.fire({
              title: 'Erreur!',
              text: "L'intervalle de cette mention existe déjà ",
              type: 'error',
            });
          }


        });
    }
  }
  public findAll(){

    this.http.get<Array<Mention>>(this._url).subscribe(
      data => {
        this._listeMention = data;
      },
      error1 => {
        console.log('error while loading mentions...');
      }
    );
  }

  public deleteMention(mentionSupp:Mention) {
    Swal.fire({
      title: 'Suppression',
      text: "Vous voulez vraiment supprimer cette mention",
      type: 'warning',
      showCancelButton: true,
      cancelButtonText:'Annuler',
      confirmButtonColor: '#d6000a',
      cancelButtonColor: '#ddc800',
      confirmButtonText: 'Supprimer'
    }).then((result) => {
      if (result.value) {

        this.http.delete(this._url1+mentionSupp.reference).subscribe( 
          (res) => {
            if(res==1){
              const index: number = this._listeMention.indexOf(mentionSupp); 
              if (index !== -1) { 
                this._listeMention.splice(index, 1);
              }


              Swal.fire({
                title: 'Suppression Mention',
                text: 'Suppression réussite',
                type: 'success',
              });

            }


            else {
              Swal.fire({
                title: 'Erreur!',
                text: 'Suppression échouée:Erreur Inconnue',
                type: 'error',
              });
            }


          },

        );



      }
    });

  }
  public findByReference(mention:Mention){
    this.http.get<Mention>(this._url1+mention.reference).subscribe(
      data => {
        this._mentionCreate2 = data;
      },
      error => {
        console.log('error while loading the mention...');
      }
    );

  }

  public editReference(mentionEdit:Mention,nvmention:Mention){
    Swal.fire({
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

        this.http.put(this._url2+mentionEdit.reference,nvmention).subscribe( 
          (res) => {
            if(res==1){
              this.findAll(); 
              this._mentionCreate1 = new Mention('','',0,0); 
              this.findByReference(nvmention); 
              Swal.fire({
                title: 'Modification mention',
                text: 'Modification réussite',
                type: 'success',
              });

            }
            else if(res==-1 || res==-2) {
              this.findByReference(mentionEdit);

              Swal.fire({
                title: 'Erreur!',
                text: "Manque d'informations: Référence ou libellé",
                type: 'error',
              });
            }

            else if(res==-3) {
              this.findByReference(mentionEdit);
              Swal.fire({
                title: 'Erreur!',
                text: 'Modification échouée:Mention deja existante',
                type: 'error',
              });
            }
            else {
              this.findByReference(mentionEdit);
              Swal.fire({
                title: 'Erreur!',
                text: 'Modification échouée:Erreur Inconnue',
                type: 'error',
              });

            }


          },

        );



      }
    });


  }



  public editNotemax(mentionEdit:Mention,nvmention:Mention){
    Swal.fire({
      title: 'Modification',
      text: "Vous êtes sûr de la modification",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d6d20b',
      cancelButtonText:'Annuler',

      cancelButtonColor: '#d33',
      confirmButtonText: 'Modifier'
    }).then((result) => {
      if (result.value) {

        this.http.put(this._url3+mentionEdit.reference,nvmention).subscribe( 
          (res) => {
            if(res==1){
              this.findAll(); 
              this._mentionCreate1 = new Mention('','',0,0); 
               this.findByReference(mentionEdit); 

              Swal.fire({
                title: 'Modification Mention',
                text: 'Modification réussite',
                type: 'success',
              });

            }
            else if (res==-1 || res ==-2) {
              Swal.fire({
                title: 'Erreur!',
                text: 'Modification échouée:La note max doit etre supérieure à la note min',
                type: 'error',
              });
            }

            else {
              Swal.fire({
                title: 'Erreur!',
                text: 'Modification échouée:Erreur Inconnue',
                type: 'error',
              });
            }


          },

        );



      }
    });

  }
  public editNotemin(mentionEdit:Mention,nvmention:Mention){
    Swal.fire({
      title: 'Modification',
      text: "Vous êtes sûr de la modification",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d6d20b',
      cancelButtonText:'Annuler',

      cancelButtonColor: '#d33',
      confirmButtonText: 'Modifier'
    }).then((result) => {
      if (result.value) {

        this.http.put(this._url4+mentionEdit.reference,nvmention).subscribe(
          (res) => {
            if(res==1){
              this.findAll();
              this._mentionCreate1 = new Mention('','',0,0);
              this.findByReference(mentionEdit);

              Swal.fire({
                title: 'Modification Mention',
                text: 'Modification réussite',
                type: 'success',
              });

            }
            else if (res==-1 || res==-2) {
              this.findByReference(mentionEdit);

              Swal.fire({
                title: 'Erreur!',
                text: 'Modification échouée:La note min doit etre inférieure à la note max',
                type: 'error',
              });
            }
            else {
              this.findByReference(mentionEdit);

              Swal.fire({
                title: 'Erreur!',
                text: 'Modification échouée:Erreur Inconnue',
                type: 'error',
              });
            }


          },

        );



      }
    });


  }


  get url1(): string {
    return this._url1;
  }

  set url1(value: string) {
    this._url1 = value;
  }

  get url2(): string {
    return this._url2;
  }

  set url2(value: string) {
    this._url2 = value;
  }

  get url3(): string {
    return this._url3;
  }

  set url3(value: string) {
    this._url3 = value;
  }

  get url4(): string {
    return this._url4;
  }

  set url4(value: string) {
    this._url4 = value;
  }

  get mentionCreate1(): Mention {
    return this._mentionCreate1;
  }

  set mentionCreate1(value: Mention) {
    this._mentionCreate1 = value;
  }

  get mentionCreate2(): Mention {
    return this._mentionCreate2;
  }

  set mentionCreate2(value: Mention) {
    this._mentionCreate2 = value;
  }

  get mentionCreate(): Mention {
    return this._mentionCreate;
  }

  set mentionCreate(value: Mention) {
    this._mentionCreate = value;
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get listeMention(): Array<Mention> {
    if(this._listeMention==null){
      this._listeMention=new Array<Mention>();
    }

    return this._listeMention;
  }

  set listeMention(value: Array<Mention>) {
    this._listeMention = value;
  }

}

