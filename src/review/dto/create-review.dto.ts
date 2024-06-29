import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateReviewDto {
   @IsNotEmpty({message:'Product should be empty'})
   @IsNumber({},{message:'Product Id should be number'})
   @IsOptional()
    productId:number;

    @IsNotEmpty({message:'title can not be empty'})
    @IsString({message:'title should be string '})
    nameProduct:string;
    
    @IsNotEmpty({message:'ratings could not be empty'})
    @IsNumber()
    ratings:number;
    @IsNotEmpty({message:'comment should not empty'})
    @IsString()
    comment:string;
}
