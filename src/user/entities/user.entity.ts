import { Roles } from "src/enum/user_enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({
        type: 'enum',
        enum: Roles,
        default: Roles.USER
    })
    role: Roles;

    
}