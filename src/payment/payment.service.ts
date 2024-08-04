import { forwardRef, HttpStatus, Inject, Injectable, NotFoundException, Session } from '@nestjs/common';
import { CreateCardPaymentDto } from './dto/create-payment-card.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentRepository } from './payment.repository';
import { Order } from 'src/order/entities/order.entity';
import { OrderRepository } from 'src/order/order.repository';
import { CreateCashPaymentDto } from './dto/create-payment-cash.dto';
import { PaymentStatus } from 'src/enum/payment_status.enum';
import { OrderController } from 'src/order/order.controller';
import { PaymentMethod } from 'src/enum/payment_method.enum';
import { OrderService } from 'src/order/order.service';
import * as crypto from 'crypto';
import { UpdateCashPaymentDto } from './dto/update-cash-payment.dto';
import { OrderStatus } from 'src/enum/order-status.enum';
import { Roles } from 'src/enum/user_enum';
import { UserService } from 'src/user/user.service';
import { UpdateCardPaymentDto } from './dto/update-card-payment.dto';
import { UserController } from 'src/user/user.controller';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class PaymentService {
  public stripe: Stripe;
  private readonly encryptionKey: string;
  constructor(
    @InjectRepository
    (Payment) private readonly paymentRepository: PaymentRepository,
    @Inject(forwardRef(() => OrderService))
    private readonly orderService:OrderService,
    private readonly userService:UserService,
    private configService: ConfigService
    

  ){    this.encryptionKey = process.env.ENCRYPTION_KEY;
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    });
  }
  async createCashPayment(createCashPaymentDto: CreateCashPaymentDto) {
    const { orderId } = createCashPaymentDto;
    const order = await this.orderService.findOne(orderId);

    if (!order) {
        return await {
          message:`Order with this id :${orderId} does not exist`,
          statusCode: HttpStatus.BAD_REQUEST,
        }
    }

    const payment = this.paymentRepository.create({
        order: order.data,
        payment_method: PaymentMethod.CASH,
        payment_status: PaymentStatus.PENDING,
        payment_date: new Date(),
        created_at: new Date(),

    });

    await this.paymentRepository.save(payment);
    return await {
      data:payment,
      statusCode: HttpStatus.OK,
    }
}
async createCardPayment(createCardPaymentDto: CreateCardPaymentDto){
  const { orderId, cardNumber, cardExpiry, cardCvc } = createCardPaymentDto;
  const order = await this.orderService.findOne(orderId);
  if (!order) {
    return await {
      message:`Order with this id :${orderId} does not exist`,
      statusCode: HttpStatus.BAD_REQUEST,
    }
  }
  
  // Encrypt card details before saving (implement your encryption logic here)
  const encryptedCardNumber = this.encryptCardDetails(cardNumber);
  const encryptedCardExpiry = this.encryptCardDetails(cardExpiry);
  const encryptedCardCvc = this.encryptCardDetails(cardCvc);

  const paymentIntent = await this.stripe.paymentIntents.create({
    amount: order.data.total_amount * 100, // Le montant en centimes
    currency: 'usd',
    payment_method_types: ['card'],
    metadata: { orderId: orderId.toString() },
  });

  const payment = this.paymentRepository.create({
    order:order.data,
    payment_method: PaymentMethod.CARD,
    payment_status: PaymentStatus.PENDING,
   
    created_at: new Date(),
   
    cardNumber: encryptedCardNumber,
    cardExpiry: encryptedCardExpiry,
    cardCvc: encryptedCardCvc,

  });
  await this.paymentRepository.save(payment);

  return await {
    data:payment,
    client_secret: paymentIntent.client_secret,
    statusCode: HttpStatus.OK,
  }
}
async handleWebhook(event: Stripe.Event) {
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      // Traitez le paiement réussi ici
      break;
    // Gérez d'autres types d'événements Stripe ici
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
}
/* private encryptCardDetails(cardDetail: string): string {
  // Implémentez ici votre logique de chiffrement
  return cardDetail; // Ceci est un exemple, remplacez par une vraie implémentation de chiffrement
} */

  private encryptCardDetails(cardDetail: string): string {
    const iv = crypto.randomBytes(16);
    const encryptionKey = crypto.randomBytes(32).toString('hex'); // Génère une nouvelle clé à chaque appel, assurez-vous que cela est conforme à vos besoins
    console.log('Encryption Key:', encryptionKey);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey, 'hex'), iv);
  
    let encrypted = cipher.update(cardDetail, 'utf8', 'hex');
    encrypted += cipher.final('hex');
  
    return `${iv.toString('hex')}:${encrypted}`;
  }
  
  private decryptCardDetails(encryptedDetail: string): string {
    const [iv, encrypted] = encryptedDetail.split(':');
    const encryptionKey = crypto.randomBytes(32).toString('hex'); // Assurez-vous d'avoir la même clé pour décrypter
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey, 'hex'), Buffer.from(iv, 'hex'));
  
    let decrypted = decipher.update(Buffer.from(encrypted, 'hex'));
    decrypted = Buffer.concat([decrypted, decipher.final()]);
  
    return decrypted.toString('utf8');
  }
  

  async updatePaymentCash( updateCashPaymentDto: UpdateCashPaymentDto) {
    

    const { paymentId } = updateCashPaymentDto;
    console.log(paymentId)
    const payment = await this.paymentRepository.findOne({ where: { id: paymentId }, relations: ['order'] });

    if (!payment) {
      return await {
        message: `Le paiement ${paymentId} n'existe pas`,
        statusCode: HttpStatus.BAD_REQUEST,
      }
    }

    const order = await this.orderService.findOne(payment.order.id);

    if (!order) {
      return await {
        message: `La commande ${payment.order.id} n'existe pas`,
        statusCode: HttpStatus.BAD_REQUEST,
      }
    }

    if (order.data.status === OrderStatus.DELIVERED) {
      payment.payment_status = PaymentStatus.COMPLETED;
      payment.updated_at=new Date();
    
    }
    

    await this.paymentRepository.save(payment);
    

    return {
      message: 'Le statut du paiement a été mis à jour avec succès',
      statusCode: HttpStatus.OK,
      data: payment,
    };
  }


  findAll() {
    return `This action returns all payment`;
  }

 async  findOne(id: number) {
   const paymentid=await this.paymentRepository.findOne({where:{id:id}})
   if(!paymentid){
    return await {
      data:null,
      statusCode:HttpStatus.BAD_REQUEST,
    }
   }
   return await {
    data:paymentid,
    statusCode:HttpStatus.BAD_REQUEST,
  }
  }
    

   async updatePaymentCard( updateCardPaymentDto: UpdateCardPaymentDto) {
      const {paymentId} = updateCardPaymentDto;
      const payment = await this.paymentRepository.findOne({ where: { id: paymentId }, relations: ['order'] });
      if (!payment) {
        return await {
          message: `Le paiement ${paymentId} n'existe pas`,
          statusCode: HttpStatus.BAD_REQUEST,
        }
      }

      const order = await this.orderService.findOne(payment.order.id);

      if (!order) {
        return await {
          message: `La commande ${payment.order.id} n'existe pas`,
          statusCode: HttpStatus.BAD_REQUEST,
        }

      }

      if(order.data.status===OrderStatus.SHIPPED){
        payment.payment_status = PaymentStatus.PENDING;
        payment.payment_date=order.data.order_date;

      }else
       if(order.data.status===OrderStatus.DELIVERED){

        payment.payment_status = PaymentStatus.COMPLETED;
        payment.updated_at=new Date();
      }


  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }

  
}
