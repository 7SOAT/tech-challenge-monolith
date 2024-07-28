import { IOrderProductOutput } from "@type/output/product.output";
import { UUID } from "crypto";

export default class OrderProductDto implements IOrderProductOutput {
    constructor(
        public id: UUID,
        public name: string,
        public price: number,
        public description: string
    ){}
}