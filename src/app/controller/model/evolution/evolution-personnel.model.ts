import {LoiEvolutionTypePersonnel} from "./loi-evolution-type-personnel.model";
import {Echelon} from "./echelon.model";

export class EvolutionPersonnel {


  constructor(public reference:string, public loiEvolutionTypePersonnel:LoiEvolutionTypePersonnel, public referencePersonnel:string, public referenceTypePersonnel:string, public echelonDepart:Echelon, public echelonFin:Echelon, public dateEvolution:string){

  }


}
