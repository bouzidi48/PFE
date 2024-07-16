import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RemoveImageDto } from 'src/images/dto/remove-image.dto';

export class DeleteCategoryDto {
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

    @Type(()=>RemoveImageDto)
    @ValidateNested()
    image:RemoveImageDto;
}