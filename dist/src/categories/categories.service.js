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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const create_category_dto_1 = require("./dto/create-category.dto");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("./entities/category.entity");
const category_repository_1 = require("./category.repository");
const user_enum_1 = require("../enum/user_enum");
const user_service_1 = require("../user/user.service");
let CategoriesService = class CategoriesService {
    constructor(categoryRepository, userService) {
        this.categoryRepository = categoryRepository;
        this.userService = userService;
    }
    async create(request, createCategoryDto) {
        const idAdmin = request.idUser;
        console.log(idAdmin);
        if (!idAdmin) {
            return await {
                message: 'vous devez vous connecter pour ajouter une categorie',
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        const admin = await this.userService.findById(idAdmin);
        if (!admin || admin.role != user_enum_1.Roles.ADMIN) {
            return await {
                message: 'vous devez etre un admin',
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        const category1 = await this.categoryRepository.findOne({ where: { nameCategory: createCategoryDto.nameCategory } });
        if (category1) {
            return await {
                message: 'ce category existe deja',
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        const category = await this.categoryRepository.create(createCategoryDto);
        if (!createCategoryDto.NameparentCategory) {
            category.addedBy = admin;
            category.createdAt = new Date();
            this.categoryRepository.save(category);
        }
        else {
            const parent = await this.categoryRepository.findOne({ where: { nameCategory: createCategoryDto.NameparentCategory } });
            if (!parent) {
                return await {
                    message: 'la categorie parente n\'existe pas',
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                };
            }
            category.addedBy = admin;
            category.createdAt = new Date();
            category.parentCategory = parent;
            this.categoryRepository.save(category);
        }
        return await {
            message: category,
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async findSubcategories(parentCategoryName) {
        const category = this.categoryRepository.findOne({ where: { nameCategory: parentCategoryName.nameCategory } });
        if (!category) {
            return {
                message: 'la categorie parente n\'existe pas',
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        const subcategories = await this.categoryRepository.find({ where: { parentCategory: { id: (await category).id } } });
        return {
            message: subcategories,
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async findAll() {
        const categories = await this.categoryRepository.find();
        if (!categories) {
            return await {
                message: 'aucun produit n\'existe',
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        return await {
            message: categories,
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async findByName(nameCategory) {
        return await this.categoryRepository.find({ where: { nameCategory: nameCategory.nameCategory }, select: {} });
    }
    async findOne(id) {
        return await this.categoryRepository.findOne({
            where: { id: id },
            relations: { addedBy: true },
            select: {
                addedBy: {
                    id: true,
                    username: true,
                    email: true,
                }
            }
        });
    }
    async update(request, id, fields) {
        const category = await this.findOne(id);
        if (!category)
            throw new common_1.NotFoundException('Category not found.');
        const idAdmin = request.idUser;
        if (!idAdmin) {
            return await {
                message: 'vous devez vous connecter pour Modifier une categorie',
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
        Object.assign(category, fields);
        category.updatedAt = new Date();
        return await this.categoryRepository.save(category);
    }
    async remove(request, id, fields) {
        const category = await this.findOne(id);
        if (!category)
            throw new common_1.NotFoundException('Category not found.');
        const idAdmin = request.idUser;
        if (!idAdmin) {
            return await {
                message: 'vous devez vous connecter pour Modifier une categorie',
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
        Object.assign(category, fields);
        return await this.categoryRepository.delete(id);
    }
};
exports.CategoriesService = CategoriesService;
__decorate([
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoriesService.prototype, "create", null);
__decorate([
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], CategoriesService.prototype, "update", null);
__decorate([
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], CategoriesService.prototype, "remove", null);
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.CategoryEntity)),
    __metadata("design:paramtypes", [category_repository_1.CategoryRepository,
        user_service_1.UserService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map