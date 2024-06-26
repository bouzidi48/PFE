import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty({message:'title can not be empty'})
    @IsString({message:'title should be string '})
    nameCategory:string;

    @IsNotEmpty({message:'description can not be empty'})
    @IsString({message:'description should be string '})
    description:string;

    @IsNotEmpty({message:'description can not be empty'})
    @IsString({message:'description should be string '})
    @IsOptional()
    NameparentCategory: string;

}
