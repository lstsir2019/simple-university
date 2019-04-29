import {AppelOffre} from './appel-offre.model';
import {OffreDetail} from './offre-detail.model';

export class Offre {

  public objectif: string="";
  public reference: string="";
  public refrenceFournisseur: string="";
  public montantTtc: number=0;
  public tva: number=0;
  public montantHt: number=0;
  public date: string="";
  public appelOffreVo: AppelOffre = new AppelOffre( '', 0, 0, 0, 0);

  public offreDetailsVo: Array<OffreDetail> = new Array<OffreDetail>();

  constructor() {
  }
}
