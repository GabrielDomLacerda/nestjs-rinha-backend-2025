import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { UUID } from 'crypto';

describe('AppController', () => {
  let appController: PaymentsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [PaymentsService],
    }).compile();

    appController = app.get<PaymentsController>(PaymentsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const createPaymentDto = {
        amount: 100,
        correlationId: '123e4567-e89b-12d3-a456-426614174000' as UUID,
      };
      expect(appController.create(createPaymentDto)).toBe({
        message: 'Payment created successfully',
        payment: createPaymentDto,
      });
    });
  });
});
