import PaymentStatusModel from '@models/payment/payment-status.model';
import PaymentModel from '@models/payment/payment.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export default class PaymentRepository {
  constructor(
    @InjectRepository(PaymentModel)
    private _paymentRepository: Repository<PaymentModel>
  ) { }

  async findAll(): Promise<PaymentModel[]> {
    try {
     return await this._paymentRepository.find();
    } catch (error) {
      throw new Error(`Error searching payment: ${error}`);
    }
  }

  async insert(payment: PaymentModel): Promise<PaymentModel> {
    try {    
      return await this._paymentRepository.save(payment);
    } catch (error) {
      throw new Error(`Error inserting order status: ${error}`);
    }
  }
}
