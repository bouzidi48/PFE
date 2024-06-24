import { User } from "src/user/entities/user.entity";
export declare class CategoryEntity {
    id: number;
    nameCategory: string;
    description: string;
    parentCategory: CategoryEntity;
    subcategories: CategoryEntity[];
    createdAt: Date;
    updatedAt: Date;
    addedBy: User;
}
