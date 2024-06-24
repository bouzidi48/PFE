import { Module } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import { AuthentificationController } from './authentification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { UserSessionService } from 'src/user/session/service/userSession.service';

@Module({
  imports:[TypeOrmModule.forFeature([User,UserRepository])],
  controllers: [AuthentificationController],
  providers: [AuthentificationService,UserSessionService],
  exports:[UserSessionService]
})
export class AuthentificationModule {}
