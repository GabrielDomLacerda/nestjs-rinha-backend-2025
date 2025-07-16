import { UUID } from 'crypto';

export interface CreatePaymentDto {
  amount: number;
  correlationId: UUID;
}
