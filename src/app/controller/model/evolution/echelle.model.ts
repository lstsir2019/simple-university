import {Echelon} from './echelon.model';

export class Echelle {
    constructor(public reference: string, public libelle: string, public ordre: number, public description: string, public echelons: Array<Echelon>, public referenceTypePersonnel: string){}
}
