import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { UpdateImageDto } from 'src/images/dto/update-image.dto';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateImageDto } from 'src/images/dto/create-image.dto';
import { Type } from 'class-transformer';
import { UpdateImageCategoryDto } from 'src/images/dto/update-image-category.dto';

export class UpdateCategoryDto  {
    @IsNotEmpty({message:'title can not be empty'})
    @IsString({message:'title should be string '})
    nameCategory:string;

    @IsNotEmpty({message:'description can not be empty'})
    @IsString({message:'description should be string '})
    description:string;
    @Type(()=>UpdateImageCategoryDto)
    @ValidateNested()
    image:UpdateImageCategoryDto;
}
