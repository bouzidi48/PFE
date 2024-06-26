import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class FindByNameProductDto {
    @IsNotEmpty({message:'title can not be empty'})
    @IsString({message:'title should be string '})
    nameProduct:string;

    
}