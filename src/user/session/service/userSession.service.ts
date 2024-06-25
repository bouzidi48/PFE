import { Injectable } from "@nestjs/common";
import { Cookie } from "express-session";

import { UserSession } from "../interface/userSession.interface";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserSessionService implements UserSession {
  session?: Map<string, any> = new Map<string, any>();
  id: string;
  cookie: Cookie;
  constructor() {
    
    this.id = uuidv4();
    this.cookie = {
      path: '/',
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      httpOnly: true,
      secure: false,
      originalMaxAge:24 * 60 * 60 * 1000
    };
  }

  regenerate(callback: (err: any) => void): this {
    try {
      this.session = new Map<string, any>();
      this.id = uuidv4(); // Generate a new unique id
      callback(null);
    } catch (err) {
      callback(err);
    }
    return this;
  }

  destroy(callback: (err: any) => void): this {
    try {
      this.session.clear();
      this.session = undefined;
      callback(null);
    } catch (err) {
      callback(err);
    }
    return this;
  }

  reload(callback: (err: any) => void): this {
    try {
      // Simulate reloading the session from a store
      this.session = new Map<string, any>([
        ['key1', 'value1'],
        ['key2', 'value2']
      ]);
      callback(null);
    } catch (err) {
      callback(err);
    }
    return this;
  }

  resetMaxAge(): this {
    try {
      this.cookie.maxAge = 24 * 60 * 60 * 1000; // Reset to 1 day
      this.cookie.originalMaxAge = 24 * 60 * 60 * 1000;
    } catch (err) {
      throw new Error(err);
    }
    return this;
  }

  save(callback?: (err: any) => void): this {
    try {
      // Simulate saving the session to a store
      if (callback) {
        callback(null);
      }
    } catch (err) {
      if (callback) {
        callback(err);
      }
    }
    return this;
  }

  touch(): this {
    try {
      // Update the session timestamp or expiration
      this.cookie.maxAge = 24 * 60 * 60 * 1000; // Update to extend by 1 day
      
    } catch (err) {
      throw new Error(err);
    }
    return this;
  }
  // Implémentez ici les propriétés et méthodes de l'interface CustomSession
}