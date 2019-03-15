import {Element} from './element.model';

export class Note {
  // public elementEvaluationVo:Element=new Element('','',0,0);

  constructor(public referencePersonnel: string, public referenceEvaluateur: string, public noteElement: number,public observation: string ,public elementEvaluationVo:Element) {}

}
