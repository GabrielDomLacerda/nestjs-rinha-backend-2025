import {
  Body,
  Controller,
  Get,
  ParseDatePipe,
  Post,
  Query,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dtos/create-payment.dto';

@Controller()
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @Post('payments')
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.service.create(createPaymentDto);
  }

  @Get('payments-summary')
  getSummary(
    @Query('from', ParseDatePipe) from?: Date,
    @Query('to', ParseDatePipe) to?: Date,
  ) {
    return this.service.summary({ from, to });
  }
}
