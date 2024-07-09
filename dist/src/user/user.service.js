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
const modifier_password_dto_1 = require("./dto/modifier-password.dto");
const update_username_dto_1 = require("./dto/update-username.dto");
const bcrypt = require("bcrypt");
const ancien_password_dto_1 = require("./dto/ancien-password.dto");
const ancien_username_dto_1 = require("./dto/ancien-username.dto");
const user_enum_1 = require("../enum/user_enum");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async ancienPassword(request, password) {
        const id = request.idUser;
        console.log(id);
        const user = await this.userRepository.findOne({ where: { id: id } });
        console.log(user);
        const validPassword = await bcrypt.compare(password.password, user.password);
        console.log(validPassword);
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
    async updatePassword(request, updateDto) {
        const confirmpassword = updateDto.confirmpassword;
        const password = updateDto.password;
        const id = request.idUser;
        console.log(id);
        console.log(confirmpassword);
        console.log(password);
        console.log(confirmpassword == password);
        if (confirmpassword == password) {
            const user = await this.userRepository.findOne({ where: { id: id } });
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(updateDto.password, saltRounds);
            console.log(typeof (user));
            user.password = hashedPassword;
            user.updatedate = new Date();
            this.userRepository.save(user);
            return await {
                message: 'le mot de passe modifier avec succes ,vous devez vous connecter avec votre nouveau mot de passe',
                statusCode: common_1.HttpStatus.OK,
            };
        }
        return await {
            message: 'Password != ConfirmPassword',
            statusCode: common_1.HttpStatus.BAD_REQUEST,
        };
    }
    async ancienUsername(request, username) {
        const id = request.idUser;
        const user = await this.userRepository.findOne({ where: { id: id } });
        const validUsername = await (user.username === username.username);
        if (!validUsername) {
            return await {
                message: 'ancien username incorrect',
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        return await {
            message: 'ancien username correct',
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async updateUsername(request, updateUsername) {
        const user = await this.userRepository.findOne({ where: { username: updateUsername.username } });
        console.log(user);
        console.log(request.idUser);
        if (!user) {
            const id = request.idUser;
            if (!id) {
                return await {
                    message: 'user not found',
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                };
            }
            const currentUser = await this.userRepository.findOne({ where: { id: id } });
            currentUser.username = updateUsername.username;
            currentUser.updatedate = new Date();
            console.log(currentUser);
            this.userRepository.save(currentUser);
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
        if (!user) {
            return await {
                data: null,
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        return await {
            data: user,
            statusCode: common_1.HttpStatus.OK
        };
    }
    async create(createUserDto) {
        const user = this.userRepository.create({ ...createUserDto, createdate: new Date() });
        this.userRepository.save(user);
    }
    async findById(find) {
        const user = await this.userRepository.findOne({ where: { id: find.id } });
        if (!user) {
            return await {
                data: null,
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        return await {
            data: user,
            statusCode: common_1.HttpStatus.OK
        };
    }
    async findByEmail(find) {
        const user = await this.userRepository.findOne({ where: { email: find.email } });
        if (!user) {
            return await {
                data: null,
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        return await {
            data: user,
            statusCode: common_1.HttpStatus.OK
        };
    }
    async findByUserName(find) {
        const user = await this.userRepository.findOne({ where: { username: find.username } });
        if (!user) {
            return await {
                message: null,
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        return await {
            data: user,
            statusCode: common_1.HttpStatus.OK
        };
    }
    async update(user, updateUserDto) {
        const user1 = await this.userRepository.findOne({ where: { id: user.id } });
        user1.password = updateUserDto.password;
        user1.username = updateUserDto.username;
        user1.updatedate = new Date();
        this.userRepository.save(user1);
    }
    async createAdmin(createUserAdminDto) {
        const user = this.userRepository.create(createUserAdminDto);
        user.role = user_enum_1.Roles.ADMIN;
        this.userRepository.save(user);
    }
    async findByUsernameAndEmail(find) {
        const user = await this.userRepository.findOne({ where: { email: find.email, username: find.username } });
        if (!user) {
            return await {
                data: null,
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        return await {
            data: user,
            statusCode: common_1.HttpStatus.OK
        };
    }
};
exports.UserService = UserService;
__decorate([
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ancien_password_dto_1.AncienPasswordDto]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "ancienPassword", null);
__decorate([
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, modifier_password_dto_1.UpdatePasswordDto]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "updatePassword", null);
__decorate([
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ancien_username_dto_1.AncienUsernameDto]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "ancienUsername", null);
__decorate([
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_username_dto_1.UserNameUpdateDto]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "updateUsername", null);
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
//# sourceMappingURL=user.service.js.map