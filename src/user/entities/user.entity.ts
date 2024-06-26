import { CategoryEntity } from "src/categories/entities/category.entity";
import { Roles } from "src/enum/user_enum";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')

export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    createdate: Date;

    @Column()
    updatedate: Date;

    @Column({
        type: 'enum',
        enum: Roles,
        default: Roles.ADMIN
    })
    role: Roles;

    @OneToMany(()=>CategoryEntity,(cat)=>cat.addedBy)
    categories:CategoryEntity[];

    @OneToMany(()=>Product,(product)=>product.addedBy)
    products:Product[];
}