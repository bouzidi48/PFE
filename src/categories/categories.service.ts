import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';

import { CategoryRepository } from './category.repository';
import { Roles } from 'src/enum/user_enum';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)private readonly categoryRepository:CategoryRepository,
    @InjectRepository(User) private userRepository:UserRepository,
    private readonly session: UserSessionService
  ){}
  
   async create(createCategoryDto: CreateCategoryDto){
    const idAdmin=await this.session.session.get('idUser')
    console.log(idAdmin)
    if(!idAdmin){
      return await {
        message: 'vous devez vous connecter pour ajouter une categorie',
        statusCode: HttpStatus.BAD_REQUEST,
      }
    }
    const admin= await this.userRepository.findOne({where : {id:idAdmin}})
    if(!admin || admin.role!=Roles.ADMIN) {
      return await{
        message:'vous devez etre un admin',
        statusCode:HttpStatus.BAD_REQUEST,
      
      }
    }
    const category=await this.categoryRepository.create(createCategoryDto);
    category.addedBy=admin;
    this.categoryRepository.save(category)
    return await {
      message:'ajout avec succés',
      statusCode:HttpStatus.OK,
    
    }
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

