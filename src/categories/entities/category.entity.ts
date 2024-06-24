import { User } from "src/user/entities/user.entity";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
@Entity({name:'categories'})
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    nameCategory:string;
    @Column()
    description:string;

    @ManyToOne(() => CategoryEntity, category => category.subcategories, { nullable: true })
    parentCategory: CategoryEntity;

    @OneToMany(() => CategoryEntity, category => category.parentCategory)
    subcategories: CategoryEntity[];


    @Column()
    createdAt:Date;
    @Column()
    updatedAt:Date;

    @ManyToOne(()=>User,(user)=>user.categories)
    addedBy:User;
  
}
