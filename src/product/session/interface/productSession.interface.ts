import { Session } from 'express-session';

interface ProductSession extends Session {
  session?: Map<string, any>;
}
export { ProductSession };