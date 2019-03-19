import {Choix} from './choix.model';
import {NotesSemestre} from './notes-semestre.model';

export class Etudiant {
  public choixVos: Choix= new Choix(" ");
  public notesSermetreVo: NotesSemestre= new NotesSemestre(" ","","","","","");
  constructor(public cne:string,public cin:string,public nom:string,public prenom:string,public tel:string,public email:string,
              public typeDiplome:string,public niveauDetudes:string) {}
}
