import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength, minLength } from "class-validator";

export class FindById{
    @IsNumber()
    @IsNotEmpty({message:'id can not be null'})
    id:number;
}