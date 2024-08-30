import { PartialType } from '@nestjs/mapped-types';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RemoveSizeDto{
    @IsNotEmpty({message:'typeSize can not be empty'})
    
    
    id:number;

    @IsOptional()
    
    @IsString({message:'nameproduct should be string '})
    nameCouleur:string;
    
}
