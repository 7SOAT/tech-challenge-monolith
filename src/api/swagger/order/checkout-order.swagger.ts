import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

export function CheckoutOrderSwaggerConfig() {
    return applyDecorators(
        ApiOperation({ summary: 'Checkout an order' }),
        ApiResponse({
            status: HttpStatus.OK,
            description: 'Order checked out'
        }),
        ApiResponse({
            status: HttpStatus.NOT_FOUND,
            description: 'Order not found',
        }),
        ApiResponse({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            description: 'Internal server error',
        })
    );
}