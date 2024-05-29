import { Controller, Get, Post, Body, Param, Req, Query, HttpException, HttpStatus } from '@nestjs/common';
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
    try {
      return this._createCustomerUseCase.execute(createCustomerDto);
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiQuery({name: "cpf"})
  async findOne(@Query() query: { cpf: string }): Promise<CustomerEntity> {
    try {
      return await this._findCustomerByCPFUseCase.execute(query.cpf);
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
