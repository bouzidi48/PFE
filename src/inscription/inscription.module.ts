import { Module } from '@nestjs/common';
import { InscriptionService } from './inscription.service';
import { InscriptionController } from './inscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { UserSessionService } from 'src/user/session/service/userSession.service';

@Module({
  imports:[TypeOrmModule.forFeature([User,UserRepository])],
  controllers: [InscriptionController],
  providers: [InscriptionService],
})
export class InscriptionModule {}
