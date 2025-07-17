import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { CreatePaymentDto } from '@dtos/create-payment.dto';
import { randomUUID } from 'crypto';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/payment (POST) → 200 + payload', async () => {
    const payload: CreatePaymentDto = {
      correlationId: randomUUID(),
      amount: 10,
    };

    await request(app.getHttpServer())
      .post('/payment')
      .send(payload)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            message: 'Payment created successfully',
            payment: expect.objectContaining(payload) as unknown,
          }),
        );
      });
  });
});
