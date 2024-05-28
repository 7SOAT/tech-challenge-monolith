import { Controller, Get, Post, Body, Param, Req, Query } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateCustomerUseCase } from 'Core/Application/UseCases/Customer/CreateCustomer/createCustomer.usecase';
import { FindCustomerByCPFUseCase } from 'Core/Application/UseCases/Customer/FindCustomerByCPF/findCustomerByCPF.usecase';
import CustomerEntity from 'Core/Domain/Entities/customer.entity';

@ApiTags('customer')
@Controller('customer')
export class CustomerController {
  constructor(
    private _createCustomerUseCase: CreateCustomerUseCase,
    private _findCustomerByCPFUseCase: FindCustomerByCPFUseCase
  ) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this._createCustomerUseCase.execute(createCustomerDto);
  }

  @Get()
  @ApiQuery({name: "cpf"})
  async findOne(@Query() query: { cpf: string }): Promise<CustomerEntity> {
    return await this._findCustomerByCPFUseCase.execute(query.cpf);
  }

}
