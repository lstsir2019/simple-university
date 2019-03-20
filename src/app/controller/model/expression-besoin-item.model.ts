import {ExpressionBesoin} from './expression-besoin.model';

export class ExpressionBesoinItem {

  constructor(
                  public id: number,
                  public referenceCategorieProduit: string ,
                  public referenceProduit: string ,
                  public quantiteDemande: number ,
                  public description: string ,
                  public quantiteAccorder: number,
                  public quantiteCommander: number,
                  public quantiteLivre: number,



              ) { }
}

