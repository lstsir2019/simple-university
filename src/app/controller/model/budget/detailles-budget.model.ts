export class DetaillesBudget {
  constructor(
    public antecedent?: number,
    public creditOuvertEstimatif?: number,
    public creditOuvertReel?: number,
    public reliquatEstimatif?: number,
    public reliquatReel?: number,
    public engageNonPaye?: number,
    public engagePaye?: number,
    public reliquatPayeEstimatif?: number,
    public reliquatPayereel?: number,
    public reliquatNonPayeEstimatif?: number,
    public reliquatNonPayReel?: number
  ) {
  }
}
