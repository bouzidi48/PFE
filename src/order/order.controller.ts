import { Controller, Get, Post, Body, Patch, Param, Delete, Session, Put, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import { updateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  create(@Session() request:Record<string, any>,@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(request,createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }

  

  @Put('update/:id')
  update(@Session() request:Record<string, any>,@Param('id',ParseIntPipe) id: number, @Body() updateOrderStatusDto: updateOrderStatusDto) {
    return this.orderService.update(request,id, updateOrderStatusDto);
  }

  @Put('cancel/:id')

  async cancelled(@Session() request:Record<string, any>,@Param('id',ParseIntPipe) id:number){
   return await this.orderService.cancelled(request,id)
  }

  @Delete('delete/:id')
  remove(@Session() request: Record<string, any>,@Param('id',ParseIntPipe) id: number) {
    return this.orderService.deleteOrder(request,id);
  }
  @Get('byUser/:idUser')
  findbyUser(@Param('idUser',ParseIntPipe) id: number) {
    return this.orderService.findbyUser(id);
  }
}
