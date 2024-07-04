import { Injectable, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

import { Cookie } from 'express-session';

import { UserRepository } from './user.repository';
import { OrderModule } from 'src/order/order.module';


@Module({
  imports:[TypeOrmModule.forFeature([User,UserRepository])],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
