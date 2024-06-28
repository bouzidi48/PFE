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
exports.ReviewEntity = void 0;
const product_entity_1 = require("../../product/entities/product.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
let ReviewEntity = class ReviewEntity {
};
exports.ReviewEntity = ReviewEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ReviewEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ReviewEntity.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReviewEntity.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], ReviewEntity.prototype, "createdate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], ReviewEntity.prototype, "updatedate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.User, (user) => user.review),
    __metadata("design:type", user_entity_1.User)
], ReviewEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => product_entity_1.Product, (prod) => prod.review),
    __metadata("design:type", product_entity_1.Product)
], ReviewEntity.prototype, "product", void 0);
exports.ReviewEntity = ReviewEntity = __decorate([
    (0, typeorm_1.Entity)('review')
], ReviewEntity);
//# sourceMappingURL=review.entity.js.map