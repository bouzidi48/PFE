import { PartialType } from '@nestjs/mapped-types';

import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateImageDto{
    @IsNotEmpty({message:'urlImage can not be empty'})
    @IsString({message:'urlImage should be string '})
    @IsOptional()
    urlImage:string;


    @IsOptional()
    @IsNotEmpty({message:'nameproduct can not be empty'})
    @IsString({message:'nameproduct should be string '})
    nameCouleur:string;
    @IsOptional()
    @IsNotEmpty({message:'nameproduct can not be empty'})
    @IsString({message:'nameproduct should be string '})
    nameProduct:string;
    @IsNotEmpty({message:'ancienNameCouleur can not be empty'})
    @IsString({message:'ancienNameCouleur should be string '})
    ancienUrl:string;
}

