import {ReceptionItem} from './reception-item.model';

export class Reception {
  public receptionItems:Array<ReceptionItem> = [];
  public dateMin:string="";
  public dateMax:string="";
  constructor(public reference,public referenceCommande:string,public dateReception:string){}
}
