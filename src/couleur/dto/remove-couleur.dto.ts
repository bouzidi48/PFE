import { PartialType } from '@nestjs/mapped-types';
import { CreateCouleurDto } from './create-couleur.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RemoveCouleurDto{
    @IsNotEmpty({message:'nameCouleur can not be empty'})
    @IsString({message:'nameCouleur should be string '})
    
    nameCouleur:string;

    
}
