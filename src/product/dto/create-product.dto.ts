import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty({message:'Name can not be null'})
    @IsString({message:'Name must be a string'})
    nameProduct: string;

    @IsNotEmpty({message:'Name can not be null'})
    @IsString({message:'Name must be a string'})
    description: string;

    @IsNotEmpty({message:'price can not be null'})
    @IsNumber()
    price: number;
    
    @IsNotEmpty({message:'stockQuantity can not be null'})
    @IsNumber()
    stockQuantity: number;
}
