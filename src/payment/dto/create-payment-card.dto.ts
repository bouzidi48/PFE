import { IsEnum, IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { PaymentMethod } from 'src/enum/payment_method.enum';

export class CreateCardPaymentDto {
  @IsNumber()
  orderId: number;

 

  

  @IsString()
  @IsNotEmpty()
  cardNumber: string;

  @IsString()
  @IsNotEmpty()
  cardExpiry: string;

  @IsString()
  @IsNotEmpty()
  cardCvc: string;
}
