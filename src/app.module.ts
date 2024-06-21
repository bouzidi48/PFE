import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data_source';
import { UserModule } from './user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import {config} from 'dotenv'
import { UserSessionService } from './user/session/service/userSession.service';
import { ProductModule } from './product/product.module';
import { CategoriesModule } from './categories/categories.module';
import { CardModule } from './card/card.module';
import { PaymentModule } from './payment/payment.module';
import { PaymentModule } from './payment/payment.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    MailerModule.forRoot({
      transport:{
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: false,
        auth: {
          user:process.env.EMAIL_HOST_USER,
          pass:process.env.EMAIL_HOST_PASSWORD
        },
      },
    }),
    ProductModule,
    CategoriesModule,
    CardModule,
    PaymentModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService,UserSessionService],
})
export class AppModule {}
