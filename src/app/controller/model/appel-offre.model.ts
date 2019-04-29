import {AppelOffreDetail} from './appel-offre-detail.model';

export class AppelOffre {
  public appelOffreDetailVo = Array<AppelOffreDetail>();
  //public appelOffreVo = Array<AppelOffre> ();
  public reference: string="";

  constructor(public objectif: string, public montantHT: number, public tva: number, public montantTTC: number, public montantGarantieTemp: number) {
  }
}
