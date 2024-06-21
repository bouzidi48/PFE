import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductRepository } from './product.repository';
import { ProductSessionService } from './session/service/productSession.service';

@Module({
  imports:[TypeOrmModule.forFeature([Product,ProductRepository])],
  controllers: [ProductController],
  providers: [ProductService,ProductSessionService],
  exports:[ProductSessionService]
})
export class ProductModule {}
