import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { CategoryRepository } from 'src/categories/category.repository';
import { ProductRepository } from './product.repository';
import { Product } from './entities/product.entity';
import { UserModule } from 'src/user/user.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product,ProductRepository]),UserModule,CategoriesModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
