import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Session, ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import { OrderService } from './order/order.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: { 
        maxAge: 24 * 60 * 60 * 1000 // Durée de vie du cookie en millisecondes (1 jour ici)
      }
    }),
  );
  app.useGlobalPipes(new ValidationPipe({whitelist:true}));
  
  await app.listen(3000);

  const orderService = app.get(OrderService);
  
  orderService.startScheduledTask();
}
bootstrap();
