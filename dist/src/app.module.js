"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const data_source_1 = require("../db/data_source");
const user_module_1 = require("./user/user.module");
const mailer_1 = require("@nestjs-modules/mailer");
const categories_module_1 = require("./categories/categories.module");
const card_module_1 = require("./card/card.module");
const inscription_module_1 = require("./inscription/inscription.module");
const authentification_module_1 = require("./authentification/authentification.module");
const product_module_1 = require("./product/product.module");
const review_module_1 = require("./review/review.module");
const couleur_module_1 = require("./couleur/couleur.module");
const images_module_1 = require("./images/images.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(data_source_1.dataSourceOptions),
            user_module_1.UserModule,
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: process.env.EMAIL_HOST,
                    port: Number(process.env.EMAIL_PORT),
                    secure: false,
                    auth: {
                        user: process.env.EMAIL_HOST_USER,
                        pass: process.env.EMAIL_HOST_PASSWORD
                    },
                },
            }),
            categories_module_1.CategoriesModule,
            card_module_1.CardModule,
            couleur_module_1.CouleurModule,
            review_module_1.ReviewModule,
            inscription_module_1.InscriptionModule,
            authentification_module_1.AuthentificationModule,
            product_module_1.ProductModule,
            images_module_1.ImagesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map