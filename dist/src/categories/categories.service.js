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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("./entities/category.entity");
const user_entity_1 = require("../user/entities/user.entity");
const user_repository_1 = require("../user/user.repository");
const category_repository_1 = require("./category.repository");
const user_enum_1 = require("../enum/user_enum");
let CategoriesService = class CategoriesService {
    constructor(categoryRepository, userRepository, session) {
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.session = session;
    }
    async create(createCategoryDto) {
        const idAdmin = await this.session.session.get('idUser');
        console.log(idAdmin);
        if (!idAdmin) {
            return await {
                message: 'vous devez vous connecter pour ajouter une categorie',
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        const admin = await this.userRepository.findOne({ where: { id: idAdmin } });
        if (!admin || admin.role != user_enum_1.Roles.ADMIN) {
            return await {
                message: 'vous devez etre un admin',
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        const category = await this.categoryRepository.create(createCategoryDto);
        category.addedBy = admin;
        this.categoryRepository.save(category);
        return await {
            message: 'ajout avec succés',
            statusCode: common_1.HttpStatus.OK,
        };
    }
    findAll() {
        return `This action returns all categories`;
    }
    findOne(id) {
        return `This action returns a #${id} category`;
    }
    update(id, updateCategoryDto) {
        return `This action updates a #${id} category`;
    }
    remove(id) {
        return `This action removes a #${id} category`;
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.CategoryEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [category_repository_1.CategoryRepository,
        user_repository_1.UserRepository, typeof (_a = typeof UserSessionService !== "undefined" && UserSessionService) === "function" ? _a : Object])
], CategoriesService);
function CurrentUser() {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=categories.service.js.map