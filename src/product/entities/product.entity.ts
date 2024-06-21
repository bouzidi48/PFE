import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    @Column()
    stockQuantity: number;

    @Column()
    createdate: Date;

    @Column()
    updatedate: Date;

    
}
