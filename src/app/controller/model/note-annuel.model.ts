import {Note} from "./note.model";
import {Mention} from "./mention.model";

export class NoteAnnuel {

  public notesElementVo =Array<Note>();
  public  mentionNoteVo=new Mention('','',0,0);
  constructor(public dateDevaluation:String,public referencePersonnel: string,public referenceEvaluateur: string, public totalNote: number) {}

}
