import { Order } from "Adapters/Driver/WebAPI/modules/order/entities/order.entity";
import { UUID, randomUUID } from "crypto";

export default class CustomerEntity{
    private readonly _id: UUID;
    private readonly _isActive: boolean;
    private readonly _isArchived: boolean;
    private readonly _orders: Order[];

    constructor(
        private readonly _name: string,
        private readonly _email: string,
        private readonly _cpf: string
    ){
        this._id = randomUUID();
        this._isActive = true;
        this._isArchived = false;
        this._orders = new Array<Order>();
    }

    public get id(): UUID {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get email(): string {
        return this._email;
    }

    public get cpf(): string {
        return this._cpf;
    }

    public get isActive(): boolean {
        return this._isActive;
    }

    public get isArchived(): boolean {
        return this._isArchived;
    }

    public get orders(): Order[] {
        return this._orders;
    }
}