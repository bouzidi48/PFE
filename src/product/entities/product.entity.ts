import { CategoryEntity } from "src/categories/entities/category.entity";
import { Couleur } from "src/couleur/entities/couleur.entity";
import { Roles } from "src/enum/user_enum";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')

export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameProduct: string;

    @Column()
    description: string;

    @Column()
    price: number;


    @OneToMany(()=>Couleur,(col)=>col.product)
    colours:Couleur[];

    @Column()
    createdate: Date;

    @Column()
    updatedate: Date;

    @ManyToOne(()=>User,(user)=>user.products)
    addedBy:User;

    @ManyToOne(()=>CategoryEntity,(cat)=>cat.products)
    category:CategoryEntity;
}