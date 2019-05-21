import {SousProjet} from './sous-projet.model';

export class Projet {
  public libelleP:string="";
  public sousProjetsVo:Array<SousProjet>=new Array<SousProjet>();

  constructor(libelleP: string) {
    this.libelleP = libelleP;
  }
}
