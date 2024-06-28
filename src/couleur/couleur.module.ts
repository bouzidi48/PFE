import { Module } from '@nestjs/common';
import { CouleurService } from './couleur.service';
import { CouleurController } from './couleur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { Couleur } from './entities/couleur.entity';
import { Product } from 'src/product/entities/product.entity';
import { ProductRepository } from 'src/product/product.repository';
import { CouleurRepository } from './couleur.repository';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Couleur,CouleurRepository]),UserModule,ProductModule],
  controllers: [CouleurController],
  providers: [CouleurService],
})
export class CouleurModule {}
