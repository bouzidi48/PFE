import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class RemovePanierDto {
    @IsNotEmpty({message:'title can not be empty'})
    @IsNumber()
    productId:number;

    @IsNotEmpty({message:'title can not be empty'})
    @IsNumber()
    couleurId: number;
}
