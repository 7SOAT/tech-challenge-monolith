import { INestApplication } from "@nestjs/common";
import { OrderTypeOrmRepository } from "../../../../Driven/Repositories/order.repository";
import { OrderStatusTypeOrmRepository } from "../../../../Driven/Repositories/orderStatus.repository";
import { ProductTypeOrmRepository } from "../../../../Driven/Repositories/product.repository";
import { OrdersMock } from "./MockFiles/Orders.mock";
import { OrderStatusMock } from "./MockFiles/OrderStatus.mock";
import { ProductsMock } from "./MockFiles/Products.mock";

export default function MockTables(app: INestApplication<any>, enableMockTables: string){
    HandleDomainTablesData(app);

    if(enableMockTables === "true"){
      HandleExtraTablesData(app);
    }
}

function HandleDomainTablesData(app: INestApplication<any>) {
  mockTableHandler(app, OrderStatusTypeOrmRepository, OrderStatusMock);
}

function HandleExtraTablesData(app: INestApplication<any>){
  mockTableHandler(app, ProductTypeOrmRepository, ProductsMock);
  mockTableHandler(app, OrderTypeOrmRepository, OrdersMock);
}

function mockTableHandler(app: INestApplication<any>, repository: any, mockList){
    const repositoryInstance: typeof repository = app.get<typeof repository>(repository);
    repositoryInstance.findAll().then(orderStatusList => {
      const orderStatusString = JSON.stringify(orderStatusList.map(x => x.id))
      mockList.forEach(mock => {
        if(!orderStatusString.includes(mock.id.toString())){
            {repositoryInstance.insert(mock)}
        }
      })
    })
  }