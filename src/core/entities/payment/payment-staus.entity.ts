export default class PaymentStatusEntity {
    constructor(
      public readonly id: number,
      public readonly name?: string,
      public readonly description?: string
    ) {}
  }
  