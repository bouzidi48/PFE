import { Cookie } from "express-session";
import { UserSession } from "../interface/userSession.interface";
export declare class UserSessionService implements UserSession {
    session?: Map<string, any>;
    id: string;
    cookie: Cookie;
    constructor();
    regenerate(callback: (err: any) => void): this;
    destroy(callback: (err: any) => void): this;
    reload(callback: (err: any) => void): this;
    resetMaxAge(): this;
    save(callback?: (err: any) => void): this;
    touch(): this;
}
