import { Controller, Get, Post, Body, Patch, Param, Delete, Session, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { FindOrderById } from './dto/find-by-id.dto';
import { updateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  create(@Session() request:Record<string, any>,@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(request,createOrderDto);
  }

  @Get('AllOrder')
  findAll() {
    return this.orderService.findAll();
  }

  @Get('findById')
  findOne(@Body() findbyid:number) {
    return this.orderService.findOne(findbyid);
  }

  @Get(':id')
  findOnne(@Param('id') id: number) {
    return this.orderService.findOnne(+id);
  }

  @Put(':id')
  update(@Session() request:Record<string, any>,@Param('id') id: number, @Body() updateOrderStatusDto: updateOrderStatusDto) {
    return this.orderService.update(request,+id, updateOrderStatusDto);
  }

  @Put('cancel/:id')

  async cancelled(@Session() request:Record<string, any>,@Param('id') id:string){
   return await this.orderService.cancelled(request,+id)
  }

  @Delete(':id')
  remove(@Session() request: Record<string, any>,@Param('id') id: string) {
    return this.orderService.deleteOrder(request,+id);
  }
}
