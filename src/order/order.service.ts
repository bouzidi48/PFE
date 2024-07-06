import { BadRequestException, HttpStatus, Inject, Injectable, NotFoundException, Session } from '@nestjs/common';
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
import { UserController } from 'src/user/user.controller';
import { ProductController } from 'src/product/product.controller';
import { SizeController } from 'src/size/size.controller';
import { CouleurController } from 'src/couleur/couleur.controller';
import { FindOrderById } from './dto/find-by-id.dto';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { Roles } from 'src/enum/user_enum';
import { updateOrderStatusDto } from './dto/update-order-status.dto';
import { NotFoundError } from 'rxjs';
import { OrderStatus } from 'src/enum/order-status.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRespoitory:OrderRepository,
    @Inject(UserController) private readonly userService:UserController,
    @Inject(ProductController) private readonly productservice:ProductController,
    @Inject(SizeController) private readonly sizeService:SizeController,
    @Inject(CouleurController) private readonly couleurService:CouleurController
   
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
    
    
     for(let i =0;i<panier.data.list.length;i++){
      
      const product= await this.productservice.findById(panier.data.list[i].productId)
      
      const size = await this.sizeService.findOne(panier.data.list[i].sizeId)
      
      const couleur = await this.couleurService.findOne(panier.data.list[i].couleurId)
      
      const quantity=panier.data.list[i].quantity;
      const price = panier.data.list[i].price
      const orderItems=new OrderItems();
      orderItems.product=product.data
      orderItems.size=size.data
      orderItems.couleur=couleur.data
      orderItems.price=price
      orderItems.quantity=quantity
      orderItems.order=orders
      orderItems.created_at=new Date()
      await this.orderRespoitory.save(orderItems)
      
     }

    return {
      data:orders,
      statusCode:HttpStatus.OK,
    }
  }

  async findAll() {
    const order=await this.orderRespoitory.find();
    if(!order){
      return await  {
        data : null,
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    return await{
      data:order,
      statusCode:HttpStatus.OK,
    }
  }

 async findOne(findbyid:FindOrderById) {
    const orderid = await this.orderRespoitory.findOne({where:{id:findbyid.id}})
    if(!orderid){
      return await {
        data:null,
        statusCode:HttpStatus.BAD_REQUEST,
      }

      }
      return await {
        data:orderid,
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }

    async findOnne(id:number):Promise<Order>{
      return await this.orderRespoitory.findOne({
        where: { id },
        relations:{
          shipping_address:true,
          user:true,
          orderItems:{product:true}
          
        },
      });
    }
  

  async update(@Session() request:Record<string, any>,id: number, updateOrderStatusDto: updateOrderStatusDto) {
     
    const idAdmin=request.idUser
    if(!idAdmin) {
      return await {
        message: 'vous devez vous connecter pour Modifier status de commande',
        statusCode: HttpStatus.BAD_REQUEST,
      }
    }
    const admin= await this.userService.findById(idAdmin)
  if(!admin || admin.data.role!=Roles.ADMIN) {
    return await{
      message:'vous devez etre un admin',
      statusCode:HttpStatus.BAD_REQUEST,
    
    }
  }
  let order =await this.findOnne(id);
  if(!order) throw new BadRequestException ('Commande non trouvée');

  if((order.status===OrderStatus.DELIVERED)||(order.status===OrderStatus.CENCELLED)){
    throw new BadRequestException(`Commande déjà  ${order.status}`)
  }
  if((order.status===OrderStatus.PROCESSING)&&(updateOrderStatusDto.status!=OrderStatus.SHIPPED)){
    throw new BadRequestException(`La livraison doit se faire après shipped !!!`)
  }
//Si le nouveau statut est SHIPPED et que le statut actuel est déjà SHIPPED, la fonction retourne la commande sans modification.
  if((updateOrderStatusDto.status===OrderStatus.SHIPPED)&&(order.status===OrderStatus.SHIPPED)){
    return order;
  }
//Si le nouveau statut est SHIPPED, elle met à jour le champ ShippedAt avec la date actuelle.
  if(updateOrderStatusDto.status===OrderStatus.SHIPPED){

   order.ShippeAt=new Date();
  }
//Si le nouveau statut est DELIVERED, elle met à jour le champ delivered avec la date actuelle.
  if(updateOrderStatusDto.status===OrderStatus.DELIVERED){

    order.delivered=new Date();
  }

  order.status=updateOrderStatusDto.status;
  order.orderUpdateBy= request.idUser;
  order= await this.orderRespoitory.save(order);
  //pour mettre à jour le stock des produits dans la commande + -
  if(updateOrderStatusDto.status===OrderStatus.DELIVERED){
    await this.stockUpdate(order,OrderStatus.DELIVERED)
  }
  return order;
}
//pour mettre à jour le stock du produit.
 async stockUpdate(order:Order,status:string){
  for(const op of order.orderItems){
    await this.productservice.updateStock(op.product.id,op.quantity,status);

  }

 }
 async cancelled(@Session() request:Record<string, any>,id:number){
  const idAdmin=request.idUser
    if(!idAdmin) {
      return await {
        message: 'vous devez vous connecter pour Modifier status de commande',
        statusCode: HttpStatus.BAD_REQUEST,
      }
    }
    const admin= await this.userService.findById(idAdmin)
  if(!admin || admin.data.role!=Roles.ADMIN) {
    return await{
      message:'vous devez etre un admin',
      statusCode:HttpStatus.BAD_REQUEST,
    
    }
  }
    let order =await this.findOnne(id);
    if(!order) throw new NotFoundException('order Not found.');
// deja annulee alors sans modifier
    if(order.status===OrderStatus.CENCELLED) return order;
//La fonction met à jour le statut de la commande à CENCELLED
    order.status= OrderStatus.CENCELLED;
    order.orderUpdateBy= request.idUser;
    order=await this.orderRespoitory.save(order);
//pour mettre à jour le stock des produits dans la commande + -
    await this.stockUpdate(order,OrderStatus.CENCELLED);
    return order;
 }
 /* async deleteOrder(@Session() request: Record<string, any>, id: number) {
  const idAdmin = request.idUser;
  if (!idAdmin) {
    return {
      message: 'Vous devez vous connecter pour supprimer une commande',
      statusCode: HttpStatus.BAD_REQUEST,
    };
  }

  const admin = await this.userService.findById(idAdmin);
  if (!admin ||(admin.data.role!=Roles.ADMIN &&  admin.data.role!=Roles.USER)) {
    return {
      message: `Vous devez être membre a notre app  pour supprimer une commande`,
      statusCode: HttpStatus.BAD_REQUEST,
    };
  }

  let order = await this.orderRespoitory.findOne( {where:{id:id}});
  if (!order) {
    throw new NotFoundException('Commande non trouvée.');
  }

  await this.orderRespoitory.remove(order);
  return {
    message: 'Commande supprimée avec succès',
    statusCode: HttpStatus.OK,
  };
} */


  async deleteOrder(@Session() request: Record<string, any>, id: number) {
    const idUser = request.idUser;
    if (!idUser) {
        throw new BadRequestException('Vous devez vous connecter pour supprimer une commande');
    }

    let order = await this.findOnne(id);
    if (!order) {
        throw new NotFoundException('Commande non trouvée');
    }

    // Vérifiez que l'utilisateur est bien celui qui a passé la commande
    if (order.user.id !== idUser) {
        throw new BadRequestException('Vous ne pouvez pas supprimer cette commande');
    }

    // Vérifiez que la commande n'a pas été expédiée ou livrée
    if (order.status === OrderStatus.SHIPPED || order.status === OrderStatus.DELIVERED) {
        throw new BadRequestException(`Impossible de supprimer une commande ${order.status.toLowerCase()}`);
    }

    // Restaurez les stocks des produits
    await this.restoreStock(order);

    // Supprimez la commande
    await this.orderRespoitory.remove(order);

    return {
        message: 'Commande supprimée avec succès',
        statusCode: HttpStatus.OK,
    };
}

async restoreStock(order: Order) {
    for (const orderItem of order.orderItems) {
        await this.productservice.updateStock1(
            orderItem.product.id,
            orderItem.quantity,
            'restore'
        );
    }
}
}
