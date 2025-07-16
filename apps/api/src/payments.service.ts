import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PaymentsService implements OnModuleInit {
  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly rabbitClient: ClientProxy,
  ) {}

  async onModuleInit() {
    await this.rabbitClient.connect();
  }

  create(createPaymentDto: CreatePaymentDto) {
    void this.rabbitClient.emit('create_payment', createPaymentDto);

    return {
      message: 'Payment created successfully',
      payment: createPaymentDto,
    };
  }

  summary(dateRange: { from?: Date; to?: Date }) {
    const from = dateRange.from || new Date(0);
    const to = dateRange.to || new Date();

    return {
      message: `Payment summary retrieved successfully from ${from.toISOString()} to ${to.toISOString()}`,
      from,
      to,
      totalPayments: 0,
    };
  }
}
