import { PartialType } from '@nestjs/mapped-types';
import { CreateCouleurDto } from './create-couleur.dto';
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateImageDto } from 'src/images/dto/update-image.dto';
import { UpdateSizeDto } from 'src/size/dto/update-size.dto';

export class UpdateCouleurDto{
    @IsNotEmpty({message:'nameCouleur can not be empty'})
    @IsString({message:'nameCouleur should be string '})
    @IsOptional()
    nameCouleur:string;

    @IsOptional()
    @IsNotEmpty({message:'nameproduct can not be empty'})
    @IsString({message:'nameproduct should be string '})
    nameProduct:string;

    @IsNotEmpty({message:'ancienNameCouleur can not be empty'})
    @IsString({message:'ancienNameCouleur should be string '})
    ancienNameCouleur:string;

    @IsOptional()
    @Type(()=>UpdateImageDto)
    @ValidateNested({ each: true })
    listeimage:UpdateImageDto[];
    
    @IsOptional()
    @Type(()=>UpdateSizeDto)
    @ValidateNested({ each: true })
    listesize:UpdateSizeDto[];
}
