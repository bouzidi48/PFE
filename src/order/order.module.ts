import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderRepository } from './order.repository';

import { Shipping } from './entities/shipping.entity';
import { OrderItems } from './entities/order-item.entity';
import { UserController } from 'src/user/user.controller';
import { ProductController } from 'src/product/product.controller';
import { CouleurController } from 'src/couleur/couleur.controller';
import { SizeController } from 'src/size/size.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order,OrderRepository,OrderItems,Shipping,]),UserModule],
  controllers: [OrderController],
  providers: [OrderService,UserController,ProductController,CouleurController,SizeController],
  exports:[OrderService]
})
export class OrderModule {}
