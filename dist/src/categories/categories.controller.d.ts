import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
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
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCategoryDto: UpdateCategoryDto): string;
    remove(id: string): string;
}
