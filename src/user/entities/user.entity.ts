import { CategoryEntity } from "src/categories/entities/category.entity";
import { Couleur } from "src/couleur/entities/couleur.entity";
import { Roles } from "src/enum/user_enum";
import { Product } from "src/product/entities/product.entity";
import { ReviewEntity } from "src/review/entities/review.entity";
import { Size } from "src/size/entities/size.entity";
//import { ReviewEntity } from "src/review/entities/review.entity";
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
        default: Roles.USER
    })
    role: Roles;

    @OneToMany(()=>CategoryEntity,(cat)=>cat.addedBy)
    categories:CategoryEntity[];

    @OneToMany(()=>Couleur,(coul)=>coul.addedBy)
    couleurs:CategoryEntity[];

    @OneToMany(()=>Product,(product)=>product.addedBy)
    products:Product[];

    @OneToMany(()=>Size,(size)=>size.addedBy)
    sizes:Size[];

  @OneToMany(() => ReviewEntity, (rev) => rev.user)
  review: ReviewEntity[];  
}