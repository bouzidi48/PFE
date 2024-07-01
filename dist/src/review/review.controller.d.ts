import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewEntity } from './entities/review.entity';
import { FindByNameProductDto } from 'src/product/dto/find-by-name-product.dto';
import { DeleteReviewDto } from './dto/delete-review.dto';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    create(request: Record<string, any>, createReviewDto: CreateReviewDto): Promise<{
        message: string;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    findAll(): Promise<{
        data: ReviewEntity[];
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    findAllByProduct(nameProdct: FindByNameProductDto): Promise<ReviewEntity[]>;
    getAverageRating(nameProductDto: FindByNameProductDto): Promise<{
        averageRating: number | {
            data: number;
            statusCode: import("@nestjs/common").HttpStatus;
        };
    }>;
    findOne(id: string): Promise<ReviewEntity>;
    updateReview(request: Record<string, any>, updateReviewDto: UpdateReviewDto): Promise<{
        message: string;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    deleteReview(request: Record<string, any>, deleteReviewDto: DeleteReviewDto): Promise<{
        message: string;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
}
