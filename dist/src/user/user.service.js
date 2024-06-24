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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("./user.repository");
const userSession_service_1 = require("./session/service/userSession.service");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userRepository, session) {
        this.userRepository = userRepository;
        this.session = session;
    }
    async ancienPassword(password) {
        const id = this.session.session.get('idUser');
        const user = await this.userRepository.findOne({ where: { id: id } });
        const validPassword = await bcrypt.compare(password.password, user.password);
        if (!validPassword) {
            return await {
                message: 'ancien mot de passe incorrect',
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        return await {
            message: 'ancien mot de passe correct',
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async updatePassword(updateDto) {
        const confirmpassword = updateDto.confirmpassword;
        const password = updateDto.password;
        const id = this.session.session.get('idUser');
        if (confirmpassword == password) {
            const user = await this.userRepository.findOne({ where: { id: id } });
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(updateDto.password, saltRounds);
            console.log(typeof (user));
            user.password = hashedPassword;
            user.updatedate = new Date();
            this.userRepository.save(user);
            this.session.session.delete('idUser');
            console.log(this.session.session.get('idUser'));
            return await {
                message: 'le mot de passe modifier avec succés,vous devez vous connecter avec votre nouveau mot de passe',
                statusCode: common_1.HttpStatus.OK,
            };
        }
        return await {
            message: 'Password != ConfirmPassword',
            statusCode: common_1.HttpStatus.BAD_REQUEST,
        };
    }
    async updateUsername(updateUsername) {
        const user = await this.userRepository.findOne({ where: { username: updateUsername.username } });
        console.log(user);
        console.log(this.session.session);
        console.log(this.session.session.get('idUser'));
        if (!user) {
            const id = await this.session.session.get('idUser');
            if (!id) {
                return await {
                    message: 'user not found',
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                };
            }
            const currentUser = await this.userRepository.findOne({ where: { id: this.session.session.get('idUser') } });
            currentUser.username = updateUsername.username;
            currentUser.updatedate = new Date();
            console.log(currentUser);
            this.userRepository.save(currentUser);
            this.session.session.delete('idUser');
            return await {
                message: 'Username modifier avec succés,vous devez vous connecter avec votre nouveau username',
                statusCode: common_1.HttpStatus.OK,
            };
        }
        return await {
            message: 'user deja existe',
            statusCode: common_1.HttpStatus.BAD_REQUEST,
        };
    }
    async findOne(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user)
            throw new common_1.NotFoundException('user not found ');
        return user;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        userSession_service_1.UserSessionService])
], UserService);
//# sourceMappingURL=user.service.js.map