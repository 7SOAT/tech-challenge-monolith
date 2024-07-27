import OrderStatusEnum from "domain/enums/orderStatus.enum";
import OrderStatusEntity  from "infrastructure/entities/orderStatus.entity";

const OrderStatusMock: OrderStatusEntity[] = [
    new OrderStatusEntity({
        id: OrderStatusEnum.PENDING,
        name: "Pendente",
        description: "Aguardando confirmação do pagamento",
        priorityOrder: 4
    }),
    new OrderStatusEntity({
        id: OrderStatusEnum.RECEPTED,
        name: "Recebido",
        description: "Pagamento confirmado! Aguardando preparação.",
        priorityOrder: 3
    }),
    new OrderStatusEntity({
        id: OrderStatusEnum.IN_PREPARATION,
        name: "Em preparação",
        description: "O pedido está sendo preparado.",
        priorityOrder: 2
    }),
    new OrderStatusEntity({
        id: OrderStatusEnum.READY,
        name: "Pronto",
        description: "O pedido já está pronto! Aguardando retirada.",
        priorityOrder: 1
    }),
    new OrderStatusEntity({
        id: OrderStatusEnum.FINISHED,
        name: "Finalizado",
        description: "O pedido já foi entregue ao cliente!",
        priorityOrder: 5
    }),
    new OrderStatusEntity({
        id: OrderStatusEnum.CANCELLED,
        name: "Cancelado",
        description: "O pedido foi cancelado",
        priorityOrder: 6
    })
]

export default OrderStatusMock;