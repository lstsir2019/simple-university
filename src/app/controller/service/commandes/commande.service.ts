import {Injectable} from '@angular/core';
import {Commande} from '../../model/commandes/commande.model';
import {CommandeItem} from '../../model/commandes/commande-item.model';
import {HttpClient} from '@angular/common/http';
import {Fournisseur} from '../../model/commandes/fournisseur.model';
import {Paiement} from '../../model/commandes/paiement.model';
import {ExpressionBesoinItem} from '../../model/expression-besoin-item.model';
import {CommandeSource} from '../../model/commandes/commandeSource.model';
import Swal from 'sweetalert2';
import {Stock} from '../../model/stock.model';
import {CategoriProduit} from '../../model/categori-produit.model';
import {Produit} from '../../model/produit.model';
import {getReact} from '../evolutions/Util/SwalReact';


@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private SWAL = getReact('Commande', true);

  private _url: string = 'http://localhost:8090/faculte-commande/commandes/';
  private _url1: string = 'http://localhost:8090/faculte-commande/fournisseurs/finAll';
  private _url3: string = 'http://localhost:8090/faculte-commande/paiementes/reference/';
  private _url4: string = 'http://localhost:8090/faculte-commande/paiementes';

  private _commandeCreate: Commande = new Commande('', 0, '', '', '', '');
  private _commandeItemCreate: CommandeItem = new CommandeItem('', 0, 0,0,0);
  private _commande: Commande = new Commande('', 0, '', '', '', '');
  private _commandes: Array<Commande>;
  private _commandeSelected: Commande;
  private _paiementCreate: Paiement = new Paiement(0,0,'','');
  private _fournisseurs: Array<Fournisseur>;
  public produits: Array<Produit>;
  private _categories: Array<CategoriProduit>;
  public commandeItems: Array<CommandeItem>;
  public expressionBesoinItems: Array<ExpressionBesoinItem>;
  public expressionBesoinItemSelect: ExpressionBesoinItem;
  public commandeSourceCreate: CommandeSource = new CommandeSource(0, '',0);
  public commandeItemSelected: CommandeItem;
  public commandecherch: Commande = new Commande('', 0, '', '', '', '');
  private _fournisseurCreate: Fournisseur = new Fournisseur('', '', '');
  public fournisseurtrover: Fournisseur;
  public commandeItemsReception: Array<CommandeItem>;
  public commandeSources : Array<CommandeSource>;

  constructor(private http: HttpClient) {
  }

  //======================function=======================
  public addCommandeItem() {
    this.commandeCreate.total += this.commandeItemCreate.prix * this.commandeItemCreate.qte;
    let commandeItemClone = new CommandeItem(this.commandeItemCreate.referenceProduit, this.commandeItemCreate.qte, this.commandeItemCreate.prix, this.commandeItemCreate.id, this.commandeItemCreate.qteAffecte);
    this.commandeCreate.commandeItemVos.push(commandeItemClone);
    this.commandeItemCreate = new CommandeItem('', 0, 0,0,0);
  }

  public findAll() {
    this.http.get<Array<Commande>>(this.url).subscribe(
      data => {
        console.log(data);
        this.commandes = data;
      }, error => {
        console.log('Error' + error);
      }
    );
  }

  public saveCommande() {
    this.http.post<number>(this._url, this.commandeCreate).subscribe({
      next: data => {
        if (data == -2) {
          Swal({
            title: 'cannot save !',
            text: 'Référence déja utilisé',
            type: 'error',
          });
        }
        if (data == 1) {
          Swal({
            title: 'info !',
            text: 'Commande ajouter avec success',
            type: 'success',
          });
          this.findAll();
        }
        console.log('ok');
        this.commandeCreate = new Commande('', 0, '', '', '', '');
        this.commandeItemCreate = new CommandeItem('', 0, 0,0,0);
      }, error: error => {
        console.log('erreur');
      }
    });
  }


  public findCommandeItemsByCommandeReference() {

    if (this.commande != null) {
      this.http.get<Array<CommandeItem>>('http://localhost:8090/faculte-commande/commandes/reference/' + this._commande.reference + '/commande-items').subscribe(
        data => {
          this.commandeItems = data;
        }, error => {
          console.log(error);
        }
      );
    }
  }

  public payerCommande() {
    this.http.post<number>(this._url4 + '/referenceCommande/' + this.commandeSelected.reference + '/montant/' + this.paiementCreate.montant, this.paiementCreate).subscribe({
      next: data => {
        if (data == -2) {
          Swal({
            title: 'cannot payer !',
            text: 'mantant superieur aux rest',
            type: 'error',
          });
        }
        if (data == -3) {
          Swal({
            title: 'cannot payer !',
            text: 'commande deja payer',
            type: 'error',
          });
        }
        if (data == 1) {
          Swal({
            title: 'info !',
            text: 'payermantant ',
            type: 'success',
          });
          this.findAll();
        }
        console.log('ok');
        this.paiementCreate = new Paiement(Number(''), 0, '', '');
      }, error: error => {
        console.log('pyer commande ma(damache');
      }
    });
  }


  public findCommandeItemByReference(commande: Commande) {
    this._commandeSelected = commande;
    if (this.commandeSelected != null) {
      this.http.get<Array<CommandeItem>>(this._url + '/reference/' + this.commandeSelected.reference + '/commande-items').subscribe(
        data => {
          this.commandeSelected.commandeItemVos = data;
        }, error => {
          console.log('error whith loading commandes items');
        }
      );
    }
  }
   //anous
  public findCommandeItemsReceptionByReference(commande: Commande) {
    this.http.get<Array<CommandeItem>>(this._url + '/reference/' + commande.reference + '/commande-items').subscribe(
      data => {
        if (data == null) {
          Swal(this.SWAL.SEARCH_NOT_FOUND);
          this.commandeItemsReception = new Array<CommandeItem>();
        } else {
          this.commandeItemsReception = data;
        }
      }, error => {
        this.commandeItemsReception = new Array<CommandeItem>();
        Swal(this.SWAL.ERROR_UNKNOWN_ERROR);
        console.log('error whith loading commandes items' + error);
      }
    );
  }


  public findPaiementByCommande(commande: Commande) {
    this._commandeSelected = commande;
    if (this.commandeSelected != null) {
      this.http.get<Array<Paiement>>(this._url3 + this.commandeSelected.reference).subscribe(
        data => {
          this.commandeSelected.paiementVos = data;

        }, error => {
          console.log('error whith loading paiements');
        }
      );
    }

  }

  public findExpressionBesoinItemsByProduit(commandeItem: CommandeItem) {
    this.http.get<Array<ExpressionBesoinItem>>('http://localhost:8099/faculte-besoin/item/produit/' + commandeItem.referenceProduit).subscribe(
      data => {
        this.expressionBesoinItems = data;
      }, error => {
        console.log(error);
      }
    );
    this.commandeItemSelected = commandeItem;
  }

  public setItemSelect(expressionBesoinItem: ExpressionBesoinItem) {

    this.expressionBesoinItemSelect = expressionBesoinItem;
    this.commandeSourceCreate.referenceExpressionBesoinItem = expressionBesoinItem.id.toString();
    this.commandeSourceCreate.commandeItemVo = this.commandeItemSelected;

  }

  public affecter() {
    this.http.post<CommandeSource>('http://localhost:8090/faculte-commande/commandes/commandeSource', this.commandeSourceCreate).subscribe(
      data => {
        console.log(data);
      }, error1 => {
        console.log(error1);
      }
    );
  }

  public chercherCommande() {
    this.http.post<Array<Commande>>('http://localhost:8090/faculte-commande/commandes/chercherCommande', this.commandecherch).subscribe(
      data => {
        this.commandes = data;
      }, error1 => {
        console.log(error1);
      }
    );
  }

  public deleteCommande() {

    if (this.commandeSelected != null) {
      this.http.delete('http://localhost:8090/faculte-commande/commandes/reference/' + this.commandeSelected.reference + '', {}).subscribe(
        data => {
          if (data == 1) {
            Swal({
              title: 'info !',
              text: 'commande suprimer',
              type: 'success',
            });
            this.findAll();
            this.commandeSelected.commandeItemVos = new Array<CommandeItem>();
          }

          console.log('deleted ...');

        }, error => {
          console.log('commande matmes7atche');
        }
      );
    }


  }

  public setProduitByVategorie(libelle: string) {
    this.http.get<Array<Produit>>('http://localhost:8090/faculte-commande/commandes/produits/libelle/' + libelle).subscribe(
      data => {
        this.produits = data;
      }, error => {
        console.log(error);
      }
    );
  }

  public crateFournisseur() {
    this.http.post<number>('http://localhost:8090/faculte-commande/fournisseurs/', this.fournisseurCreate).subscribe({
      next: data => {
        if (data == -1) {
          Swal({
            title: 'cannot save !',
            text: 'Référence déja utilisé',
            type: 'error',
          });
        }
        if (data == -2) {
          Swal({
            title: 'cannot save !',
            text: 'Référence ne peut pas etre vide',
            type: 'error',
          });
        }
        if (data == 1) {
          Swal({
            title: 'info !',
            text: 'fournisseur ajouter avec success',
            type: 'success',
          });
        }
        console.log('ok');
        this.fournisseurCreate = new Fournisseur('', '', '');
      }, error: error => {
        console.log(error);
      }
    });
  }

  //---
  public fournisseurSerched: Fournisseur = new Fournisseur('', '', '');

  public findOneFournisseurByReference() {

    if (this.fournisseurSerched != null) {
      this.http.get<Fournisseur>('http://localhost:8090/faculte-commande/fournisseurs/reference/' + this.fournisseurSerched.reference).subscribe(
        data => {
          console.log(data);
          this.fournisseurtrover = data;
        }, error => {
          console.log(error);
        }
      );
    }
  }

  public updateFournisseur() {


    this.http.put<number>('http://localhost:8090/faculte-commande/fournisseurs/reference/' + this.fournisseurSerched.reference + '/fournisseur', this.fournisseurSerched).subscribe(
      data => {
        console.log(data);
        if (data == 1) {
          Swal({
            title: 'info !',
            text: 'fournisseur modifier avec success',
            type: 'success',
          });
        }
      }, error1 => {
        console.log(error1);
      }
    );


  }

  public findCommandeSources(commandeItem: CommandeItem) {
    this.http.post<Array<CommandeSource>>('http://localhost:8090/faculte-commande/commandes/commandeSources',commandeItem).subscribe(
      data => {
        this.commandeSources = data;
      }, error => {
        console.log(error);
      }
    );
  }


//=========================getter==================================================

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get commandeCreate(): Commande {
    return this._commandeCreate;
  }

  set commandeCreate(value: Commande) {
    this._commandeCreate = value;
  }

  get commandeItemCreate(): CommandeItem {
    return this._commandeItemCreate;
  }

  set commandeItemCreate(value: CommandeItem) {
    this._commandeItemCreate = value;
  }

  get commandes(): Array<Commande> {
    if (this._commandes == null) {
      this.http.get<Array<Commande>>(this._url).subscribe(
        data => {
          this._commandes = data;
        }, error => {
          console.log('error whith loading commandes');
        }
      );
    }
    return this._commandes;
  }

  set commandes(value: Array<Commande>) {
    this._commandes = value;
  }

  get commandeSelected(): Commande {
    if (this._commandeSelected == null) {
      this._commandeSelected = new Commande('', 0, '', '', '', '');
    }
    return this._commandeSelected;
  }


  set commandeSelected(value: Commande) {
    this._commandeSelected = value;
  }


  get url1(): string {
    return this._url1;
  }

  set url1(value: string) {
    this._url1 = value;
  }

  get fournisseurs(): Array<Fournisseur> {
    if (this._fournisseurs == null) {
      this.http.get<Array<Fournisseur>>(this._url1).subscribe(
        data => {
          this._fournisseurs = data;
        }, error => {
          console.log('error whith loading fournisseurs');
        }
      );
    }
    return this._fournisseurs;
  }


  set fournisseurs(value: Array<Fournisseur>) {
    this._fournisseurs = value;
  }


  get categories(): Array<CategoriProduit> {
    if (this._categories == null) {
      this.http.get<Array<CategoriProduit>>('http://localhost:8090/faculte-commande/commandes/CategorieProduit/').subscribe(
        data => {

          this._categories = data;
        }, error => {
          console.log(error);
        }
      );
    }
    return this._categories;
  }

  set categories(value: Array<CategoriProduit>) {
    this._categories = value;
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

  get paiementCreate(): Paiement {
    if (this._paiementCreate == null) {
      this._paiementCreate = new Paiement(Number(''), 0, '', '');
    }
    return this._paiementCreate;
  }

  set paiementCreate(value: Paiement) {
    this._paiementCreate = value;
  }


  public itemToModal(commandeSelected: Commande) {
    this.commandeSelected = commandeSelected;
  }


  get commande(): Commande {
    return this._commande;
  }

  set commande(value: Commande) {
    this._commande = value;
  }


  get fournisseurCreate(): Fournisseur {
    return this._fournisseurCreate;
  }

  set fournisseurCreate(value: Fournisseur) {
    this._fournisseurCreate = value;
  }
}
