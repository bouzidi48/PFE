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
exports.User = void 0;
const category_entity_1 = require("../../categories/entities/category.entity");
const couleur_entity_1 = require("../../couleur/entities/couleur.entity");
const user_enum_1 = require("../../enum/user_enum");
const product_entity_1 = require("../../product/entities/product.entity");
const review_entity_1 = require("../../review/entities/review.entity");
const typeorm_1 = require("typeorm");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], User.prototype, "createdate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], User.prototype, "updatedate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: user_enum_1.Roles,
        default: user_enum_1.Roles.ADMIN
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => category_entity_1.CategoryEntity, (cat) => cat.addedBy),
    __metadata("design:type", Array)
], User.prototype, "categories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => couleur_entity_1.Couleur, (coul) => coul.addedBy),
    __metadata("design:type", Array)
], User.prototype, "couleurs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.Product, (product) => product.addedBy),
    __metadata("design:type", Array)
], User.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.ReviewEntity, (rev) => rev.user),
    __metadata("design:type", Array)
], User.prototype, "review", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map