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
    async updateUsername(request, updateUsername) {
        return await this.userService.updateUsername(request, updateUsername);
    }
    async findOne(id) {
        return await this.userService.findOne(+id);
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
    (0, common_1.Put)('updateUsername'),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_username_dto_1.UserNameUpdateDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUsername", null);
__decorate([
    (0, common_1.Get)('single/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map