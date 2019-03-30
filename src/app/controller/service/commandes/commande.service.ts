import { Injectable } from '@angular/core';
import {Commande} from '../../model/commandes/commande.model';
import {CommandeItem} from '../../model/commandes/commande-item.model';
import {HttpClient} from '@angular/common/http';
import {Fournisseur} from '../../model/commandes/fournisseur.model';
import {Paiement} from '../../model/commandes/paiement.model';
import {ExpressionBesoinItem} from '../../model/expression-besoin-item.model';
import {CommandeSource} from '../../model/commandes/commandeSource.model';


@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private _url:string = "http://localhost:8090/faculte-commande/commandes/";
  private _url1:string = "http://localhost:8090/faculte-commande/fournisseurs/finAll";
  private _url3:string = "http://localhost:8090/faculte-commande/paiementes/reference/";
  private _url4:string = "http://localhost:8090/faculte-commande/paiementes"

  private _commandeCreate:Commande = new Commande('' ,0,'','');
  private _commandeItemCreate:CommandeItem = new CommandeItem('',0,0);
  private _commande:Commande=new Commande('',0,'','');
  private _commandes:Array<Commande>;
  private _commandeSelected:Commande;
  private _paiementCreate:Paiement = new Paiement(Number(''),0,'','');
  private _fournisseurs:Array<Fournisseur>;
  public commandeItems:Array<CommandeItem>;
  public expressionBesoinItems:Array<ExpressionBesoinItem>;
  public expressionBesoinItemSelect:ExpressionBesoinItem;
  public commandeSourceCreate:CommandeSource=new CommandeSource(0,'');
  public commandeItemSelected:CommandeItem;
  constructor(private http:HttpClient) { }

  public addCommandeItem() {
    this.commandeCreate.total+=this.commandeItemCreate.prix*this.commandeItemCreate.qte;
    let commandeItemClone = new CommandeItem(this.commandeItemCreate.referenceProduit,this.commandeItemCreate.prix,this.commandeItemCreate.qte);
    this.commandeCreate.commandeItemVos.push(commandeItemClone);
    this.commandeItemCreate=new CommandeItem("",0,0);
  }

  public saveCommande(){
    this.http.post<Commande>(this._url,this.commandeCreate).subscribe({
      next: data=>{
      console.log("ok");
      this.commandeCreate = new Commande('',0,'','');
      this.commandeItemCreate = new CommandeItem("",0,0);
    } , error: error=>{
      console.log("erreur");
    }
    });
  }
  
  
  public findCommandeItemsByCommandeReference(){

    if (this.commande != null){
      this.http.get<Array<CommandeItem>>('http://localhost:8090/faculte-commande/commandes/reference/'+this._commande.reference+'/commande-items').subscribe(
        data=> {
          this.commandeItems = data;
        },error=> {
          console.log(error);
        }
      );
    }
  }

  public payerCommande(){
      this.http.post<Paiement>(this._url4+"/referenceCommande/"+this.commandeSelected.reference+"/montant/"+this.paiementCreate.montant,this.paiementCreate).subscribe({
        next: data=>{
          console.log("ok");
          this.paiementCreate = new Paiement(Number(''),0,'','');
        } , error: error=>{
          console.log("pyer commande ma(damache");
        }
      });
  }


  public findCommandeItemByReference(commande:Commande){
    this._commandeSelected=commande;
    if(this.commandeSelected !=null){
    this.http.get<Array<CommandeItem>>(this._url+"/reference/"+this.commandeSelected.reference+"/commande-items").subscribe(
      data =>{
        this.commandeSelected.commandeItemVos = data;
      } , error =>{
        console.log("error whith loading commandes items");
      }
    );
    }
  }



  public findPaiementByCommande(commande:Commande){
    this._commandeSelected=commande;
    if(this.commandeSelected !=null){
      this.http.get<Array<Paiement>>(this._url3+this.commandeSelected.reference).subscribe(
        data =>{
          this.commandeSelected.paiementVos = data;
        } , error =>{
          console.log("error whith loading paiements");
        }
      );
    }

  }
  
  public findExpressionBesoinItemsByProduit(commandeItem: CommandeItem){
      this.http.get<Array<ExpressionBesoinItem>>('http://localhost:8099/faculte-besoin/item/produit/'+commandeItem.referenceProduit).subscribe(
        data=>{
          this.expressionBesoinItems = data;
        },error => {
          console.log(error);
        }
      );
      this.commandeItemSelected=commandeItem;
  }

  public setItemSelect(expressionBesoinItem: ExpressionBesoinItem) {

    this.expressionBesoinItemSelect = expressionBesoinItem;
    this.commandeSourceCreate.referenceExpressionBesoinItem=expressionBesoinItem.id.toString();
    this.commandeSourceCreate.commandeItemVo=this.commandeItemSelected;

  }

  public affecter(){
    this.http.post<CommandeSource>('http://localhost:8090/faculte-commande/commandes/commandeSource',this.commandeSourceCreate).subscribe(
      data=>{
        console.log(data);
      },error1 => {
        console.log(error1);
      }
    );
  }





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
    if(this._commandes==null){
      this.http.get<Array<Commande>>(this._url).subscribe(
        data => {
          this._commandes = data;
        } ,  error=> {
          console.log("error whith loading commandes");
        }
      );
    }
    return this._commandes;
  }

  set commandes(value: Array<Commande>) {
    this._commandes = value;
  }

  get commandeSelected(): Commande {
    if(this._commandeSelected == null){
      this._commandeSelected = new Commande('',0,'','');
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
    if(this._fournisseurs==null) {
      this.http.get<Array<Fournisseur>>(this._url1).subscribe(
        data => {
          this._fournisseurs = data;
        } , error => {
          console.log("error whith loading fournisseurs");
        }
      );
    }
    return this._fournisseurs;
  }


  set fournisseurs(value: Array<Fournisseur>) {
    this._fournisseurs = value;
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
    if(this._paiementCreate == null){
      this._paiementCreate=new Paiement(Number(''),0,'','')
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
}
