import {ReceptionItem} from './reception-item.model';

export class Reception {
  public receptionItems:Array<ReceptionItem> = [];
  public dataMin:string;
  public dataMax:string;
  constructor(public reference,public referenceCommande:string,public dateReception:string){}
}
