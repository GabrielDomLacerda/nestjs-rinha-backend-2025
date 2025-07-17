import { DRIZZLE } from '@db/drizzle.provider';
import { PgDatabase } from '@db/drizzle.types';
import { payments } from '@db/schema';
import { CreatePaymentDto } from '@dtos/create-payment.dto';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { between, count, sum } from 'drizzle-orm';

@Injectable()
export class PaymentsService implements OnModuleInit {
  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly rabbitClient: ClientProxy,
    @Inject(DRIZZLE) private readonly db: PgDatabase,
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

  async summary(dateRange: { from?: Date; to?: Date }) {
    const from = dateRange.from ?? new Date(0);
    const to = dateRange.to ?? new Date();

    const results = await this.db
      .select({
        type: payments.type,
        totalAmount: sum(payments.amount).as('totalAmount'),
        totalRequests: count().as('totalRequests'),
      })
      .from(payments)
      .where(between(payments.createdAt, from, to))
      .groupBy(payments.type);

    const base = {
      default: { totalAmount: 0, totalRequests: 0 },
      fallback: { totalAmount: 0, totalRequests: 0 },
    };

    return results.reduce((result, row) => {
      result[row.type] = {
        totalAmount: Number(row.totalAmount), // `decimal` → number
        totalRequests: Number(row.totalRequests),
      };
      return result;
    }, base);
  }
}
