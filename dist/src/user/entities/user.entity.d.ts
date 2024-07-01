import { CategoryEntity } from "src/categories/entities/category.entity";
import { Roles } from "src/enum/user_enum";
import { Product } from "src/product/entities/product.entity";
import { ReviewEntity } from "src/review/entities/review.entity";
import { Size } from "src/size/entities/size.entity";
export declare class User {
    id: number;
    username: string;
    password: string;
    email: string;
    createdate: Date;
    updatedate: Date;
    role: Roles;
    categories: CategoryEntity[];
    couleurs: CategoryEntity[];
    products: Product[];
    sizes: Size[];
    review: ReviewEntity[];
}
