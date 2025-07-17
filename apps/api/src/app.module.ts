import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DatabaseModule } from '@db/database.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBIT_URL!],
          queue: 'payments_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    DatabaseModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class AppModule {}
