import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
export declare class CategoriesService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<CategoryEntity>);
    create(createCategoryDto: CreateCategoryDto): Promise<string>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCategoryDto: UpdateCategoryDto): string;
    remove(id: number): string;
}
