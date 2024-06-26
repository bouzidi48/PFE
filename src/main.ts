import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';

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
}
bootstrap();
