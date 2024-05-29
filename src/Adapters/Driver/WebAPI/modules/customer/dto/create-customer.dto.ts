import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateCustomerDto {
    @IsString({ message: 'name customer should be string'})
    @ApiProperty({ type: 'string', description: 'customer name' })
    name: string;

    @IsString({ message: 'email customer should be string' })
    @IsEmail()
    @ApiProperty({ type: 'string', description: 'customer email' })
    email: string;

    @IsString({ message: 'cpf customer should be a string' })
    @IsNotEmpty({ message: 'cpf customer should be not empty' })
    @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: 'cpf must be in format XXX.XXX.XXX-XX' })
    @ApiProperty({ type: 'string', description: 'cpf email' })
    cpf: string;
}
