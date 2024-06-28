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
const modifier_password_dto_1 = require("./dto/modifier-password.dto");
const update_username_dto_1 = require("./dto/update-username.dto");
const ancien_password_dto_1 = require("./dto/ancien-password.dto");
const ancien_username_dto_1 = require("./dto/ancien-username.dto");
const create_user_dto_1 = require("./dto/create-user.dto");
const find_id_dto_1 = require("./dto/find-id.dto");
const find_email_dto_1 = require("./dto/find-email.dto");
const find_username_dto_1 = require("./dto/find-username.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async ancienPassword(request, password) {
        return await this.userService.ancienPassword(request, password);
    }
    async updatePassword(request, updatePasswordDto) {
        return await this.userService.updatePassword(request, updatePasswordDto);
    }
    async ancienUsername(request, username) {
        return await this.userService.ancienUsername(request, username);
    }
    async updateUsername(request, updateUsername) {
        return await this.userService.updateUsername(request, updateUsername);
    }
    async create(createUserDto) {
        return await this.userService.create(createUserDto);
    }
    async findOne(id) {
        return await this.userService.findOne(+id);
    }
    async findById(id) {
        return await this.userService.findById(id);
    }
    async findByEmail(email) {
        return await this.userService.findByEmail(email);
    }
    async findByUserName(username) {
        return await this.userService.findByUserName(username);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('ancienPassword'),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ancien_password_dto_1.AncienPasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "ancienPassword", null);
__decorate([
    (0, common_1.Put)('updatePassword'),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, modifier_password_dto_1.UpdatePasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Post)('ancienPassword'),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ancien_username_dto_1.AncienUsernameDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "ancienUsername", null);
__decorate([
    (0, common_1.Put)('updateUsername'),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_username_dto_1.UserNameUpdateDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUsername", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.UserCreateDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('single/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)("byId"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_id_dto_1.FindById]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)('byEmail'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_email_dto_1.FindByEmail]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findByEmail", null);
__decorate([
    (0, common_1.Get)('byUserName'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_username_dto_1.FindByUsername]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findByUserName", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map