import { INestApplication } from "@nestjs/common";
import { OrdersMock } from "./MockFiles/Orders.mock";
import { OrderStatusMock } from "./MockFiles/OrderStatus.mock";
import { ProductsMock } from "./MockFiles/Products.mock";
import { OrderStatusTypeOrmRepository } from "Adapters/Driven/Repositories/orderStatus.repository";
import { ProductTypeOrmRepository } from "Adapters/Driven/Repositories/product.repository";
import { OrderTypeOrmRepository } from "Adapters/Driven/Repositories/order.repository";

export default async function MockTables(app: INestApplication<any>, enableMockTables: string) {
  await HandleDomainTablesData(app);
  if (enableMockTables === "true") {
    await HandleExtraTablesData(app);
  }
}

async function HandleDomainTablesData(app: INestApplication<any>) {
  await mockTableHandler(app, OrderStatusTypeOrmRepository, OrderStatusMock);
}

async function HandleExtraTablesData(app: INestApplication<any>) {
  await mockTableHandler(app, ProductTypeOrmRepository, ProductsMock);
  await mockTableHandler(app, OrderTypeOrmRepository, OrdersMock);
}

async function mockTableHandler(app: INestApplication<any>, repository: any, mockList) {
  const repositoryInstance: typeof repository = app.get<typeof repository>(repository);
  await repositoryInstance.findAll().then(orderStatusList => {
    const orderStatusString = JSON.stringify(orderStatusList.map(x => x.id))
    mockList.forEach(mock => {
      if (!orderStatusString.includes(mock.id.toString())) {
        { repositoryInstance.insert(mock) }
      }
    })
  })
}