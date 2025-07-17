import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreatePaymentDto } from '@dtos/create-payment.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('create_payment')
  getHello(@Payload() data: CreatePaymentDto) {
    return this.appService.processPayment(data);
  }
}
