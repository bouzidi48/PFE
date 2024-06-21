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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_signup_dto_1 = require("./dto/user-signup.dto");
const verify_user_dto_1 = require("./dto/verify-user.dto");
const password_oublier_dto_1 = require("./dto/password-oublier.dto");
const user_login_dto_1 = require("./dto/user-login.dto");
const modifier_password_dto_1 = require("./dto/modifier-password.dto");
const update_username_dto_1 = require("./dto/update-username.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async signup(signupUserDto) {
        return await this.userService.signup(signupUserDto);
    }
    async verfierInscription(code) {
        return await this.userService.verfierInscription(code);
    }
    async login(userLoginDto) {
        return await this.userService.login(userLoginDto);
    }
    async logout() {
        return await this.userService.logout();
    }
    async forgotPassword(userPasswordOublierDto) {
        return await this.userService.forgotPassword(userPasswordOublierDto);
    }
    async verfierPasswordOublier(code) {
        return await this.userService.verifierPasswordOublier(code);
    }
    async updatePassword(updatePasswordDto) {
        return await this.userService.updatePassword(updatePasswordDto);
    }
    async modifierPassword(passDto) {
        return await this.userService.modifierPassword(passDto);
    }
    async updateUsername(updateUsername) {
        return await this.userService.updateUsername(updateUsername);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_signup_dto_1.UserSignUpDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('verifierInscription'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_user_dto_1.UserVerifyDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verfierInscription", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_login_dto_1.UserLoginDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('forgotPassword'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [password_oublier_dto_1.UserPasswordOublierDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('verifierPasswordOublier'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_user_dto_1.UserVerifyDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verfierPasswordOublier", null);
__decorate([
    (0, common_1.Put)('updatePassword'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [modifier_password_dto_1.UpdatePasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Put)('modifierPassword'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [modifier_password_dto_1.UpdatePasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "modifierPassword", null);
__decorate([
    (0, common_1.Put)('updateUsername'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_username_dto_1.UserNameUpdateDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUsername", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map