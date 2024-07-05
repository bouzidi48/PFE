import { HttpStatus } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { CategoryRepository } from './category.repository';
import { DeleteCategoryDto } from './dto/delete-category.dto';
import { FindByNameCategoryDto } from './dto/find-ByName.dto';
import { UserController } from 'src/user/user.controller';
import { FindByIdAndNameDto } from './dto/find-ById-Name.dto';
import { FindByNameParentDto } from './dto/find-ByParentName.dto';
export declare class CategoriesService {
    private readonly categoryRepository;
    private readonly userService;
    constructor(categoryRepository: CategoryRepository, userService: UserController);
    create(request: Record<string, any>, createCategoryDto: CreateCategoryDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    } | {
        message: CategoryEntity;
        statusCode: HttpStatus;
    }>;
    findByIdAndName(createCategoryDto: FindByIdAndNameDto): Promise<{
        data: CategoryEntity;
        statusCode: HttpStatus;
    }>;
    findSubcategories(parentCategoryName: FindByNameParentDto): Promise<{
        data: CategoryEntity[];
        statusCode: HttpStatus;
    }>;
    findAll(): Promise<{
        data: CategoryEntity[];
        statusCode: HttpStatus;
    }>;
    findByName(nameCategory: FindByNameCategoryDto): Promise<{
        data: CategoryEntity;
        statusCode: HttpStatus;
    }>;
    findOne(id: number): Promise<CategoryEntity>;
    update(request: Record<string, any>, id: number, fields: Partial<UpdateCategoryDto>): Promise<{
        message: string;
        statusCode: HttpStatus;
    } | {
        message: CategoryEntity;
        statusCode: HttpStatus;
    }>;
    remove(request: Record<string, any>, id: number, fields: Partial<DeleteCategoryDto>): Promise<{
        message: string;
        statusCode: HttpStatus;
    } | {
        message: CategoryEntity;
        statusCode: HttpStatus;
    }>;
}
