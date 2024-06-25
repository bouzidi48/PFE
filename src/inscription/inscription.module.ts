import { Module } from '@nestjs/common';
import { InscriptionService } from './inscription.service';
import { InscriptionController } from './inscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';


@Module({
  imports:[TypeOrmModule.forFeature([User,UserRepository])],
  controllers: [InscriptionController],
  providers: [InscriptionService],
})
export class InscriptionModule {}
