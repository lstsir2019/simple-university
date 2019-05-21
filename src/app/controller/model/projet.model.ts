import {SousProjet} from './sous-projet.model';

export class Projet {
  public sousProjetsVo = Array<SousProjet>();

  constructor(public libelleP: string) {}
}
