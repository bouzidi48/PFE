import { Controller, Get, Post, Body, Patch, Param, Delete, Session, Query, Put } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { ReviewEntity } from './entities/review.entity';
import { FindByNameProductDto } from 'src/product/dto/find-by-name-product.dto';
import { DeleteReviewDto } from './dto/delete-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('creat')
   async create(@Session() request:Record<string, any>,@Body() createReviewDto: CreateReviewDto)  {
    return  await this.reviewService.create(request,createReviewDto);}

  @Get('all')
  findAll() {
    return this.reviewService.findAll();
  }
 
  
   @Get('product')
   async findAllByProduct(@Body() nameProdct: FindByNameProductDto) {
     return this.reviewService.findAllByProduct(nameProdct);
   }

   @Get('average-rating')
   async getAverageRating(@Body() nameProductDto: FindByNameProductDto) {
     const averageRating = await this.reviewService.getAverageRating(nameProductDto);
     return {averageRating };
   } 

  @Get(':id')
  async findOne(@Param('id') id: string) :Promise<ReviewEntity>{
    return await  this.reviewService.findOne(+id);

  }

  

  @Put('updateReview')
  async updateReview(
    @Session() request: Record<string, any>,
    @Body() updateReviewDto: UpdateReviewDto
  ) {
    return this.reviewService.updateReview(request, updateReviewDto);
  }

  @Delete('deleteReview')
  async deleteReview(
    @Session() request: Record<string, any>,
    @Body() deleteReviewDto: DeleteReviewDto
  ) {
    return this.reviewService.deleteReview(request, deleteReviewDto);
  }
}
