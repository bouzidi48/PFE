import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class RemoveProductDto {

    @IsNotEmpty({message:'nameProduct can not be empty'})
    @IsString({message:'nameProduct should be string '})
    nameProduct:string;

}