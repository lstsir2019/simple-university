import {SousProjet} from './sous-projet.model';
import {TypeEntiteAdministratif} from './type-entite-administratif.model';

export class EntiteAdministratif {
  public sousProjetVo :SousProjet=new SousProjet(0,'');
  public typeEntiteAdministratifVo : TypeEntiteAdministratif = new TypeEntiteAdministratif('');
  constructor(public referenceEntiteAdministratif: string ) {}
}
