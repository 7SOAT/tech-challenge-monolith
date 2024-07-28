import { INestApplication } from "@nestjs/common";
import OrdersMock from "@datasource/typeorm/seed/seed-tables/order.seed";
import OrderStatusMock from "@datasource/typeorm/seed/seed-tables/order-status.seed";
import ProductsMock from "@datasource/typeorm/seed/seed-tables/product.seed";
import ProductRepository from "@gateways/product.gateway";
import OrderStatusGateway  from "@gateways/order-status.gateway";
import OrderGateway from "@gateways/order.gateway";

export default async function MockTables(app: INestApplication<any>, enableMockTables: boolean) {
  try{
    await HandleDomainTablesData(app);
    if (enableMockTables) {
      await HandleExtraTablesData(app);
    }
  } catch (err){
    console.log(err)
  }
}

async function HandleDomainTablesData(app: INestApplication<any>) {
  await mockTableHandler(app, OrderStatusGateway, OrderStatusMock);
}

async function HandleExtraTablesData(app: INestApplication<any>) {
  await mockTableHandler(app, ProductRepository, ProductsMock);
  await mockTableHandler(app, OrderGateway, OrdersMock);
}

async function mockTableHandler(app: INestApplication<any>, gateway: any, mockList) {
  try{
    const gatewayInstance: typeof gateway = app.get<typeof gateway>(gateway);
    await gatewayInstance.findAll().then(orderStatusList => {
      const orderStatusString = JSON.stringify(orderStatusList.map(x => x.id))
      mockList.forEach(mock => {
        if (!orderStatusString.includes(mock.id.toString())) {
          { gatewayInstance.insert(mock) }
        }
      })
    })
  } catch(err){

  }
}