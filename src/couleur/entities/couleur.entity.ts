import { CategoryEntity } from "src/categories/entities/category.entity";
import { Roles } from "src/enum/user_enum";
import { Product } from "src/product/entities/product.entity";
import { Size } from "src/size/entities/size.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('couleurs')

export class Couleur {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameCouleur: string;

    @ManyToOne(()=>Product,(pro)=>pro.colours)
    product:Product;

    @Column()
    createdate: Date;

    @Column()
    updatedate: Date;

    @OneToMany(()=>Size,(siz)=>siz.couleur)
    sizes:Size[];

    

}
