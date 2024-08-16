import { PartialType } from '@nestjs/mapped-types';

import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSizeDto{
    @IsNotEmpty({message:'nameCouleur can not be empty'})
    @IsString({message:'nameCouleur should be string '})
    @IsOptional()
    typeSize:string;

    @IsNotEmpty({message:'stock can not be empty'})
    @IsNumber({},{message:'stock should be number '})
    stockQuantity: number;


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
    ancientypeSize:string;
}
