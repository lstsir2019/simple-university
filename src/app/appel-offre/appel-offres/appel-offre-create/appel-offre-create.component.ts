import {Component, OnInit} from '@angular/core';
import {AppelOffreService} from '../../../controller/service/appel-offre.service';
import {ProduitService} from '../../../controller/service/produit.service';
import {Produit} from '../../../controller/model/produit.model';
import {OffreDetail} from '../../../controller/model/offre-detail.model';
import {AppelOffreDetail} from '../../../controller/model/appel-offre-detail.model';

@Component({
  selector: 'app-appel-offre-create',
  templateUrl: './appel-offre-create.component.html',
  styleUrls: ['./appel-offre-create.component.css']
})
export class AppelOffreCreateComponent implements OnInit {

  products: Array<Produit> = new Array<Produit>();

  constructor(private appelOffreService: AppelOffreService, private produitService: ProduitService) {
  }

  ngOnInit() {
    this.findAllProducts();
  }

  findAllProducts() {
    this.produitService.findallProdcuts().subscribe(
      data => {
        if (data != null) this.products = data;
      }, error1 => {
        console.log('error: products server doesn\'t work');
      }
    );
  }

  public get appelOffre() {
    return this.appelOffreService.appelOffreCreate;
  }

  public get appelOffreDetail() {
    return this.appelOffreService.appelOffreDetailCreate;
  }

  public get appelOffreDetails() {
    return this.appelOffreService.appelOffreCreate.appelOffreDetailVo;
  }

  public addAppelOffreDetail() {
    return this.appelOffreService.addAppelOffreDetail();
  }

  public savAppelOffre() {
    this.appelOffreService.savAppelOffre();
  }
  recalcule(){
    this.appelOffre.montantTTC = this.appelOffre.montantHT * (1 + this.appelOffre.tva / 100);
  }
  removeDetails(a:AppelOffreDetail) {
    let number=this.appelOffreDetails.indexOf(a);
    if(number!=null){
      this.appelOffre.montantHT -=a.total;
      this.appelOffre.montantTTC = this.appelOffre.montantHT * (1 + this.appelOffre.tva / 100);
      this.appelOffre.montantGarantieTemp = this.appelOffre.montantTTC / 10;
      this.appelOffreDetails.splice(number,1);
    }
  }
}
