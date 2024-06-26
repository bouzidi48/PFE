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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const create_review_dto_1 = require("./dto/create-review.dto");
const user_service_1 = require("../user/user.service");
const typeorm_1 = require("@nestjs/typeorm");
const review_entity_1 = require("./entities/review.entity");
const product_service_1 = require("../product/product.service");
const user_enum_1 = require("../enum/user_enum");
const review_repository_1 = require("./review.repository");
let ReviewService = class ReviewService {
    constructor(userService, productService, reviewRepository) {
        this.userService = userService;
        this.productService = productService;
        this.reviewRepository = reviewRepository;
    }
    async create(request, createReviewDto) {
        const idAdmin = request.idUser;
        if (!idAdmin) {
            return await {
                message: 'vous devez vous connecter pour ajouter un review',
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        const admin = await this.userService.findById(idAdmin);
        if (!admin || (admin.data.role != user_enum_1.Roles.ADMIN && admin.data.role != user_enum_1.Roles.USER)) {
            return await {
                message: 'vous devez etre appartient a cette application',
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        const product = await this.productService.findByNameProduct({ nameProduct: createReviewDto.nameProduct });
        if (!product) {
            return await {
                message: 'ce produit n\'existe pas',
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        let review = await this.findOneByUserAndProduct(idAdmin);
        if (!review) {
            return await {
                message: 'user no found',
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        review = this.reviewRepository.create(createReviewDto);
        review.user = admin.data;
        review.product = product.data;
        review.createdate = new Date();
        this.reviewRepository.save(review);
        return await {
            message: 'review  ajoute avec succes',
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async findAll() {
        const review = await this.reviewRepository.find();
        if (!review)
            return await {
                data: null,
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        return await {
            data: review,
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async findAllByProduct(nameProdct) {
        const product = await this.productService.findByNameProduct(nameProdct);
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return await this.reviewRepository.find({
            where: { product: { id: product.data.id } },
            relations: ['user', 'product', 'product.category'],
        });
    }
    async getAverageRating(nameProductDto) {
        const product = await this.productService.findByNameProduct(nameProductDto);
        if (product.statusCode != 200) {
            return await {
                data: 0,
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        const productId = product.data.id;
        const result = await this.reviewRepository.query('SELECT AVG(ratings) as averageRating FROM review WHERE productId = ?', [productId]);
        if (result.length === 0 || result[0].averageRating === null) {
            return 0;
        }
        return parseFloat(result[0].averageRating);
    }
    async findOne(id) {
        const review = await this.reviewRepository.findOne({
            where: { id },
            relations: {
                user: true,
                product: {
                    category: true
                }
            }
        });
        if (!review)
            throw new common_1.NotFoundException('Review not Found. ');
        return review;
    }
    async updateReview(request, updateReviewDto) {
        const idAdmin = request.idUser;
        if (!idAdmin) {
            return {
                message: 'vous devez vous connecter pour mettre à jour un review',
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        const admin = await this.userService.findById(idAdmin);
        if (!admin || (admin.data.role != user_enum_1.Roles.ADMIN && admin.data.role != user_enum_1.Roles.USER)) {
            return {
                message: 'vous devez etre appartient a cette application',
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        const review = await this.reviewRepository.findOne({ where: { id: updateReviewDto.id, user: { id: idAdmin } } });
        if (!review) {
            return {
                message: 'review non trouvé ou vous n\'êtes pas autorisé à le mettre à jour',
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        Object.assign(review, updateReviewDto);
        review.updatedate = new Date();
        await this.reviewRepository.save(review);
        return {
            message: 'review mis à jour avec succès',
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async deleteReview(request, deleteReviewDto) {
        const idAdmin = request.idUser;
        if (!idAdmin) {
            return {
                message: 'vous devez vous connecter pour supprimer une review',
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        const admin = await this.userService.findById(idAdmin);
        if (!admin || (admin.data.role != user_enum_1.Roles.ADMIN && admin.data.role != user_enum_1.Roles.USER)) {
            return {
                message: 'vous devez être membre de cette application',
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        const review = await this.reviewRepository.findOne({ where: { id: deleteReviewDto.id, user: { id: idAdmin } } });
        if (!review) {
            return {
                message: 'review non trouvé ou vous n\'êtes pas autorisé à le supprimer',
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
        }
        await this.reviewRepository.remove(review);
        return {
            message: 'review supprimé avec succès',
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async findOneByUserAndProduct(userId) {
        return await this.reviewRepository.findOne({
            where: {
                user: {
                    id: userId
                },
            },
            relations: {
                user: true,
                product: {
                    category: true
                }
            }
        });
    }
};
exports.ReviewService = ReviewService;
__decorate([
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_review_dto_1.CreateReviewDto]),
    __metadata("design:returntype", Promise)
], ReviewService.prototype, "create", null);
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(review_entity_1.ReviewEntity)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        product_service_1.ProductService,
        review_repository_1.ReviewRepository])
], ReviewService);
//# sourceMappingURL=review.service.js.map