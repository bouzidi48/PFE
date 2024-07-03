
import { CategoryEntity } from "src/categories/entities/category.entity";
import { Couleur } from "src/couleur/entities/couleur.entity";
import { Roles } from "src/enum/user_enum";
import { ProductLikeEntity } from "src/product-like/entities/product-like.entity";
import { ReviewEntity } from "src/review/entities/review.entity";

import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(()=>ReviewEntity,(rev)=>rev.product)
    review:ReviewEntity[];

    
 
    @ManyToMany(() => User, user => user.likedProducts)
    likedBy: User[]; 
  
}