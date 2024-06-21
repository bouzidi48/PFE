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
const mailer_1 = require("@nestjs-modules/mailer");
const randomstring_1 = require("randomstring");
const customSession_service_1 = require("../session/service/customSession.service");
const user_repository_1 = require("./user.repository");
let UserService = class UserService {
    constructor(userRepository, mailerService, session) {
        this.userRepository = userRepository;
        this.mailerService = mailerService;
        this.session = session;
    }
    create(createUserDto) {
        return 'This action adds a new user';
    }
    async signup(userSignUpDto) {
        const existingEmail = await this.userRepository.findOne({ where: { email: userSignUpDto.email } });
        const existingUser = await this.userRepository.findOne({ where: { username: userSignUpDto.username } });
        if (existingEmail || existingUser) {
            return await {
                message: 'Email ou username déjà existe',
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        const codeConfirmation = await (0, randomstring_1.generate)({
            length: 6,
            charset: 'numeric',
        });
        console.log(typeof (codeConfirmation));
        console.log(userSignUpDto);
        console.log(typeof (userSignUpDto));
        this.session.session.set('code', codeConfirmation);
        this.session.session.set('user', userSignUpDto);
        console.log(this.session.session.get('code'), codeConfirmation);
        console.log(this.session.session.get('user'));
        return await this.sendEmail(codeConfirmation, userSignUpDto.email);
    }
    async sendEmail(code, email) {
        await this.mailerService.sendMail({
            to: email,
            from: process.env.EMAIL_HOST_USER,
            subject: 'code de confirmation',
            text: 'le code de confirmation est ' + code,
        });
        return await {
            message: 'le code est envoyer avec succes',
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async verfierCode(codeDto) {
        console.log(codeDto);
        console.log(this.session.session.get('code'));
        console.log(this.session.session.get('code'), codeDto.code);
        if (this.session.session.get('code') === codeDto.code) {
            return await true;
        }
        return await false;
    }
    async verifierPasswordOublier(codeDto) {
        if (this.verfierCode(codeDto)) {
            this.session.session.delete('code');
            return await {
                message: 'Vous pouvez changer le mot de passe',
                statusCode: common_1.HttpStatus.OK,
            };
        }
        return await {
            message: 'code incorrect',
            statusCode: common_1.HttpStatus.BAD_REQUEST,
        };
    }
    async verfierInscription(codeDto) {
        if (this.verfierCode(codeDto)) {
            const userSignUpDto = this.session.session.get('user');
            console.log(userSignUpDto);
            const user = this.userRepository.create({ ...userSignUpDto, createdate: new Date() });
            this.userRepository.save(user);
            this.session.session.delete('code');
            this.session.session.delete('user');
            return await {
                message: 'Bienvenue dans notre application',
                statusCode: common_1.HttpStatus.OK,
            };
        }
        return await {
            message: 'code incorrect',
            statusCode: common_1.HttpStatus.BAD_REQUEST,
        };
    }
    async login(userLoginDto) {
        const user = await this.userRepository.findOne({ where: { username: userLoginDto.username, password: userLoginDto.password } });
        if (!user) {
            return await {
                message: 'username ou password incorrect',
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        this.session.session.set('idUser', user.id);
        return await {
            message: 'Bienvenue dans notre application',
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async logout() {
        this.session.session.delete('idUser');
        return await {
            message: 'Vous avez bien été deconnecté',
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async forgotPassword(userPasswordOublierDto) {
        const user = await this.userRepository.findOne({ where: { email: userPasswordOublierDto.email } });
        if (!user) {
            return await {
                message: 'Email introuvable',
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        const codeConfirmation = await (0, randomstring_1.generate)({
            length: 6,
            charset: 'numeric',
        });
        this.session.session.set('code', codeConfirmation);
        this.session.session.set('user', user);
        await this.sendEmail(codeConfirmation, user.email);
        return await {
            message: 'le code est envoyer avec succes',
            statusCode: common_1.HttpStatus.OK,
        };
    }
    findAll() {
        return `This action returns all user`;
    }
    findOne(id) {
        return `This action returns a #${id} user`;
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        mailer_1.MailerService,
        customSession_service_1.CustomSessionService])
], UserService);
//# sourceMappingURL=user.service.js.map