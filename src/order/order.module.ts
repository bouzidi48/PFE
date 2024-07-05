import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderRepository } from './order.repository';

import { Shipping } from './entities/shipping.entity';
import { OrderItems } from './entities/order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order,OrderRepository,OrderItems,Shipping,]),UserModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports:[OrderService]
})
export class OrderModule {}
