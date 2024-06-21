import { Session } from 'express-session';
interface CustomSession extends Session {
    session?: Map<string, any>;
}
export { CustomSession };
