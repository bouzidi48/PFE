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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const categories_service_1 = require("./categories.service");
const create_category_dto_1 = require("./dto/create-category.dto");
const update_category_dto_1 = require("./dto/update-category.dto");
const delete_category_dto_1 = require("./dto/delete-category.dto");
const find_ByName_dto_1 = require("./dto/find-ByName.dto");
const find_ById_Name_dto_1 = require("./dto/find-ById-Name.dto");
const find_ByParentName_dto_1 = require("./dto/find-ByParentName.dto");
let CategoriesController = class CategoriesController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    async create(request, createCategoryDto) {
        return await this.categoriesService.create(request, createCategoryDto);
    }
    async findByIdAndName(createCategoryDto) {
        return await this.categoriesService.findByIdAndName(createCategoryDto);
    }
    async findSubcategories(parentCategory) {
        return await this.categoriesService.findSubcategories(parentCategory);
    }
    async findAll() {
        return await this.categoriesService.findAll();
    }
    async findByName(nameCategory) {
        return await this.categoriesService.findByName(nameCategory);
    }
    findOne(id) {
        return this.categoriesService.findOne(+id);
    }
    async update(request, id, updateCategoryDto) {
        return await this.categoriesService.update(request, +id, updateCategoryDto);
    }
    async remove(request, id, deleteCategoryDto) {
        return await this.categoriesService.remove(request, +id, deleteCategoryDto);
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, common_1.Post)('creat'),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('findByIdAndName'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_ById_Name_dto_1.FindByIdAndNameDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "findByIdAndName", null);
__decorate([
    (0, common_1.Get)('Subcategories'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_ByParentName_dto_1.FindByNameParentDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "findSubcategories", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('nameCategory'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_ByName_dto_1.FindByNameCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "findByName", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, delete_category_dto_1.DeleteCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "remove", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map