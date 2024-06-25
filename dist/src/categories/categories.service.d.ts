import { HttpStatus } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { UserRepository } from 'src/user/user.repository';
import { CategoryRepository } from './category.repository';
export declare class CategoriesService {
    private readonly categoryRepository;
    private userRepository;
    constructor(categoryRepository: CategoryRepository, userRepository: UserRepository);
    create(request: Record<string, any>, createCategoryDto: CreateCategoryDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    } | {
        message: CategoryEntity;
        statusCode: HttpStatus;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCategoryDto: UpdateCategoryDto): string;
    remove(id: number): string;
}
