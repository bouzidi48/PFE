import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RemoveImageDto } from 'src/images/dto/remove-image.dto';

export class DeleteCategoryDto {
    @IsOptional()
    @Type(()=>RemoveImageDto)
    @ValidateNested()
    image:RemoveImageDto;
}