import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DeleteCategoryDto } from './dto/delete-category.dto';
import { FindByNameCategoryDto } from './dto/find-ByName.dto';
import { CategoryEntity } from './entities/category.entity';
import { FindByIdAndNameDto } from './dto/find-ById-Name.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(request: Record<string, any>, createCategoryDto: CreateCategoryDto): Promise<{
        message: string;
        statusCode: import("@nestjs/common").HttpStatus;
    } | {
        message: CategoryEntity;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    findAll(): Promise<{
        data: CategoryEntity[];
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    findByName(nameCategory: FindByNameCategoryDto): Promise<{
        data: CategoryEntity;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    findOne(id: string): Promise<CategoryEntity>;
    findSubCategories(createCategoryDto: FindByNameCategoryDto): Promise<{
        data: CategoryEntity[];
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    update(request: Record<string, any>, id: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity | {
        message: string;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    remove(request: Record<string, any>, id: string, deleteCategoryDto: DeleteCategoryDto): Promise<import("typeorm").DeleteResult | {
        message: string;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    findByIdAndName(createCategoryDto: FindByIdAndNameDto): Promise<{
        data: CategoryEntity;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
}
