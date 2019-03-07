import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Mention} from "../model/mention.model";
import {Element} from "../model/element.model";

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
    this.http.post< Mention>(this._url, this._mentionCreate).subscribe(
      data => {
        console.log('ok');
        let mentionclone= new Mention(this._mentionCreate.reference,this._mentionCreate.libelle,this._mentionCreate.noteMin,this._mentionCreate.noteMax);
        this._listeMention.push(mentionclone);
        this._mentionCreate= new Mention('','',0,0);
      },
      error1 => {
        console.log('error');
      }

    );
  }
  public findAll(){

    this.http.get<Array<Mention>>(this._url).subscribe(
      data => {
        this._listeMention = data;
      },
      error1 => {
        console.log('error while loading elements...');
      }
    );
  }

  public deleteMention(mentionSupp:Mention) {
    this.http.delete(this._url1+mentionSupp.reference).subscribe(
      data => {
        console.log("ok");
        const index: number = this._listeMention.indexOf(mentionSupp);
        if (index !== -1) {
          this._listeMention.splice(index, 1);
        }

      },
      error => {
        console.log('error while deleting mention...');
      }
    );
  }
  public findByReference(mention:Mention){
    this.http.get<Mention>(this._url1+mention.reference).subscribe(
      data => {
        this._mentionCreate2 = data;
      },
      error => {
        console.log('error while loading the element...');
      }
    );

  }

  public editReference(mentionEdit:Mention,nvmention:Mention){
    this.http.put<Mention>(this._url2+mentionEdit.reference,nvmention).subscribe(
      data => {
        console.log("ok");

        this.findAll();
        this._mentionCreate1 = new Mention('','',0,0);
        //this. _mentionCreate2 = new Mention('','',0,0);
        this.findByReference(nvmention);

      },
      error => {
        console.log('error while updating the reference of  mention...');
      }
    );

  }



  public editNotemax(mentionEdit:Mention,nvmention:Mention){
    this.http.put<Mention>(this._url3+mentionEdit.reference,nvmention).subscribe(
      data => {
        console.log("ok");

        this.findAll();
        this._mentionCreate1 = new Mention('','',0,0);
        //this. _mentionCreate2 = new Mention('','',0,0);
        this.findByReference(mentionEdit);

      },
      error => {
        console.log('error while updating mention...');
      }
    );

  }
  public editNotemin(mentionEdit:Mention,nvmention:Mention){
    this.http.put<Mention>(this._url4+mentionEdit.reference,nvmention).subscribe(
      data => {
        console.log("ok");
        this.findAll();
        this._mentionCreate1 = new Mention('','',0,0);
        //this. _mentionCreate2 = new Mention('','',0,0);
        this.findByReference(mentionEdit);

      },
      error => {
        console.log('error while updating mention...');
      }
    );

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

