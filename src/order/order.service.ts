import { HttpStatus, Inject, Injectable, Session } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { Order } from './entities/order.entity';
import { Shipping } from './entities/shipping.entity';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { OrderItems } from './entities/order-item.entity';
import { SizeService } from 'src/size/size.service';
import { CouleurService } from 'src/couleur/couleur.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRespoitory:OrderRepository,
    private readonly userService:UserService,
    private readonly productservice:ProductService,
    private readonly sizeService:SizeService,
    private readonly couleurService:CouleurService
   
  ){}
 async  create(@Session() request:Record<string, any>,createOrderDto: CreateOrderDto) {
    const idUser=request.idUser
    console.log(idUser)
    if(!idUser){
      return {
        message: 'vous devez vous connecter pour ajouter une commande',
        statusCode: HttpStatus.BAD_REQUEST,
      }
    }
    const user = await this.userService.findOne(idUser)
    if(!user){
      return {
        message: 'vous devez vous connecter pour ajouter une commande',
        statusCode: HttpStatus.BAD_REQUEST,
      }
    }
    
    

    const shipping=new Shipping()
    Object.assign(shipping,createOrderDto.shippingAddress);
    const panier= await this.productservice.listePanier(request)
    const order=new Order();
    order.shipping_address=shipping;
    order.billing_address = createOrderDto.billing_address
    order.user=user.data;
    order.order_date = new Date()
    order.created_at = new Date()
    order.total_amount = panier.data.total
    order.total_reduction = panier.data.totalAvecReduction
//{ productId: 4, couleurId: 1, sizeId: 1, quantity: 10, price: 12340 }
    const orders=await this.orderRespoitory.save(order)
     const panier= await this.productservice.listePanier(request)
     
     for(let i =0;panier.data.length;i++){


/* 
      const product= await this.productservice.findById( panier.data[i].)
      const size = await this.sizeService.findOne(panier.data[i].)
      const quantity=panier.data[i].quantity;
      const orderItems=new OrderItems();
      orderItems.product=product.data
      orderItems.size=size.data
      orderItems.couleur=couleur.data
      orderItems.price=price
      orderItems.quantity=quantity
      orderItems.order=orders
      await this.orderRespoitory.save(orderItems) */
     }


  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
