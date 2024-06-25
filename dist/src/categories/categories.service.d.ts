import { HttpStatus } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UserRepository } from 'src/user/user.repository';
import { UserSessionService } from 'src/user/session/service/userSession.service';
import { CategoryRepository } from './category.repository';
export declare class CategoriesService {
    private readonly categoryRepository;
    private userRepository;
    private readonly session;
    constructor(categoryRepository: CategoryRepository, userRepository: UserRepository, session: UserSessionService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCategoryDto: UpdateCategoryDto): string;
    remove(id: number): string;
}
