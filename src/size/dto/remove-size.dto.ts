import { PartialType } from '@nestjs/mapped-types';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RemoveSizeDto{
    @IsNotEmpty({message:'typeSize can not be empty'})
    @IsString({message:'typeSize should be string '})
    
    typeSize:string;

    @IsOptional()
    @IsNotEmpty({message:'nameproduct can not be empty'})
    @IsString({message:'nameproduct should be string '})
    nameCouleur:string;
    
}
