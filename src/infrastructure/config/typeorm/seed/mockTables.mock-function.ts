import { INestApplication } from "@nestjs/common";
import { OrdersMock } from "./seedTables/order.seed";
import { OrderStatusMock } from "./seedTables/orderStatus.seed";
import { ProductsMock } from "./seedTables/product.seed";
import { ProductGateway } from "infrastructure/gateways/product.gateway";
import { OrderStatusGateway } from "infrastructure/gateways/orderStatus.gateway";
import { OrderGateway } from "infrastructure/gateways/order.gateway";

export default async function MockTables(app: INestApplication<any>, enableMockTables: boolean) {
  await HandleDomainTablesData(app);
  if (enableMockTables) {
    await HandleExtraTablesData(app);
  }
}

async function HandleDomainTablesData(app: INestApplication<any>) {
  await mockTableHandler(app, OrderStatusGateway, OrderStatusMock);
}

async function HandleExtraTablesData(app: INestApplication<any>) {
  await mockTableHandler(app, ProductGateway, ProductsMock);
  await mockTableHandler(app, OrderGateway, OrdersMock);
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