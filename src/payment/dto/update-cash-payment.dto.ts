import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './CreatePayment.dto';
import { CreateCashPaymentDto } from './create-payment-cash.dto';


export class UpdateCashPaymentDto extends PartialType(CreateCashPaymentDto) {}
