import { IsNotEmpty } from "class-validator";

export class FindOrderById{
    @IsNotEmpty({message:'Order can not be empty'})
    id:number;
}