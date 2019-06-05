export class CompteBudgitaireVo {

  constructor(public id?: number, public code?: string, public libelle?: string) {
  }
  public toString = () : string => {
    return this.code+" : "+this.libelle;
  }
}
