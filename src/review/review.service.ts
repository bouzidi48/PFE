import { HttpStatus, Injectable, Session } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UserService } from 'src/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewEntity } from './entities/review.entity';
import { ProductService } from 'src/product/product.service';
import { request } from 'express';
import { Roles } from '../enum/user_enum';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewService {
  constructor(
  
  private readonly userService:UserService,
  private readonly productService : ProductService,
  @InjectRepository(ReviewEntity) private readonly reviewRepository:ReviewRepository ){}

  async create(@Session() request:Record<string, any>,createReviewDto: CreateReviewDto)  { 
    const idAdmin=request.idUser 
    if(!idAdmin){
      return await {
        message: 'vous devez vous connecter pour ajouter un review',
        statusCode: HttpStatus.BAD_REQUEST,
      }
    }
    const admin= await this.userService.findById(idAdmin)
    if(!admin || (admin.data.role!=Roles.ADMIN &&  admin.data.role!=Roles.USER) ) {
      return await{
        message:'vous devez etre appartient a cette application',
        statusCode:HttpStatus.BAD_REQUEST,
      
      }
    }
    const product = await this.productService.findByNameProduct({nameProduct:createReviewDto.nameProduct});

    if(!product) {
      return await{
        message:'ce produit n\'existe pas',
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }

    let review = await this.findOneByUserAndProduct(idAdmin,createReviewDto.productId);
    if(review){
      return await{
        message:'ce review existe deja',
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
      review=this.reviewRepository.create(createReviewDto);
      review.user=admin.data;
      //review.product=product;
      review.createdate=new Date();
      this.reviewRepository.save(review)
      return await {
        message:'review  ajoute avec succes',
        statusCode:HttpStatus.OK,
      
      }
  }
  findAll() {
    return `This action returns all review`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }

  async findOneByUserAndProduct(userId:number,productId:number){
    return await this.reviewRepository.findOne({
      where : {
        user : {
          id : userId
        },
        product : {
          id : productId
        }
      },
      relations:{
        user:true,
        product:{
          category:true
        }
      }
    })
  }
}
