export default class OrderStatusModel {
  constructor(
    public readonly id: number,
    public readonly name?: string,
    public readonly desciption?: string,
    public readonly priorityOrder?: number
  ) {}
}
