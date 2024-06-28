import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CategoryRepository } from './category.repository';

import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity,CategoryRepository,User,UserRepository])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  
  
})
export class CategoriesModule {}
