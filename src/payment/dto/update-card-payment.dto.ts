import { PartialType } from "@nestjs/mapped-types";
import { CreateCardPaymentDto } from "./create-payment-card.dto";
import { IsEnum, IsNumber } from "class-validator";
import { PaymentMethod } from "src/enum/payment_method.enum";


export class UpdateCardPaymentDto  {
    @IsNumber()
    orderId: number;
    @IsNumber()
    paymentId:number;
  
    @IsEnum(PaymentMethod)
    paymentMethod: PaymentMethod;

}