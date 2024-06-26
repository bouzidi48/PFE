import { CategoryEntity } from "src/categories/entities/category.entity";
import { Roles } from "src/enum/user_enum";
import { Product } from "src/product/entities/product.entity";
export declare class User {
    id: number;
    username: string;
    password: string;
    email: string;
    createdate: Date;
    updatedate: Date;
    role: Roles;
    categories: CategoryEntity[];
    products: Product[];
}
