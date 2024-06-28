import { Module } from '@nestjs/common';
import { SizeService } from './size.service';
import { SizeController } from './size.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { Product } from 'src/product/entities/product.entity';
import { ProductRepository } from 'src/product/product.repository';
import { Size } from './entities/size.entity';
import { SizeRepository } from './size.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User,UserRepository,Product,ProductRepository,Size,SizeRepository])],
  controllers: [SizeController],
  providers: [SizeService],
})
export class SizeModule {}
