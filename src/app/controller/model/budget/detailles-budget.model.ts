export class DetaillesBudgetVo {
  constructor(
    public antecedent?: string,
    public creditOuvertEstimatif: string="",
    public creditOuvertReel: string="",
    public reliquatEstimatif?: string,
    public reliquatReel?: string,
    public engageNonPaye?: string,
    public engagePaye?: string,
    public reliquatPayeEstimatif?: string,
    public reliquatPayereel?: string,
    public reliquatNonPayeEstimatif?: string,
    public reliquatNonPayReel?: string,
    public id?: number
  ) {
  }
}
