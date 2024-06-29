import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
export declare class ReviewEntity {
    id: number;
    ratings: number;
    comment: string;
    createdate: Date;
    updatedate: Date;
    user: User;
    product: Product;
}
