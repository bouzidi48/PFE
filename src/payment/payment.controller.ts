import { Controller, Get, Post, Body, Patch, Param, Delete, Session, Put } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreateCardPaymentDto } from './dto/create-payment-card.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { CreateCashPaymentDto } from './dto/create-payment-cash.dto';
import { UpdateCashPaymentDto } from './dto/update-cash-payment.dto';
import { UpdateCardPaymentDto } from './dto/update-card-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('cash')
  async createCashPayment(@Body() createCashPaymentDto: CreateCashPaymentDto): Promise<Payment> {
    return await this.paymentService.createCashPayment(createCashPaymentDto);
  }
  @Post('Card')
  async createCardPayment(@Body() createCardPaymentDto: CreateCardPaymentDto): Promise<Payment> {
    return await this.paymentService.createCardPayment(createCardPaymentDto);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id:number) {
    return this.paymentService.findOne(+id);
  }

  @Put('update-cash-payment')
  updateCash(@Session() request:Record<string, any>, @Body() updateCashPaymentDto:UpdateCashPaymentDto) {
    return this.paymentService.updatePaymentCash(request,updateCashPaymentDto);
  }

  @Put('update-card-payment')
  updateCard(@Session() request:Record<string, any>, @Body() updateCardPaymentDto: UpdateCardPaymentDto) {
    return this.paymentService.updatePaymentCard(request,updateCardPaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
