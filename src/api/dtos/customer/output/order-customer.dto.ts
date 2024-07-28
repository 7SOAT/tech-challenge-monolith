import { IOrderCustomerOutput } from "@type/output/customer.output";
import { UUID } from "crypto";

export default class OrderCustomerDto implements IOrderCustomerOutput {
    constructor(
        public id: UUID,
        public name: string
    ) {}
}