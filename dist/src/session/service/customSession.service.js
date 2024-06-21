"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomSessionService = void 0;
const common_1 = require("@nestjs/common");
let CustomSessionService = class CustomSessionService {
    constructor() {
        this.session = new Map();
        this.id = 'someUniqueId';
        this.cookie = {
            path: '/',
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
            originalMaxAge: 24 * 60 * 60 * 1000
        };
    }
    regenerate(callback) {
        try {
            this.session = new Map();
            this.id = 'newUniqueId';
            callback(null);
        }
        catch (err) {
            callback(err);
        }
        return this;
    }
    destroy(callback) {
        try {
            this.session.clear();
            this.session = undefined;
            callback(null);
        }
        catch (err) {
            callback(err);
        }
        return this;
    }
    reload(callback) {
        try {
            this.session = new Map([
                ['key1', 'value1'],
                ['key2', 'value2']
            ]);
            callback(null);
        }
        catch (err) {
            callback(err);
        }
        return this;
    }
    resetMaxAge() {
        try {
            this.cookie.maxAge = 24 * 60 * 60 * 1000;
            this.cookie.originalMaxAge = 24 * 60 * 60 * 1000;
        }
        catch (err) {
            throw new Error(err);
        }
        return this;
    }
    save(callback) {
        try {
            if (callback) {
                callback(null);
            }
        }
        catch (err) {
            if (callback) {
                callback(err);
            }
        }
        return this;
    }
    touch() {
        try {
            this.cookie.maxAge = 24 * 60 * 60 * 1000;
        }
        catch (err) {
            throw new Error(err);
        }
        return this;
    }
};
exports.CustomSessionService = CustomSessionService;
exports.CustomSessionService = CustomSessionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CustomSessionService);
//# sourceMappingURL=customSession.service.js.map