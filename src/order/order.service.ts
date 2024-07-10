import { BadRequestException, forwardRef, HttpStatus, Inject, Injectable, NotFoundException, Session } from '@nestjs/common';
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
import { OrderItemsRepository } from './order-item.repository';
import { ShippingRepository } from './shipping.repository';
import { cron } from 'node-cron';
import { PaymentMethod } from 'src/enum/payment_method.enum';
import { PaymentController } from 'src/payment/payment.controller';
import { PaymentService } from 'src/payment/payment.service';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRespoitory:OrderRepository,
    @InjectRepository(Shipping) private readonly shippingRepository:ShippingRepository,
    private readonly mailerService:MailerService,
    @InjectRepository(OrderItems) private readonly orderItemsRepository:OrderItemsRepository,
      private readonly userService:UserService,
      private readonly productservice:ProductService,
      private readonly sizeService:SizeService,
      private readonly couleurService:CouleurService,
      @Inject(forwardRef(() => PaymentService))
      private readonly paymentService:PaymentService
   
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
    
    
    console.log(createOrderDto.shippingAddress.address)
    const shipping= await this.shippingRepository.create(createOrderDto.shippingAddress)
    shipping.createdate = new Date()
    console.log(shipping.address)
    console.log(shipping)
    await this.shippingRepository.save(shipping);
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
      console.log(couleur.data)
      console.log(size.data)
      console.log(product.data)
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
      await this.orderItemsRepository.save(orderItems)
      
     }
     console.log(orders)
     const orderItem = await this.orderItemsRepository.find({where:{order:orders},relations: ['product', 'couleur', 'size'],})
     console.log(orderItem)
    return await {
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

 async findOne(findbyid:number) {
    const orderid = await this.orderRespoitory.findOne({where:{id:findbyid}})
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
    console.log('salut')
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
  let order =await this.orderRespoitory.findOne({where:{id:id},relations:['orderItems','shipping_address','user','payment']});
  if(!order){
    return await {
      message:"la commande n'existe pas",
      statusCode:HttpStatus.BAD_REQUEST,
    }
  }

  if((order.status===OrderStatus.DELIVERED)||(order.status===OrderStatus.CENCELLED)){
    return await {
      message:"la commande est déja livrée ou annulée",
      statusCode:HttpStatus.BAD_REQUEST,
    }
  }
  if((order.status===OrderStatus.PROCESSING)&&(updateOrderStatusDto.status!=OrderStatus.SHIPPED)){
    return await {
      message:"la commande n'est pas en cours de livraison",
      statusCode:HttpStatus.BAD_REQUEST,
    }
    
  }
//Si le nouveau statut est SHIPPED et que le statut actuel est déjà SHIPPED, la fonction retourne la commande sans modification.
  if((updateOrderStatusDto.status===OrderStatus.SHIPPED)&&(order.status===OrderStatus.SHIPPED)){
    return await {
      data:order,
      statusCode:HttpStatus.OK,
    }
  }
//Si le nouveau statut est SHIPPED, elle met à jour le champ ShippedAt avec la date actuelle.
  if(updateOrderStatusDto.status===OrderStatus.SHIPPED){

   order.ShippeAt=new Date();
   order.updated_at= new Date();
   order.ShippeAt = new Date();
   order.delivered = new Date(order.ShippeAt.getTime());
   order.delivered.setDate(order.delivered.getDate()+7);
   console.log(order.delivered)
   order.status = OrderStatus.SHIPPED;
   console.log(order.payment)
   console.log(order.payment.id)
   if( order.payment.payment_method===PaymentMethod.CASH){
    const updateCashPaymentDto = { paymentId: order.payment.id };
    console.log(updateCashPaymentDto)
     await this.paymentService.updatePaymentCash(updateCashPaymentDto);
   }
   else if(order.payment && order.payment.payment_method===PaymentMethod.CARD){
   const updateCardPaymentDto = { paymentId: order.payment.id };
   
     await this.paymentService.updatePaymentCard(updateCardPaymentDto);
   }
  
  }
  order.orderUpdateBy= order.user;
  order= await this.orderRespoitory.save(order);
  return await {
    data:order,
    statusCode:HttpStatus.OK,
  }
}
//pour mettre à jour le stock du produit.
 async stockUpdate(order:Order,status:string){
  console.log(order)
  const orderItem = await this.orderItemsRepository.find({where:{order:{id:order.id}},relations: ['product', 'couleur', 'size']})
  console.log(orderItem)
  for(const op of orderItem){
    console.log(op)
    console.log(op.couleur)
    console.log(op.product)
    console.log(op.size)
    await this.productservice.updateStock(op.size.id,op.couleur.id,op.product.id,op.quantity,status);

  }

 }
 async sendEmail(email: string,username:string) {
  await this.mailerService.sendMail({
    to: email,
    from:process.env.EMAIL_HOST_USER,
    subject: "demande d'admin",
    text:`Cher ${username},

      Nous vous remercions pour votre commande. Votre achat a bien été enregistré. En cas de problème ou si vous avez des questions, n'hésitez pas à nous contacter dans notre site dans la partie "Contactez-nous".

      Cordialement, [L'équipe de votre entreprise]"`
  });
  return await {
    message: 'le message est envoyer avec succes',
    statusCode: HttpStatus.OK,
  };
}
 async delivred(id:number,updateOrderStatusDto: updateOrderStatusDto){
  console.log('salut')
  let order =await this.orderRespoitory.findOne({where:{id:id},relations:['orderItems','shipping_address','user','payment']});
  if(!order){
    return await {
      message:"la commande n'existe pas",
      statusCode:HttpStatus.BAD_REQUEST,
    }
  }
  const currentDate = new Date();
  console.log(order.delivered.getFullYear() , order.delivered.getMonth() , order.delivered.getDate())
//Si le nouveau statut est DELIVERED, elle met à jour le champ delivered avec la date actuelle.
  if(currentDate.getFullYear() === order.delivered.getFullYear() && currentDate.getMonth() === order.delivered.getMonth() && currentDate.getDate() === order.delivered.getDate()) {

    order.status = OrderStatus.DELIVERED;
    order.updated_at= new Date();
    order = await this.orderRespoitory.save(order);
    if(order.payment.payment_method===PaymentMethod.CASH){
      await this.paymentService.updatePaymentCash({paymentId:order.payment.id});
    }
    else if(order.payment.payment_method===PaymentMethod.CARD){
      await this.paymentService.updatePaymentCard({paymentId:order.payment.id});
    }
  }

  
  order.orderUpdateBy= order.user;
  order= await this.orderRespoitory.save(order);
  //pour mettre à jour le stock des produits dans la commande + -
  if(order.status===OrderStatus.DELIVERED){
    await this.sendEmail(order.user.email,order.user.username)
    await this.stockUpdate(order,OrderStatus.DELIVERED)
  }
  return await {
    data:order,
    statusCode:HttpStatus.OK,
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
    if(!order){
      return await {
        message:"la commande n'existe pas",
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
// deja annulee alors sans modifier
    if(order.status===OrderStatus.CENCELLED){
      return await {
        data:order,
        statusCode:HttpStatus.OK,
      }
    }
//La fonction met à jour le statut de la commande à CENCELLED
    order.status= OrderStatus.CENCELLED;
    order.orderUpdateBy= request.idUser;
    order=await this.orderRespoitory.save(order);
//pour mettre à jour le stock des produits dans la commande + -
    await this.stockUpdate(order,OrderStatus.CENCELLED);
    return await {
      data:order,
      statusCode:HttpStatus.OK,
    }
 }
 async findByStatus(status:OrderStatus){
  const order = await this.orderRespoitory.find({where:{status:status}});
  if(!order){
    return await {
      data: null,
      statusCode: HttpStatus.BAD_REQUEST,
    }
  }
    return await {
      data:order,
      statusCode:HttpStatus.OK,
  } 
   
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
        return await {
          message: 'Vous devez vous connecter pour supprimer une commande',
          statusCode: HttpStatus.BAD_REQUEST,
        }
    }

    let order = await this.findOnne(id);
    if (!order) {
        return await {
          message: 'Commande non trouvée.',
          statusCode: HttpStatus.BAD_REQUEST,
        }
    }

    // Vérifiez que l'utilisateur est bien celui qui a passé la commande
    if (order.user.id !== idUser) {
        return await {
          message: 'Vous n\'avez pas la permission de supprimer cette commande.',
          statusCode: HttpStatus.BAD_REQUEST,
        }
    }

    // Vérifiez que la commande n'a pas été expédiée ou livrée
    if (order.status === OrderStatus.SHIPPED || order.status === OrderStatus.DELIVERED) {
        return await {
          message: 'Impossible de supprimer une commande expédiée ou livrée.',
          statusCode: HttpStatus.BAD_REQUEST,
        }
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
            orderItem.size.id,
            orderItem.couleur.id,
            orderItem.product.id,
            orderItem.quantity,
            'restore'
        );
    }
}
private async checkDeliveredOrders() {
  const orders = await this.orderRespoitory.find({ where: { status: OrderStatus.SHIPPED } });
  for(const order of orders) {
    this.delivred(order.id,{status:OrderStatus.DELIVERED})
  }
  // Vérifiez et mettez à jour les commandes livrées
  // ...
}
private async setupScheduledTask() {
  
  const cron = require('node-cron');
  const task = await cron.schedule('0 10 * * *', async () => {
    await this.checkDeliveredOrders();
  });
  if (task) {
    console.log('La tâche planifiée a été correctement configurée');
    task.start(); // Assurez-vous de vérifier que task est défini avant d'appeler start()
  } else {
    console.error('La tâche planifiée n\'a pas été correctement configurée');
  }
}
public async startScheduledTask() {
  await this.setupScheduledTask();
}
}



