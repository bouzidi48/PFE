import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty({message:'title can not be empty'})
    @IsString({message:'title should be string '})
    nameProduct:string;

    @IsNotEmpty({message:'description can not be empty'})
    @IsString({message:'description should be string '})
    description:string;

    @IsNotEmpty({message:'price can not be empty'})
    price:number;

    @IsNotEmpty({message:'stock can not be empty'})
    stockQuantity:number;

    @IsNotEmpty({message:'nomCategory can not be empty'})
    nomCategory:string;
}
