
import {Responsabilite} from './responsabilite.model';

import {EntiteAdministratif} from './entite-administratif.model';
import {Personnel} from './personnel.model';

export class Mandat {

  public responsabiliteVo: Responsabilite = new Responsabilite('');
  public personnelVo : Personnel = new Personnel('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  public  entiteAdministratifVo : EntiteAdministratif = new EntiteAdministratif('');
  constructor(
    public dateDebutMandat:string,
    public dateFinMandat :string){}
}
