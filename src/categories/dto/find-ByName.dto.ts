import { IsNotEmpty, IsString } from "class-validator";

export class FindByNameCategoryDto {
    @IsNotEmpty({message:'title can not be empty'})
    @IsString({message:'title should be string '})
    nameCategory:string;

    
}