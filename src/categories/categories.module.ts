import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CategoryRepository } from './category.repository';
import { UserSessionService } from 'src/user/session/service/userSession.service';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User,UserRepository,CategoryEntity,CategoryRepository])],
  controllers: [CategoriesController],
  providers: [CategoriesService,UserSessionService],
  exports:[UserSessionService]
})
export class CategoriesModule {}
