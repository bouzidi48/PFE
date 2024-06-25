import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data_source';
import { UserModule } from './user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import {config} from 'dotenv'


import { CategoriesModule } from './categories/categories.module';
import { CardModule } from './card/card.module';

import { ReviewModule } from './review/review.module';
import { InscriptionModule } from './inscription/inscription.module';
import { AuthentificationModule } from './authentification/authentification.module';

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
    
    CategoriesModule,
    CardModule,
   
    ReviewModule,
   
    InscriptionModule,
   
    AuthentificationModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
