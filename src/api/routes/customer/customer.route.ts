import CustomerRepository from '@datasource/typeorm/repositories/customer.repository';
import CustomerGateway from '@gateways/customer.gateway';
import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import CreateCustomerDto from '@routes/customer/dto/create-customer.dto';
import CustomerUseCase from '@usecases/customer.usecase';
import CustomerEntity from 'core/entities/customer.entity';

@ApiTags('customers')
@Controller('customers')
export default class CustomerRoute {
  constructor(
    private _customerRepository: CustomerRepository
  ) { }
  
  @Get('by-params')
  @ApiOperation({ summary: 'Find customer by CPF number', parameters: [{ name: "cpf", in: 'query' }] })
  @ApiQuery({ name: "cpf", description: "Customer CPF number" })
  async findOne(@Query() query: { cpf: string }): Promise<CustomerEntity> {
    try {
      const customerGateway = new CustomerGateway(this._customerRepository);
      const customerUseCase = new CustomerUseCase(customerGateway);
      return await customerUseCase.findCustomerByCPF(query.cpf);
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create customer' })
  @ApiResponse({ status: 201, description: 'Success.' })
  @ApiBody({
    type: CreateCustomerDto,
    examples: {
      a: {
        summary: "Exemplo Marquinhos",
        value: { cpf: '436.769.013-12', email: 'prof.marquinhos@fiap.com.br', name: 'Professor Marquinhos' } as CreateCustomerDto
      },
      b: {
        summary: "Exemplo Claudio",
        value: { cpf: '365.278.293-12', email: 'prof.claudio@fiap.com.br', name: 'Professor Claudio' } as CreateCustomerDto
      }
    }
  })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    try {
      const customerGateway = new CustomerGateway(this._customerRepository);
      const customerUseCase = new CustomerUseCase(customerGateway);
      return customerUseCase.createCustomer(createCustomerDto);
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
