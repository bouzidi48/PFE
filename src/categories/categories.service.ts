import { HttpStatus, Injectable, NotFoundException, Session } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';

import { CategoryRepository } from './category.repository';
import { Roles } from 'src/enum/user_enum';
import { DeleteCategoryDto } from './dto/delete-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)private readonly categoryRepository:CategoryRepository,
    @InjectRepository(User) private userRepository:UserRepository,
 
  ){}
  
   
  async create(@Session() request:Record<string, any>,createCategoryDto: CreateCategoryDto){
    const idAdmin=request.idUser
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
    category.createdAt=new Date();
    this.categoryRepository.save(category)
    return await {
      message:category,
      statusCode:HttpStatus.OK,
    
    }
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  /* async findByName(nameCategory:String){
   return await this.categoryRepository.find({select:{nameCategory:true}})
 }  */
 async  findOne(id: number):Promise<CategoryEntity> {
    return  await this.categoryRepository.findOne(
      {
        where:{id:id}, 
        relations:{addedBy:true},
        select:{
          addedBy:{
            id:true,
            username:true,
            email:true,
            

          }
        }
        
    });
  }

  async update(@Session() request:Record<string, any>,id: number, fields:Partial< UpdateCategoryDto> ) {
    const category=await this.findOne(id);
    if(!category) throw new NotFoundException('Catgory not found.');
    Object.assign(category,fields);
    category.updatedAt=new Date();
    return await  this.categoryRepository.save(category);
  }

  async remove(@Session() request:Record<string, any>,id: number, fields:Partial< DeleteCategoryDto>) {
    const category=await this.findOne(id);
    if(!category) throw new NotFoundException('Catgory not found.');
    Object.assign(category,fields);

    return await this.categoryRepository.delete(id);

    
  }
}
function CurrentUser(): (target: CategoriesService, propertyKey: "create", parameterIndex: 1) => void {
  throw new Error('Function not implemented.');
}

