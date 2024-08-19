import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateCouleurDto } from "src/couleur/dto/create-couleur.dto";
import { UpdateCouleurDto } from "src/couleur/dto/update-couleur.dto";

export class UpdateProductDto {
    @IsOptional()
    @IsNotEmpty({message:'price can not be empty'})
    @IsString({message:'title should be string '})
    nameProduct:string;

    @IsOptional()
    @IsNotEmpty({message:'price can not be empty'})
    @IsString({message:'description should be string '})
    description:string;
    
    @IsOptional()
    @IsNotEmpty({message:'price can not be empty'})
    price:number;

    @IsOptional()
    @IsNotEmpty({message:'stock can not be empty'})
    stockQuantity:number;

    @IsOptional()
    @IsNotEmpty({message:'nomCategory can not be empty'})
    nomCategory:string;

    @IsNotEmpty({message:'nomProduct can not be empty'})
    @IsString({message:'nomProduct should be string '})
    ancienProduct:string;
    
    @IsOptional()
    @Type(()=>UpdateCouleurDto)
    @ValidateNested({ each: true })
    listeCouleur:UpdateCouleurDto[];

    @IsOptional()
    @Type(()=>CreateCouleurDto)
    @ValidateNested({ each: true })
    listeAjouterCouleur:CreateCouleurDto[];
}
