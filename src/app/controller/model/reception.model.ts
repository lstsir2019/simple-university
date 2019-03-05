import {ReceptionItem} from './reception-item.model';

export class Reception {
  public receptionItems:Array<ReceptionItem> = [];
  constructor(public reference,public referenceCommande:string,public dateReception:string){}
}
