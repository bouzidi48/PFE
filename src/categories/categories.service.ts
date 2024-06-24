import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(CategoryEntity)private readonly categoryRepository:Repository<CategoryEntity>){}
  
   async create(createCategoryDto: CreateCategoryDto,currentUser:User):Promise<CategoryEntity>{
    const category=await this.categoryRepository.create(createCategoryDto);
    category.addedBy=currentUser;
    return await this.categoryRepository.save(category);
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
function CurrentUser(): (target: CategoriesService, propertyKey: "create", parameterIndex: 1) => void {
  throw new Error('Function not implemented.');
}

