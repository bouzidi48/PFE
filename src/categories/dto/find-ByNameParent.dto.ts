import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class FindByNameParentDto {

    @IsNotEmpty({message:'description can not be empty'})
    @IsString({message:'description should be string '})
    NameparentCategory: string;

}
