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
import { request } from 'http';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRespoitory:OrderRepository,
    @InjectRepository(Shipping) private readonly shippingRepository:ShippingRepository,
    private readonly mailerService:MailerService,
    @InjectRepository(OrderItems) private readonly orderItemsRepository:OrderItemsRepository,
    @Inject(forwardRef(() => UserService))
      private readonly userService:UserService,
      private readonly productservice:ProductService,
      private readonly sizeService:SizeService,
      private readonly couleurService:CouleurService,
      @Inject(forwardRef(() => PaymentService))
      private readonly paymentService:PaymentService
   
  ){}
  async nbOrder(@Session() request: Record<string, any>) {
    const idUser = request.idUser;
  
      if (!idUser) {
        return {
          data: null,
          statusCode: HttpStatus.BAD_REQUEST,
        };
      }
  
      const user = await this.userService.findById(idUser);
  
      if (!user || user.data.role !== Roles.ADMIN && user.data.role !== Roles.SUPERADMIN) {
        return {
          data: null,
          statusCode: HttpStatus.FORBIDDEN, // On retourne FORBIDDEN si l'utilisateur n'a pas les droits nécessaires
        };
      }

      const orderCount = await this.orderRespoitory.count();
  
      return {
        data: orderCount,
        statusCode: HttpStatus.OK,
      };

  }
  async nbOrderParYear(@Session() request: Record<string, any>) {
    const idUser = request.idUser;
  
    if (!idUser) {
      return {
        data: null,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  
    const user = await this.userService.findById(idUser);
  
    if (!user || (user.data.role !== Roles.ADMIN && user.data.role !== Roles.SUPERADMIN)) {
      return {
        data: null,
        statusCode: HttpStatus.FORBIDDEN, // On retourne FORBIDDEN si l'utilisateur n'a pas les droits nécessaires
      };
    }
  
    // Requête pour regrouper les commandes par année
    const orderCountsByYear = await this.orderRespoitory
      .createQueryBuilder("order")
      .select("EXTRACT(YEAR FROM order.created_at) AS year")
      .addSelect("COUNT(order.id)", "count")
      .groupBy("year")
      .orderBy("year", "ASC")
      .getRawMany();
  
    return {
      data: orderCountsByYear,
      statusCode: HttpStatus.OK,
    };
  }
  async nbOrderParMonth(@Session() request: Record<string, any>) {
    const idUser = request.idUser;
  
    if (!idUser) {
      return {
        data: null,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  
    const user = await this.userService.findById(idUser);
  
    if (!user || (user.data.role !== Roles.ADMIN && user.data.role !== Roles.SUPERADMIN)) {
      return {
        data: null,
        statusCode: HttpStatus.FORBIDDEN, // On retourne FORBIDDEN si l'utilisateur n'a pas les droits nécessaires
      };
    }
  
    // Créer une nouvelle date
    const newDate = new Date();
    const currentYear = newDate.getFullYear(); // Obtenir l'année actuelle
    const currentMonth = newDate.getMonth() + 1; // Obtenir le mois actuel (ajouter 1 car les mois sont indexés à partir de 0)
    console.log(`Year: ${currentYear}, Month: ${currentMonth}`);
  
    // Requête pour regrouper les commandes par mois pour l'année actuelle
    const orderCountsByMonth = await this.orderRespoitory
      .createQueryBuilder("order")
      .select("EXTRACT(MONTH FROM order.created_at) AS month")
      .addSelect("COUNT(order.id)", "count")
      .where("EXTRACT(YEAR FROM order.created_at) = :year", { year: currentYear })
      .groupBy("month")
      .orderBy("month", "ASC")
      .getRawMany();
  
    return {
      data: orderCountsByMonth,
      statusCode: HttpStatus.OK,
    };
  }
  async nbOrderParWeek(@Session() request: Record<string, any>) {
    const idUser = request.idUser;
  
    if (!idUser) {
      return {
        data: null,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  
    const user = await this.userService.findById(idUser);
  
    if (!user || (user.data.role !== Roles.ADMIN && user.data.role !== Roles.SUPERADMIN)) {
      return {
        data: null,
        statusCode: HttpStatus.FORBIDDEN, // On retourne FORBIDDEN si l'utilisateur n'a pas les droits nécessaires
      };
    }
  
    // Créer une nouvelle date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear(); // Obtenir l'année actuelle
    const currentMonth = currentDate.getMonth() + 1; // Obtenir le mois actuel (ajouter 1 car les mois sont indexés à partir de 0)
    console.log(`Year: ${currentYear}, Month: ${currentMonth}`);
  
    // Requête pour regrouper les commandes par jour pour l'année et le mois actuels
    const orderCountsByDay = await this.orderRespoitory
      .createQueryBuilder("order")
      .select("EXTRACT(YEAR FROM order.created_at) AS year")
      .addSelect("EXTRACT(MONTH FROM order.created_at) AS month")
      .addSelect("EXTRACT(DAY FROM order.created_at) AS day")
      .addSelect("COUNT(order.id)", "count")
      .where("EXTRACT(YEAR FROM order.created_at) = :year", { year: currentYear })
      .andWhere("EXTRACT(MONTH FROM order.created_at) = :month", { month: currentMonth })
      .groupBy("year, month, day")
      .orderBy("year", "ASC")
      .addOrderBy("month", "ASC")
      .addOrderBy("day", "ASC")
      .getRawMany();
  
    console.log(orderCountsByDay);
    return {
      data: orderCountsByDay,
      statusCode: HttpStatus.OK,
    };
  }
  
  
  async ChiffreAffaire(@Session() request: Record<string, any>) {
    const idUser = request.idUser;
  
    if (!idUser) {
      return {
        data: null,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  
    const user = await this.userService.findById(idUser);
  
    if (!user || (user.data.role !== Roles.ADMIN && user.data.role !== Roles.SUPERADMIN)) {
      return {
        data: null,
        statusCode: HttpStatus.FORBIDDEN, // On retourne FORBIDDEN si l'utilisateur n'a pas les droits nécessaires
      };
    }
  
    // Calculer le chiffre d'affaires
    const chiffreAffaire = await this.orderRespoitory
      .createQueryBuilder('order')
      .innerJoin('order.payment', 'payment')
      .where('order.status = :status', { status: 'delivered' })
      .andWhere('payment.payment_status = :paymentStatus', { paymentStatus: 'completed' })
      .select('SUM(order.total_amount)', 'total')
      .getRawOne();
  
    return {
      data: chiffreAffaire?.total || 0, // On retourne 0 si aucun chiffre d'affaires n'est trouvé
      statusCode: HttpStatus.OK,
    };
  }
  async ChiffreAffaireParYear(@Session() request: Record<string, any>) {
    const idUser = request.idUser;
  
    if (!idUser) {
      return {
        data: null,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  
    const user = await this.userService.findById(idUser);
  
    if (!user || (user.data.role !== Roles.ADMIN && user.data.role !== Roles.SUPERADMIN)) {
      return {
        data: null,
        statusCode: HttpStatus.FORBIDDEN, // On retourne FORBIDDEN si l'utilisateur n'a pas les droits nécessaires
      };
    }
  
    // Calculer le chiffre d'affaires par année
    const chiffreAffaireParAnnee = await this.orderRespoitory
      .createQueryBuilder('order')
      .innerJoin('order.payment', 'payment')
      .where('order.status = :status', { status: 'delivered' })
      .andWhere('payment.payment_status = :paymentStatus', { paymentStatus: 'completed' })
      .select('EXTRACT(YEAR FROM order.created_at)', 'year')
      .addSelect('SUM(order.total_amount)', 'total')
      .groupBy('year')
      .orderBy('year', 'ASC')
      .getRawMany();
  
    return {
      data: chiffreAffaireParAnnee,
      statusCode: HttpStatus.OK,
    };
  }
  async ChiffreAffaireParMonth(@Session() request: Record<string, any>) {
    const idUser = request.idUser;
  
    if (!idUser) {
      return {
        data: null,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  
    const user = await this.userService.findById(idUser);
  
    if (!user || (user.data.role !== Roles.ADMIN && user.data.role !== Roles.SUPERADMIN)) {
      return {
        data: null,
        statusCode: HttpStatus.FORBIDDEN, // On retourne FORBIDDEN si l'utilisateur n'a pas les droits nécessaires
      };
    }
  
    // Créer une nouvelle date et extraire l'année
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    console.log(`Current Year: ${currentYear}`);
  
    // Calculer le chiffre d'affaires par mois pour l'année en cours
    const chiffreAffaireParMois = await this.orderRespoitory
      .createQueryBuilder('order')
      .innerJoin('order.payment', 'payment')
      .where('order.status = :status', { status: 'delivered' })
      .andWhere('payment.payment_status = :paymentStatus', { paymentStatus: 'completed' })
      .andWhere('EXTRACT(YEAR FROM order.created_at) = :year', { year: currentYear }) // Filtrer par l'année en cours
      .select('EXTRACT(MONTH FROM order.created_at)', 'month')
      .addSelect('SUM(order.total_amount)', 'total')
      .groupBy('month')
      .orderBy('month', 'ASC')
      .getRawMany();
  
    return {
      data: chiffreAffaireParMois,
      statusCode: HttpStatus.OK,
    };
  }
  async ChiffreAffaireParWeek(@Session() request: Record<string, any>) {
    const idUser = request.idUser;
  
    if (!idUser) {
      return {
        data: null,
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  
    const user = await this.userService.findById(idUser);
  
    if (!user || (user.data.role !== Roles.ADMIN && user.data.role !== Roles.SUPERADMIN)) {
      return {
        data: null,
        statusCode: HttpStatus.FORBIDDEN, // On retourne FORBIDDEN si l'utilisateur n'a pas les droits nécessaires
      };
    }
  
    // Créer une nouvelle date, extraire l'année et le mois
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Les mois commencent à 0 en JavaScript
    console.log(`Current Year: ${currentYear}, Current Month: ${currentMonth}`);
  
    // Calculer le chiffre d'affaires par jour pour le mois en cours
    const chiffreAffaireParJour = await this.orderRespoitory
      .createQueryBuilder('order')
      .innerJoin('order.payment', 'payment')
      .where('order.status = :status', { status: 'delivered' })
      .andWhere('payment.payment_status = :paymentStatus', { paymentStatus: 'completed' })
      .andWhere('EXTRACT(YEAR FROM order.created_at) = :year', { year: currentYear }) // Filtrer par l'année en cours
      .andWhere('EXTRACT(MONTH FROM order.created_at) = :month', { month: currentMonth }) // Filtrer par le mois en cours
      .select('EXTRACT(DAY FROM order.created_at)', 'day')
      .addSelect('SUM(order.total_amount)', 'total')
      .groupBy('day')
      .orderBy('day', 'ASC')
      .getRawMany();
  
    return {
      data: chiffreAffaireParJour,
      statusCode: HttpStatus.OK,
    };
  }
  
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
    const order=await this.orderRespoitory.find({relations: ['shipping_address', 'orderItems', 'orderItems.product', 'orderItems.couleur', 'orderItems.size','user']});
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
    const orderid = await this.orderRespoitory.findOne({where:{id:findbyid},relations:{shipping_address:true,user:true,orderItems:{product:true},payment:true}})
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
    console.log(admin.data.role===Roles.ADMIN)
  if(!admin || admin.data.role===Roles.USER) {
    return await{
      message:'vous devez etre un admin',
      statusCode:HttpStatus.BAD_REQUEST,
    
    }
  }
  let order =await this.orderRespoitory.findOne({where:{id:id},relations:['orderItems','shipping_address','user','payment']});
  console.log(order)
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
  await this.stockUpdate(order,OrderStatus.SHIPPED)
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
    
    await this.productservice.updateStock(op.size.id,op.couleur.id,op.product.id,op.quantity,status,order);

  }

 }
 async sendEmail(email: string,username:string) {
  await this.mailerService.sendMail({
    to: email,
    from:process.env.EMAIL_HOST_USER,
    subject: "demande d'admin",
    text:`Cher ${username},

      Nous vous remercions pour votre commande. Votre achat a bien été enregistré.Vous devriez recevoir la commande aujourd'hui, en cas de problème ou si vous avez des questions, n'hésitez pas à nous contacter dans notre site dans la partie "Contactez-nous".

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
  if(!admin || admin.data.role===Roles.USER) {
    return await{
      message:'vous devez etre un admin',
      statusCode:HttpStatus.BAD_REQUEST,
    
    }
  }
    let order =await this.findOne(id);
    if(!order){
      return await {
        message:"la commande n'existe pas",
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
// deja annulee alors sans modifier
    if(order.data.status===OrderStatus.CENCELLED){
      return await {
        data:order,
        statusCode:HttpStatus.OK,
      }
    }
    else if(order.data.status===OrderStatus.DELIVERED){
      return await {
        message:"la commande est livrée",
        statusCode:HttpStatus.BAD_REQUEST,
      }
    }
    else if(order.data.status===OrderStatus.SHIPPED){
      await this.stockUpdate(order.data,OrderStatus.CENCELLED);
      if(order.data.payment.payment_method===PaymentMethod.CASH){
        await this.paymentService.canceledPaymentCash(order.data.payment.id);
      }
      else if(order.data.payment.payment_method===PaymentMethod.CARD){
        await this.paymentService.canceledPayment(order.data.payment.id);
      }
    }
    else if(order.data.status===OrderStatus.PROCESSING) {
      if(order.data.payment.payment_method===PaymentMethod.CASH){
        await this.paymentService.canceledPaymentCash(order.data.payment.id);
      }
      else if(order.data.payment.payment_method===PaymentMethod.CARD){
        await this.paymentService.canceledPayment(order.data.payment.id);
      }

    }
    
//La fonction met à jour le statut de la commande à CENCELLED
    order.data.status= OrderStatus.CENCELLED;
    order.data.orderUpdateBy= request.idUser;
    order.data=await this.orderRespoitory.save(order.data);
//pour mettre à jour le stock des produits dans la commande + -
    
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
    const idAdmin = request.idAdmin;
    if (!idUser && !idAdmin) {
        return await {
          message: 'Vous devez vous connecter pour supprimer une commande',
          statusCode: HttpStatus.BAD_REQUEST,
        }
    }

    let order = await this.orderRespoitory.findOne({ where: { id: id },relations:['user','orderItems','shipping_address'] });
    if (!order) {
        return await {
          message: 'Commande non trouvée.',
          statusCode: HttpStatus.BAD_REQUEST,
        }
    }

    // Vérifiez que l'utilisateur est bien celui qui a passé la commande
    if (order.user.id !== idUser && !idAdmin) {
        return await {
          message: 'Vous n\'avez pas la permission de supprimer cette commande.',
          statusCode: HttpStatus.BAD_REQUEST,
        }
    }

    // Vérifiez que la commande n'a pas été expédiée ou livrée
    if ((order.status === OrderStatus.SHIPPED || order.status === OrderStatus.DELIVERED)&&idAdmin) {
      for(const orderItem of order.orderItems) {
        await this.orderItemsRepository.remove(orderItem);
      }
      console.log(order)
      await this.orderRespoitory.remove(order);
      await this.shippingRepository.remove(order.shipping_address);
  
      // Supprimez la commande
      
  
      return {
          message: 'Commande supprimée avec succès',
          statusCode: HttpStatus.OK,
      };
    }
    else if((order.status === OrderStatus.SHIPPED || order.status === OrderStatus.DELIVERED) && idUser){
      return await {
        message: 'La commande est livrée. Vous ne pouvez pas la supprimer.',
        statusCode: HttpStatus.BAD_REQUEST,
      }
    }
    console.log(order)
    // Restaurez les stocks des produits
    await this.restoreStock(order);
    for(const orderItem of order.orderItems) {
      await this.orderItemsRepository.remove(orderItem);
    }
    console.log(order)
    await this.orderRespoitory.remove(order);
    await this.shippingRepository.remove(order.shipping_address);

    // Supprimez la commande
    

    return {
        message: 'Commande supprimée avec succès',
        statusCode: HttpStatus.OK,
    };
}

async restoreStock(order: Order) {
  const orderItems = await this.orderItemsRepository.find({where:{order:{id:order.id}},relations: ['product', 'couleur', 'size']})
    for (const orderItem of orderItems) {
        console.log(orderItem)
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

async findbyUser(findbyid:number) {
  const orderid = await this.orderRespoitory.findOne({where:{user:{id:findbyid}},relations:{shipping_address:true,user:true,orderItems:{product:true},payment:true}})
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
  
  
}



