import { IOrderStatusOutput } from "@type/output/order-status.output";

export default class OrderStatusDto implements IOrderStatusOutput {
    constructor(
        public id: number,
        public name: string,
        public description: string
    ){}
}