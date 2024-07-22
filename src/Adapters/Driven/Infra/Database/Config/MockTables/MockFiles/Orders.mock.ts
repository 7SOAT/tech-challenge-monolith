import { randomInt } from "crypto";
import { OrderTypeOrmEntity } from "../../../Entities/order.typeorm.entity";
import { ProductsMock } from "./Products.mock";
import { OrderStatusMock } from "./OrderStatus.mock";
import { OrderStatusEnum } from "Core/Domain/Enums/orderStatus.enum";

const currentDate = new Date();

export const OrdersMock: OrderTypeOrmEntity[] = [...Array(30)].map((x, i) => {
    const randomStatusId = randomInt(5);
    return new OrderTypeOrmEntity({
        id: `11000000-0000-0000-0000-0000000000${("00" + i).slice(-2)}`,
        products: ProductsMock,
        orderNumber: randomInt(100, 500),
        status: OrderStatusEnum[OrderStatusEnum[randomStatusId].valueOf()],
        createdAt: new Date(currentDate.setMonth(currentDate.getMonth() + i))
    })
})