import { HttpException, HttpStatus, Injectable, NotFoundException, Session } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { IsNull, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';

import { CategoryRepository } from './category.repository';
import { Roles } from 'src/enum/user_enum';
import { DeleteCategoryDto } from './dto/delete-category.dto';
import { FindByNameCategoryDto } from './dto/find-ByName.dto';




@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity) private readonly categoryRepository:CategoryRepository,
    private readonly userService:UserService,
 
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
    const admin= await this.userService.findById(idAdmin)
    if(!admin || admin.role!=Roles.ADMIN) {
      return await{
        message:'vous devez etre un admin',
        statusCode:HttpStatus.BAD_REQUEST,
      
      }
    }
    const category1=await this.categoryRepository.findOne({where : {nameCategory:createCategoryDto.nameCategory}});
    if(category1) {
      return await{
        message:'ce category existe deja',
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    const category=await this.categoryRepository.create(createCategoryDto);
    if(!createCategoryDto.NameparentCategory) {
      
      category.addedBy=admin;
      category.createdAt=new Date();
      this.categoryRepository.save(category)
    }
    else {
      const parent = await this.categoryRepository.findOne({where : {nameCategory:createCategoryDto.NameparentCategory}})
      if(!parent) {
        return await {
          message: 'la categorie parente n\'existe pas',
          statusCode:HttpStatus.BAD_REQUEST,

        }
      }
      category.addedBy=admin;
      category.createdAt=new Date();
      category.parentCategory=parent
      this.categoryRepository.save(category)
    }
    
    return await {
      message:category,
      statusCode:HttpStatus.OK,
    
    }
  }
  

  async findSubcategories(parentCategoryName: FindByNameCategoryDto){
    const category = this.categoryRepository.findOne({ where: { nameCategory: parentCategoryName.nameCategory }});
    if(!category) {
      return {
        message: 'la categorie parente n\'existe pas',
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
    
    const subcategories = await this.categoryRepository.find({ where: { parentCategory : { id: (await category).id } }});
    return {
      message: subcategories,
      statusCode: HttpStatus.OK,
    };
  }
  
  async findAll() {
    const categories = await this.categoryRepository.find();
    if(!categories) {
      return await{
        message:'aucun produit n\'existe',
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    return await {
      message:categories,
      statusCode:HttpStatus.OK,
    }
  }
  async findByName(nameCategory:FindByNameCategoryDto ) {
    return await this.categoryRepository.find({ where: { nameCategory: nameCategory.nameCategory }, select: {} });
  }
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

  /* async update(@Session() request:Record<string, any>,id: number, fields:Partial< UpdateCategoryDto> ) {
    const category=await this.findOne(id);
    if(!category) throw new NotFoundException('Catgory not found.');
    Object.assign(category,fields);
    category.updatedAt=new Date();
    return await  this.categoryRepository.save(category);
  } */

    async update(@Session() request: Record<string, any>, id: number, fields: Partial<UpdateCategoryDto>) {
      const category = await this.findOne(id);
      if (!category) throw new NotFoundException('Category not found.');
      const idAdmin=request.idUser
      if(!idAdmin) {
        return await {
          message: 'vous devez vous connecter pour Modifier une categorie',
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
    
      Object.assign(category, fields);
      category.updatedAt = new Date();
      return await this.categoryRepository.save(category);
    }

  async remove(@Session() request:Record<string, any>,id: number, fields:Partial< DeleteCategoryDto>) {
    const category = await this.findOne(id);
    if (!category) throw new NotFoundException('Category not found.');
    const idAdmin=request.idUser
    if(!idAdmin) {
      return await {
        message: 'vous devez vous connecter pour Modifier une categorie',
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
    Object.assign(category,fields);

    return await this.categoryRepository.delete(id);

    
  }
}

