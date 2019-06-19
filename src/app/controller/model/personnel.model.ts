
import {TypePersonnel} from './type-personnel.model';

export class Personnel {

  public typePersonnelVo: TypePersonnel = new TypePersonnel('');

  constructor(
    public id :number,
    public nom:string,
    public prenom :string,
    public dateNaissance :string,
    public etatSocial:string,
    public cin:string,
    public numeroLocation:string ,
    public lieuNaissance:string ,
    public nombreEnfants:string ,
    public lieuAffectation:string ,
    public dateExerciceEchelle:string ,
    public grade:string ,
    public dateActivation:string,
    public dateAccesFonctionPublique:string ,
    public dateDebutTypePersonnel:string ,
    public referenceEchelle:string ,
    public referenceEchelon:string  ){}

}


