import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class FindByIdNameDto {
    

    @IsNotEmpty({message:'urlImage can not be empty'})
    @IsString({message:'urlImage should be string '})
    urlImage:string;

    @IsNotEmpty({message:'id can not be empty'})
    @IsNumber()
    id:number;


}