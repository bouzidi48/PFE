import { Cookie } from "express-session";
import { CustomSession } from "src/session/interface/customSession.interface";
export declare class CustomSessionService implements CustomSession {
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
