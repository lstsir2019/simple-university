import {Echelon} from "./echelon.model";
import {LoiEvolution} from "./loi-evolution.model";

export class LoiEvolutionTypePersonnel {

  constructor(public reference: string, public referenceTypePersonnel, public echelonDepart: Echelon, public echelonFin: Echelon, public nombreAnnees: number, public loiEvolution: LoiEvolution) {
  }

}
