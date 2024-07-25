import { Controller, Get, Post, Body, Param, Req, Query, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import CustomerEntity from 'Entities/customer.entity';
import { CustomerUseCase } from 'useCases/customer.usecase';

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(
    private _customerUseCase: CustomerUseCase
  ) { }
  
  @Get('by-params')
  @ApiOperation({ summary: 'Find customer by CPF number', parameters: [{ name: "cpf", in: 'query' }] })
  @ApiQuery({ name: "cpf", description: "Customer CPF number" })
  async findOne(@Query() query: { cpf: string }): Promise<CustomerEntity> {
    try {
      return await this._customerUseCase.findCustomerByCPF(query.cpf);
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
      return this._customerUseCase.createCustomer(createCustomerDto);
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
