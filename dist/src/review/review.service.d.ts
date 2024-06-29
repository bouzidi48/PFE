import { HttpStatus } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UserService } from 'src/user/user.service';
import { ReviewEntity } from './entities/review.entity';
import { ProductService } from 'src/product/product.service';
import { ReviewRepository } from './review.repository';
export declare class ReviewService {
    private readonly userService;
    private readonly productService;
    private readonly reviewRepository;
    constructor(userService: UserService, productService: ProductService, reviewRepository: ReviewRepository);
    create(request: Record<string, any>, createReviewDto: CreateReviewDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateReviewDto: UpdateReviewDto): string;
    remove(id: number): string;
    findOneByUserAndProduct(userId: number): Promise<ReviewEntity>;
}
