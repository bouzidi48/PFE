import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Session, ParseIntPipe, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { User } from 'src/user/entities/user.entity';
import { Roles } from 'src/enum/user_enum';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { DeleteCategoryDto } from './dto/delete-category.dto';
import { FindByNameCategoryDto } from './dto/find-ByName.dto';
import { CategoryEntity } from './entities/category.entity';
import { FindByIdAndNameDto } from './dto/find-ById-Name.dto';
import { FindByNameParentDto } from './dto/find-ByParentName.dto';



@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Post('creat')
 async create(@Session() request:Record<string, any>,@Body() createCategoryDto: CreateCategoryDto ) {
    return  await this.categoriesService.create(request,createCategoryDto);
    
  }

  @Get('findByIdAndName')
  async findByIdAndName(@Body() createCategoryDto: FindByIdAndNameDto ) {
    return  await this.categoriesService.findByIdAndName(createCategoryDto);
  }
  
  @Get('Subcategories')
  async findSubcategories(@Body()parentCategory:FindByNameParentDto){
    return await this.categoriesService.findSubcategories(parentCategory)
  }

  @Get('all')
  async findAll() {
    return await this.categoriesService.findAll();
  }

  

  @Get('nameCategory')
  async findByName(@Body()nameCategory:FindByNameCategoryDto){
    return await this.categoriesService.findByName(nameCategory)
  }  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  
  
  @Put(':id')
  async update(@Session() request:Record<string, any>,@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoriesService.update(request,+id,updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Session() request:Record<string, any>,@Param('id') id: string,@Body() deleteCategoryDto:DeleteCategoryDto) {
    return await this.categoriesService.remove(request,+id,deleteCategoryDto);
  }
  
  
}






