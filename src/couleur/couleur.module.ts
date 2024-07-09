import { forwardRef, Module } from '@nestjs/common';
import { CouleurService } from './couleur.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { Couleur } from './entities/couleur.entity';
import { Product } from 'src/product/entities/product.entity';
import { ProductRepository } from 'src/product/product.repository';
import { CouleurRepository } from './couleur.repository';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { CouleurController } from './couleur.controller';
import { UserController } from 'src/user/user.controller';
import { ProductController } from 'src/product/product.controller';
import { CategoriesController } from 'src/categories/categories.controller';
import { SizeModule } from 'src/size/size.module';
import { ImagesModule } from 'src/images/images.module';

@Module({
  imports: [TypeOrmModule.forFeature([Couleur,CouleurRepository]),UserModule,ProductModule,CategoriesModule,forwardRef(() => SizeModule),forwardRef(() => ImagesModule)],
  controllers: [CouleurController],
  providers: [CouleurService,UserController,ProductController,CategoriesController],
  exports: [CouleurService],
})
export class CouleurModule {}
