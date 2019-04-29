import {Injectable} from '@angular/core';
import {AppelOffre} from '../model/appel-offre.model';
import {AppelOffreDetail} from '../model/appel-offre-detail.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppelOffreService {

  private _url = 'http://localhost:8090/AppelOffre/AppelOffres/';
  private _appelOffreCreate: AppelOffre = new AppelOffre('', 0, 0, 0, 0);
  private _appelOffreDetailCreate: AppelOffreDetail = new AppelOffreDetail('', 0, 0, 0);
  private _appelOffres: Array<AppelOffre>;
  private _appelOffreSelected: AppelOffre;
  public allAppelOffres: Array<AppelOffre> = new Array<AppelOffre>();
  public appleOffreDetailsByReference: Array<AppelOffreDetail> = new Array<AppelOffreDetail>();

  constructor(private http: HttpClient) {
  }


  public addAppelOffreDetail() {
    this.appelOffreCreate.montantHT += this.appelOffreDetailCreate.prixUnitaire * this.appelOffreDetailCreate.quantite;
    this.appelOffreDetailCreate.total = this.appelOffreDetailCreate.prixUnitaire * this.appelOffreDetailCreate.quantite;
    this.appelOffreCreate.montantTTC = this.appelOffreCreate.montantHT * (1 + this.appelOffreCreate.tva / 100);
    this.appelOffreCreate.montantGarantieTemp = this.appelOffreCreate.montantTTC / 10;
    const appelOffreDetailClone = new AppelOffreDetail(this.appelOffreDetailCreate.refProduit, this.appelOffreDetailCreate.prixUnitaire, this.appelOffreDetailCreate.quantite, this.appelOffreDetailCreate.total);
    this.appelOffreCreate.appelOffreDetailVo.push(appelOffreDetailClone);
    this.appelOffreDetailCreate = new AppelOffreDetail('', 0, 0, 0);
  }

  public savAppelOffre() {
    this.http.post<AppelOffre>(this._url, this.appelOffreCreate).subscribe(
      data => {
        console.log('ok');
        this.appelOffreCreate = new AppelOffre('', 0, 0, 0, 0);
        this.appelOffreDetailCreate = new AppelOffreDetail('', 0, 0, 0);
      }, error => {
        console.log(error);
      });

  }

  public findAll() {
    this.http.get<Array<AppelOffre>>(this._url).subscribe(
      data => {
        this.allAppelOffres = data;
        this._appelOffres = data;
      }, error => {
        console.log('erroooor while loading....');
      }
    );
  }

  public findAppelOffreDetailByObjectifAppelOffre(appelOffre: AppelOffre) {
    this._appelOffreSelected = appelOffre;
    if (this.appelOffreSelected != null) {
      this.http.get<Array<AppelOffreDetail>>(this._url + '/objectif/' + this.appelOffreSelected.objectif + '/appeloffre-details').subscribe(
        data => {
          this._appelOffreSelected.appelOffreDetailVo = data;
        }, error => {
          console.log('erroooor while loading AppelOffre details....');
        }
      );
    }
  }

  get appelOffres(): Array<AppelOffre> {
    return this._appelOffres;
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get appelOffreCreate(): AppelOffre {
    return this._appelOffreCreate;
  }

  set appelOffreCreate(value: AppelOffre) {
    this._appelOffreCreate = value;
  }

  get appelOffreDetailCreate(): AppelOffreDetail {
    return this._appelOffreDetailCreate;
  }

  set appelOffreDetailCreate(value: AppelOffreDetail) {
    this._appelOffreDetailCreate = value;
  }

  get appelOffreSelected(): AppelOffre {
    if (this._appelOffreSelected == null) {
      this._appelOffreSelected = new AppelOffre('', 0, 0, 0, 0);

    } else {
      return this._appelOffreSelected;

    }
  }

  public findAppelOffreByRefernce(ref: string) {
    this.http.get<Array<AppelOffreDetail>>(this._url + 'appelOffre/reference/' + ref).subscribe(
      data => {
        this.appleOffreDetailsByReference = data;
      }, error => {
        console.log('erroooor while loading AppelOffre details....');
      }
    );
  }
}
