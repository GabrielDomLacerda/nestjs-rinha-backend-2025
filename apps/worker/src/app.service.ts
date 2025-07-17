import { DRIZZLE } from '@db/drizzle.provider';
import { PgDatabase } from '@db/drizzle.types';
import { payments } from '@db/schema';
import { CreatePaymentDto } from '@dtos/create-payment.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject(DRIZZLE) private readonly db: PgDatabase) {}
  async processPayment(data: CreatePaymentDto) {
    return await this.db
      .insert(payments)
      .values({
        type: 'default',
        amount: data.amount.toFixed(2),
        correlationId: data.correlationId,
        createdAt: new Date(),
      })
      .returning();
  }
}
