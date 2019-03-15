import { Injectable } from '@angular/core';
import {Element} from '../model/element.model';
import {HttpClient} from '@angular/common/http';
import Swal from 'sweetalert2';


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


  public  saveElement() {
    this.http.post(this._url, this._elementCreate).subscribe(
      (res) => {
        if (res == 1) {
          Swal({
            title: 'Création élément',
            text: 'Création réussite',
            type: 'success',
          });
          let elementclone = new Element(this._elementCreate.reference, this._elementCreate.libelle, this._elementCreate.baremMin, this._elementCreate.baremMax);
          this._listelements.push(elementclone);
          this._elementCreate = new Element('', '', 0, 0);
        }
        else if(res == -1) {
          Swal({
            title: 'Erreur!',
            text: 'Élément déjà créer',
            type: 'error',
          });
        }
        else{
          Swal({
            title: 'Erreur!',
            text: 'Le barem de 20 est dépassé',
            type: 'error',
          });
        }


      });
  }

  public deleteElement(elementSupp:Element) {
    Swal({
      title: 'Suppression',
      text: "Vous voulez vraiment supprimer cet élément",
      type: 'warning',
      showCancelButton: true,
      cancelButtonText:'Annuler',
      confirmButtonColor: '#d6000a',
      cancelButtonColor: '#ddc800',
      confirmButtonText: 'Supprimer'
    }).then((result) => {
      if (result.value) {

        this.http.delete(this._url1+elementSupp.reference).subscribe(
          (res) => {
            if(res==1){
              const index: number = this._listelements.indexOf(elementSupp);
              if (index !== -1) {
                this._listelements.splice(index, 1);
              }
              Swal({
                title: 'Suppression élément',
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
    });

  }

  public editReference(elementEdit:Element,nvelement:Element){

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

        this.http.put(this._url2+elementEdit.reference,nvelement).subscribe(
          (res) => {
            if(res==1){
              this.findAll();
              this._elementCreate1 = new Element('','',0,0);
              this.findByReference(nvelement);
              Swal({
                title: 'Modification élément',
                text: 'Modification réussite',
                type: 'success',
              });

            }
            else if(res==-1 || res==-2) {
              Swal({
                title: 'Erreur!',
                text: "Manque d'informations: Référence ou libellé",
                type: 'error',
              });
            }

            else {
              Swal({
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


  public editBarem(elementEdit:Element,nvelement:Element){
    Swal({
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

        this.http.put(this._url3+elementEdit.reference,nvelement).subscribe(
          (res) => {
            if(res==1){
              this.findAll();
              this._elementCreate1 = new Element('','',0,0);
              this.findByReference(elementEdit);

              Swal({
                title: 'Modification élément',
                text: 'Modification réussite',
                type: 'success',
              });

            }
            else if (res==-1) {
              Swal({
                title: 'Erreur!',
                text: 'Modification échouée:Le barem de 20 est dépassé',
                type: 'error',
              });
            }
            else {
              Swal({
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
