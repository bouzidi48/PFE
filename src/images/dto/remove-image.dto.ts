import { PartialType } from '@nestjs/mapped-types';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RemoveImageDto{
    @IsNotEmpty({message:'urlImage can not be empty'})
    @IsString({message:'urlImage should be string '})
    
    urlImage:string;

    
}
