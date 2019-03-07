import { Injectable } from '@angular/core';
import {Element} from '../model/element.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ElementService {
  private _elementCreate :Element = new Element('','',0,0);
  private _elementCreate1 :Element = new Element('','',0,0);
  private _elementCreate2 :Element = new Element('','',0,0);

  private _url = 'http://localhost:8099/sample-faculte-EvaluationPersonnel/elementsDevaluation/';
  private _url1 = 'http://localhost:8099/sample-faculte-EvaluationPersonnel/elementsDevaluation/reference/';
  private _url2 = 'http://localhost:8099/sample-faculte-EvaluationPersonnel/elementsDevaluation/editReference/reference/';
  private _url3 = 'http://localhost:8099/sample-faculte-EvaluationPersonnel/elementsDevaluation/editbarem/reference/';

  private _listelements:Array<Element>;

  constructor(private http: HttpClient) { }


  public saveElement() {
    this.http.post< Element>(this._url, this._elementCreate).subscribe(
      data => {
        console.log('ok');
        let elementclone= new Element(this._elementCreate.reference,this._elementCreate.libelle,this._elementCreate.baremMin,this._elementCreate.baremMax);
        this._listelements.push(elementclone);
        this._elementCreate= new Element('','',0,0);
      },
      error => {
        console.log('error');
      }

    );
  }

  public deleteElement(elementSupp:Element) {
    this.http.delete(this._url1+elementSupp.reference).subscribe(
      data => {
        console.log("ok");

        const index: number = this._listelements.indexOf(elementSupp);
        if (index !== -1) {
          this._listelements.splice(index, 1);
        }
      },
      error => {
        console.log('error while deleting element...');
      }
    );
  }

  public editReference(elementEdit:Element,nvelement:Element){
    this.http.put<Element>(this._url2+elementEdit.reference,nvelement).subscribe(
      data => {
        console.log("ok");
        this.findAll();
        this._elementCreate1 = new Element('','',0,0);
        //this._elementCreate2 = new Element('','',0,0);
        this.findByReference(nvelement);
      },
      error => {
        console.log('error while updating element...');
      }
    );

  }


  public editBarem(elementEdit:Element,nvelement:Element){
    this.http.put<Element>(this._url3+elementEdit.reference,nvelement).subscribe(
      data => {
        console.log("ok");
        this.findAll();
        this._elementCreate1 = new Element('','',0,0);
        //this._elementCreate2 = new Element('','',0,0);
        this.findByReference(elementEdit);

      },
      error => {
        console.log('error while updating element...');
      }
    );

  }


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
  public findByReference(element:Element){
    this.http.get<Element>(this._url1+element.reference).subscribe(
      data => {
        this._elementCreate2 = data;
        //this._elementCreate= new Element('','',0,0);
      },
      error => {
        console.log('error while loading the element...');
      }
    );

  }


  get elementCreate(): Element {
    return this._elementCreate;
  }

  set elementCreate(value: Element) {
    this._elementCreate = value;
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
    }

    return this._listelements;
  }

  set listelements(value: Array<Element>) {
    this._listelements = value;
  }

  get elementCreate1(): Element {
    return this._elementCreate1;
  }

  set elementCreate1(value: Element) {
    this._elementCreate1 = value;
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


  get elementCreate2(): Element {
    return this._elementCreate2;
  }

  set elementCreate2(value: Element) {
    this._elementCreate2 = value;
  }
}
