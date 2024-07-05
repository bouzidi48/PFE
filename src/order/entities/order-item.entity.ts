 import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "src/product/entities/product.entity";
//import { Product } from "src/product/entities/product.entity";

@Entity('orderItem')
export class OrderItems{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    quantity:number;
    @Column()
    price:number;
    @Column()
    created_at:Date;
    @Column()
    updated_at:Date;

    @ManyToOne(() => Order, (order) => order.orderItems)
    order: Order; 
    @ManyToOne(() => Product, (product) => product.orderItems,{cascade:true})
    product: Product; 
    

} 