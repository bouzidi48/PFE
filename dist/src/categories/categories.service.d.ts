import { HttpStatus } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { UserService } from 'src/user/user.service';
import { CategoryRepository } from './category.repository';
import { DeleteCategoryDto } from './dto/delete-category.dto';
import { FindByNameCategoryDto } from './dto/find-ByName.dto';
import { FindByIdAndNameDto } from './dto/find-ById-Name.dto';
export declare class CategoriesService {
    private readonly categoryRepository;
    private readonly userService;
    constructor(categoryRepository: CategoryRepository, userService: UserService);
    create(request: Record<string, any>, createCategoryDto: CreateCategoryDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    } | {
        message: CategoryEntity;
        statusCode: HttpStatus;
    }>;
    findAll(): Promise<{
        message: string;
        statusCode: HttpStatus;
    } | {
        message: CategoryEntity[];
        statusCode: HttpStatus;
    }>;
    findSubcategories(parentCategoryName: FindByNameCategoryDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    } | {
        message: CategoryEntity[];
        statusCode: HttpStatus;
    }>;
    findByName(nameCategories: FindByNameCategoryDto): Promise<CategoryEntity>;
    findOne(id: number): Promise<CategoryEntity>;
    update(request: Record<string, any>, id: number, fields: Partial<UpdateCategoryDto>): Promise<CategoryEntity | {
        message: string;
        statusCode: HttpStatus;
    }>;
    remove(request: Record<string, any>, id: number, fields: Partial<DeleteCategoryDto>): Promise<import("typeorm").DeleteResult | {
        message: string;
        statusCode: HttpStatus;
    }>;
    findByIdAndName(createCategoryDto: FindByIdAndNameDto): Promise<CategoryEntity>;
}
