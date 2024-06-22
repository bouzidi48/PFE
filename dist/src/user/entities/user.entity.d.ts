import { Roles } from "src/enum/user_enum";
export declare class User {
    id: number;
    username: string;
    password: string;
    email: string;
    createdate: Date;
    updatedate: Date;
    role: Roles;
}