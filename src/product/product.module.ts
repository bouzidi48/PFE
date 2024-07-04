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
import { CouleurModule } from 'src/couleur/couleur.module';
import { Couleur } from 'src/couleur/entities/couleur.entity';
import { Size } from 'src/size/entities/size.entity';
import { SizeRepository } from 'src/size/size.repository';
import { UserController } from 'src/user/user.controller';
import { CategoriesController } from 'src/categories/categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product,ProductRepository,Couleur,CategoryRepository,Size,SizeRepository]),UserModule,CategoriesModule],
  controllers: [ProductController],
  providers: [ProductService,UserController,CategoriesController],
 exports: [ProductService],
})
export class ProductModule {}
