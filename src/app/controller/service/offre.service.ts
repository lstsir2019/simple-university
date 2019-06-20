import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Offre} from '../model/offre.model';
import {OffreDetail} from '../model/offre-detail.model';
import {Fournisseur} from '../model/commandes/fournisseur.model';

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  private _urlAppelOffre = 'http://localhost:4682/AppelOffre/AppelOffres/';

  private _url = 'http://localhost:4682/appelOffre-api/offres/';
  private urlOffreDetail = 'http://localhost:4682/appelOffre-api/offreDetails';
  private _url1: string = 'http://localhost:8090/faculte-commande/fournisseurs/finAll';


  public offreCreate: Offre = new Offre();
  private _offreSelected: Offre = new Offre();
  public offreDetailCreate: OffreDetail = new OffreDetail('', 0, 0, 0);
  public offreDetailsSearch: Array<OffreDetail> = new Array<>();
  public offresSearch: Array<Offre> = new Array<>();
  public _fournisseurs: Array<Fournisseur>;

  constructor(private http: HttpClient) {
    this.offreCreate.montantTtc = 0;
    this.offreCreate.tva = 0;
  }

  saveOffre() {
    this.http.post<Offre>(this._url, this.offreCreate).subscribe(
      data => {
        console.log('ok');
        this.offreCreate = new Offre();
        this.offreDetailCreate = new OffreDetail('', 0, 0, 0);
      }, error => {
        console.log(error);
      });

  }

  addOffreDetail() {

    this.offreCreate.montantHt += this.offreDetailCreate.prixUnitaire * this.offreDetailCreate.quantite;
    this.offreDetailCreate.total = this.offreDetailCreate.prixUnitaire * this.offreDetailCreate.quantite;
    this.offreCreate.montantTtc = this.offreCreate.montantHt * (1 + this.offreCreate.tva / 100);
    let offreDetailClone = new OffreDetail(this.offreDetailCreate.refProduit, this.offreDetailCreate.prixUnitaire, this.offreDetailCreate.quantite, this.offreDetailCreate.total);
    this.offreCreate.offreDetailsVo.push(offreDetailClone);
    this.offreDetailCreate = new OffreDetail('', 0, 0, 0);
  }

  findByAppelOffreRefernce(appelOffreReference: string) {
    this.http.get<Array<Offre>>(this._url + '/apeloffre/reference/' + appelOffreReference).subscribe(
      data => {
        console.log('ok');
        this.offresSearch = data;
      }, error => {
        console.log(error);
      });
  }

  offreDetailByOffreReference(reference: string) {
    this.http.get<Array<OffreDetail>>(this.urlOffreDetail + '/offre/reference/' + reference).subscribe(
      data => {
        console.log('ok');
        this.offreDetailsSearch = data;
      }, error => {
        console.log(error);
      });
  }

  allFournisseur() {
    this.http.get<Array<Fournisseur>>(this._url1).subscribe(
      data => {
        console.log('ok');
        this._fournisseurs = data;

      }, error => {
        console.log(error);
      }
    );
  }

  removeOffre(a: Offre) {
    this.http.delete<number>(this._url + '/reference/' + a.reference).subscribe(
      data => {
        if (data > 0) {
          console.log('ok');
          let index: number = this.offresSearch.indexOf(a);
          this.offresSearch.splice(index, 1);
        } else {
          console.log('Problem:' + data);
        }
      }, error => {
        console.log(error);
      });
  }

  public findOffreSelectedByRefernceAppelOffre(ref: string) {
    this.http.get<Offre>(this._urlAppelOffre + '/refrence/' + ref + '/selected').subscribe(
      data => {
        this._offreSelected = data;
        console.log(data);
      }, error => {
        console.log('erroooor while loading AppelOffre details....');
      }
    );
  }
  chekBestOffre(a: Offre) {
    this.http.put<number>(this._urlAppelOffre + '/offre/reference/' + a.reference, a).subscribe(
      data => {
        console.log('ok');
      }, error => {
        console.log('error' + error);
      }
    );
  }
  get offreSelected(): Offre {
    return this._offreSelected;
  }

  set offreSelected(value: Offre) {
    this._offreSelected = value;
  }
}
