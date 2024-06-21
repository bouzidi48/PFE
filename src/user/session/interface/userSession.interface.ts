import { Session } from 'express-session';

interface UserSession extends Session {
  session?: Map<string, any>;
}
export { UserSession };