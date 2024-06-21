import { Injectable, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

import { Cookie } from 'express-session';

import { UserRepository } from './user.repository';
import { UserSessionService } from './session/service/userSession.service';

@Module({
  imports:[TypeOrmModule.forFeature([User,UserRepository])],
  controllers: [UserController],
  providers: [UserService,UserSessionService],
  exports:[UserSessionService]
})
export class UserModule {}
