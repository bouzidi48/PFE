import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class AjouetrPanierDto {
    @IsNotEmpty({message:'title can not be empty'})
    @IsNumber()
    productId:number;

    @IsNotEmpty({message:'title can not be empty'})
    @IsNumber()
    couleurId: number;
    @IsNotEmpty({message:'title can not be empty'})
    @IsNumber()
    sizeId: number;
}
