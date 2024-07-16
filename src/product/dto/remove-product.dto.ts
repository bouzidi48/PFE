import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { RemoveCouleurDto } from "src/couleur/dto/remove-couleur.dto";

export class RemoveProductDto {

    @IsNotEmpty({message:'nameProduct can not be empty'})
    @IsString({message:'nameProduct should be string '})
    nameProduct:string;

    @Type(()=>RemoveCouleurDto)
    @ValidateNested({ each: true })
    listeCouleur:RemoveCouleurDto[];

}