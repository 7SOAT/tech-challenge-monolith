import PaymentRepository from "@datasource/typeorm/repositories/payment.repository";
import OrderEntity from "@entities/order/order.entity";
import PaymentStatusEntity from "@entities/payment/payment-status.entity";
import PaymentEntity from "@entities/payment/payment.entity";
import IPaymentGateway from "@interfaces/datasource/payment.gateway";
import PaymentStatusModel from "@models/payment/payment-status.model";
import PaymentModel from "@models/payment/payment.model";
import { plainToInstance } from "class-transformer";
import { UUID } from "crypto";


export default class PaymentGateway implements IPaymentGateway {
  constructor(
    private _paymentRepository: PaymentRepository
  ) {}

  async findAll(): Promise<PaymentEntity[]> {
    const payments: PaymentModel[] = await this._paymentRepository.findAll();

    const mappedPayments = plainToInstance<PaymentEntity, PaymentModel>(
      PaymentEntity,
      payments,
      {enableImplicitConversion: true}
    );

    return mappedPayments;
  }

  async insert(product: PaymentEntity): Promise<PaymentEntity> {
    const mappedPayment = this.adaptEntityToModel(product);
    
    const result = await this._paymentRepository.insert(mappedPayment);

    return this.adaptModelToEntity(result);
  }

  private adaptEntityToModel(productE: PaymentEntity): PaymentModel {
  
    const statusM = new PaymentStatusModel(productE.status);

    return new PaymentModel({
      id: productE.id,
      status: statusM,
      externalId: productE.externalId
    });
  }

  private adaptModelToEntity(paymentM: PaymentModel): PaymentEntity {
    const statusE = new PaymentStatusEntity(
      paymentM.status?.id,
      paymentM.status?.name,
      paymentM.status?.description
    );

    return new PaymentEntity(
      statusE,
      paymentM.externalId,
      paymentM.id
    );
  }
}
