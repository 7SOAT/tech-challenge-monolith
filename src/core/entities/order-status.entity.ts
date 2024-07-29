export default class OrderStatusEntity {
  constructor(
    public readonly id: number,
    public readonly name?: string,
    public readonly description?: string,
    public readonly priorityOrder?: number
  ) {}
}
