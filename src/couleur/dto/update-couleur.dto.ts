import { PartialType } from '@nestjs/mapped-types';
import { CreateCouleurDto } from './create-couleur.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
}
