import { Body, Controller, Get, HttpException, HttpStatus, Inject, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import CustomerEntity from 'core/entities/customer.entity';
import UseCaseProxy from 'api/usecases-proxy/usecases-proxy';
import UsecasesProxyModule from 'api/usecases-proxy/usecases-proxy.module';
import CustomerUseCase from '@usecases/customer.usecase';
import CreateCustomerDto from '@routes/customer/dto/create-customer.dto';

@ApiTags('customers')
@Controller('customers')
export default class CustomerRoute {
  constructor(
    @Inject(UsecasesProxyModule.CUSTOMER_USE_CASE)
    private _customerUseCase: UseCaseProxy<CustomerUseCase>
  ) { }
  
  @Get('by-params')
  @ApiOperation({ summary: 'Find customer by CPF number', parameters: [{ name: "cpf", in: 'query' }] })
  @ApiQuery({ name: "cpf", description: "Customer CPF number" })
  async findOne(@Query() query: { cpf: string }): Promise<CustomerEntity> {
    try {
      return await this._customerUseCase.getInstance().findCustomerByCPF(query.cpf);
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
      return this._customerUseCase.getInstance().createCustomer(createCustomerDto);
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
