"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardModule = void 0;
const common_1 = require("@nestjs/common");
const card_service_1 = require("./card.service");
const card_controller_1 = require("./card.controller");
const typeorm_1 = require("@nestjs/typeorm");
const card_entity_1 = require("./entities/card.entity");
const card_repository_1 = require("./card.repository");
const user_module_1 = require("../user/user.module");
const product_module_1 = require("../product/product.module");
let CardModule = class CardModule {
};
exports.CardModule = CardModule;
exports.CardModule = CardModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([card_entity_1.Card, card_repository_1.CardRepository]), user_module_1.UserModule, product_module_1.ProductModule],
        controllers: [card_controller_1.CardController],
        providers: [card_service_1.CardService],
    })
], CardModule);
//# sourceMappingURL=card.module.js.map