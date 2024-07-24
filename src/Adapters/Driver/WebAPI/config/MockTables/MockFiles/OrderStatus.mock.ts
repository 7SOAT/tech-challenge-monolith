import { OrderStatusEnum } from "Core/Domain/Enums/orderStatus.enum";
import { OrderStatusTypeOrmEntity } from "../../../../../Driven/Entities/orderStatus.typeorm.entity";

export const OrderStatusMock: OrderStatusTypeOrmEntity[] = [
    new OrderStatusTypeOrmEntity({
        id: OrderStatusEnum.PENDING,
        name: "Pendente",
        description: "Aguardando confirmação do pagamento",
        priorityOrder: 4
    }),
    new OrderStatusTypeOrmEntity({
        id: OrderStatusEnum.RECEPTED,
        name: "Recebido",
        description: "Pagamento confirmado! Aguardando preparação.",
        priorityOrder: 3
    }),
    new OrderStatusTypeOrmEntity({
        id: OrderStatusEnum.IN_PREPARATION,
        name: "Em preparação",
        description: "O pedido está sendo preparado.",
        priorityOrder: 2
    }),
    new OrderStatusTypeOrmEntity({
        id: OrderStatusEnum.READY,
        name: "Pronto",
        description: "O pedido já está pronto! Aguardando retirada.",
        priorityOrder: 1
    }),
    new OrderStatusTypeOrmEntity({
        id: OrderStatusEnum.FINISHED,
        name: "Finalizado",
        description: "O pedido já foi entregue ao cliente!",
        priorityOrder: 5
    }),
    new OrderStatusTypeOrmEntity({
        id: OrderStatusEnum.CANCELLED,
        name: "Cancelado",
        description: "O pedido foi cancelado",
        priorityOrder: 6
    })
]