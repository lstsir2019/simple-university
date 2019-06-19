
import {Responsabilite} from './responsabilite.model';

import {EntiteAdministratif} from './entite-administratif.model';
import {Personnel} from './personnel.model';

export class Mandat {

  public responsabiliteVo: Responsabilite = new Responsabilite(0,'');
  public personnelVo : Personnel = new Personnel(0,'','','','','','','','','','','','','','','','');
  public  entiteAdministratifVo : EntiteAdministratif = new  EntiteAdministratif(0,'');
  constructor(
    public id : number,
    public dateDebutMandat:string,
    public dateFinMandat :string){}
}
