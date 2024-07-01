import { HttpStatus } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UserService } from 'src/user/user.service';
import { ReviewEntity } from './entities/review.entity';
import { ProductService } from 'src/product/product.service';
import { ReviewRepository } from './review.repository';
import { FindByNameProductDto } from 'src/product/dto/find-by-name-product.dto';
import { DeleteReviewDto } from './dto/delete-review.dto';
export declare class ReviewService {
    private readonly userService;
    private readonly productService;
    private readonly reviewRepository;
    constructor(userService: UserService, productService: ProductService, reviewRepository: ReviewRepository);
    create(request: Record<string, any>, createReviewDto: CreateReviewDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    findAll(): Promise<{
        data: ReviewEntity[];
        statusCode: HttpStatus;
    }>;
    findAllByProduct(nameProdct: FindByNameProductDto): Promise<ReviewEntity[]>;
    getAverageRating(nameProductDto: FindByNameProductDto): Promise<number | {
        data: number;
        statusCode: HttpStatus;
    }>;
    findOne(id: number): Promise<ReviewEntity>;
    updateReview(request: Record<string, any>, updateReviewDto: UpdateReviewDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    deleteReview(request: Record<string, any>, deleteReviewDto: DeleteReviewDto): Promise<{
        message: string;
        statusCode: HttpStatus;
    }>;
    findOneByUserAndProduct(userId: number): Promise<ReviewEntity>;
}
