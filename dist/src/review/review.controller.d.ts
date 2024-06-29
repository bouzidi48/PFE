import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    create(request: Record<string, any>, createReviewDto: CreateReviewDto): Promise<{
        message: string;
        statusCode: import("@nestjs/common").HttpStatus;
    }>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateReviewDto: UpdateReviewDto): string;
    remove(id: string): string;
}
