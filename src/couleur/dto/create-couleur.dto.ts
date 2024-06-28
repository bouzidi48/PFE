import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCouleurDto {
    @IsNotEmpty({message:'title can not be empty'})
    @IsString({message:'title should be string '})
    nameCouleur:string;

    @IsNotEmpty({message:'nameproduct can not be empty'})
    @IsString({message:'nameproduct should be string '})
    nameProduct:string;


}

