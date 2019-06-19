import {SousProjet} from './sous-projet.model';
import {TypeEntiteAdministratif} from './type-entite-administratif.model';
import {Personnel} from './personnel.model';

export class EntiteAdministratif {
  public sousProjetVo :SousProjet=new SousProjet(0,'');
  public typeEntiteAdministratifVo : TypeEntiteAdministratif = new TypeEntiteAdministratif('');
  public chefVo : Personnel =  new Personnel(0,'','','','','','','','','','','','','','','','');
  constructor(public id : number,public referenceEntiteAdministratif: string ) {}
}
