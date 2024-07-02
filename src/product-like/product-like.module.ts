import { Module } from '@nestjs/common';
import { ProductLikeService } from './product-like.service';
import { ProductLikeController } from './product-like.controller';

@Module({
  controllers: [ProductLikeController],
  providers: [ProductLikeService],
})
export class ProductLikeModule {}
