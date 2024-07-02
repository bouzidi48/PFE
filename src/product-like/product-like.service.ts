import { Injectable } from '@nestjs/common';
import { CreateProductLikeDto } from './dto/create-product-like.dto';
import { UpdateProductLikeDto } from './dto/update-product-like.dto';

@Injectable()
export class ProductLikeService {
  create(createProductLikeDto: CreateProductLikeDto) {
    return 'This action adds a new productLike';
  }

  findAll() {
    return `This action returns all productLike`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productLike`;
  }

  update(id: number, updateProductLikeDto: UpdateProductLikeDto) {
    return `This action updates a #${id} productLike`;
  }

  remove(id: number) {
    return `This action removes a #${id} productLike`;
  }
}
