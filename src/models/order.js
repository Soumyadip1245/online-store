import { CartItem } from "../components/storeLink/store-context/storeService";
import FirebaseService, { Table } from "../utils/firebase";
import { nowiso } from "../utils/utils";
import { DeliveryAddress } from "../utils/utils.model";
const fb = new FirebaseService();
const table = Table.ORDER;
class Order {
  _id = null;
  orderNumber = ""
  sellerId = "";
  buyerId = "";
  buyerName = "";
  buyerMobile = ""
  isPaid = false
  isReached = false
  isAccepted = false
  isPaynow = false
  cartItems = []
  deliveryAddress = new DeliveryAddress()
  totalAmount = 0
  instructions = ''
  isCancelled = false
  isRejected = false
  isOutForreached = false
  createdAt = nowiso();
  updatedAt = nowiso();
  constructor() {}
  static toCls(obj) {
    const cls = new Order();
    cls._id = obj._id;
    cls.orderNumber = obj.orderNumber
    cls.sellerId = obj.sellerId;
    cls.buyerId = obj.buyerId;
    cls.isPaid = obj.isPaid;
    cls.isReached = obj.isReached;
    cls.buyerMobile = obj.buyerMobile
    cls.buyerName = obj.buyerName
    cls.totalAmount = obj.totalAmount
    cls.instructions = obj.instructions
    cls.deliveryAddress = DeliveryAddress.toCls(obj.deliveryAddress)
    cls.isPaynow = obj.isPaynow;
    cls.cartItems = obj.cartItems;
    cls.isAccepted = obj.isAccepted
    cls.updatedAt = obj.updatedAt;
    cls.createdAt = obj.createdAt
    cls.isCancelled = obj.isCancelled
    cls.isRejected = obj.isRejected
    cls.isOutForreached = obj.isOutForreached
    return cls;
  }
  static toObj(cls) {
    const obj = {};
    if (cls) {
      obj.orderNumber = cls.orderNumber ?? "";
      obj.sellerId = cls.sellerId ?? "";
      obj.buyerId = cls.buyerId ?? ""; 
      obj.isPaid = cls.isPaid ?? "";
      obj.buyerName = cls.buyerName ?? ""
      obj.buyerMobile = cls.buyerMobile ?? ""
      obj.isAccepted = cls.isAccepted ?? false
      obj.isCancelled = cls.isCancelled ?? false
      obj.isRejected = cls.isRejected ?? false
      obj.isOutForreached = cls.isOutForreached ?? false
      obj.isReached = cls.isReached ?? "";
      obj.totalAmount = cls.totalAmount ?? 0
      obj.instructions = cls.instructions ?? ""
      obj.deliveryAddress = DeliveryAddress.toObj(cls.deliveryAddress)
      obj.isPaynow = cls.isPaynow ?? "";
      obj.cartItems = cls.cartItems ?? "";
      obj.createdAt = cls.createdAt ?? ""
      obj.updatedAt = cls.updatedAt ?? ""
    }
    return obj;
   
  }
  async create() {
    if (this._id != null) {
      return null;
    }
    const createdId = await fb.create(Order.toObj(this), table);
    this._id = createdId;

    return this._id;
  }

//   static async getAllAccessBySeller(sellerId) {
//     const wheres = [fb.where("sellerId", "==", sellerId)];
//     const objs = await fb.select(Table.ACCESS,...wheres);
//     const access = await Promise.all(objs.map(async (curr) => await Access.toCls(curr)));
//     return access;
//   }
//   static async getById(accessId) {
    
//     const obj = await fb.selectFirst(table, accessId);
//     const access = await Access.toCls(obj);
//     return access;
//   }
//   async delete(){
//     await fb.delete(this._id,Table.ACCESS)
//   }
//   async getAccessByEmailId() {
//     const wheres = [
//       fb.where("email", "==", this.email),
//     ];
//     const objs = await fb.select(table, ...wheres);
//     if (objs.length > 0) {
//       return Access.toCls(objs[0]);
//     } else {
//       return null;
//     }
//   }
//   async getAccessByMobile() {
//     const wheres = [
//       fb.where("mobile", "==", this.mobile),
//     ];
//     const objs = await fb.select(table, ...wheres);
    
//     if (objs.length > 0) {
//       return Access.toCls(objs[0]);
//     } else {
//       return null;
//     }
//   }
 static async getAllOrdersSeller(sellerId) {
    const wheres = [fb.where("sellerId", "==", sellerId)];
    wheres.push(fb.orderBy("createdAt","desc"))
    const objs = await fb.select(Table.ORDER,...wheres);
    
    const orders = objs.map((curr) => Order.toCls(curr));
    return orders;
  }
 static async getAllOrdersBuyer(buyerId) {
    const wheres = [fb.where("buyerId", "==", buyerId)];
    wheres.push(fb.orderBy("createdAt","desc"))
    const objs = await fb.select(Table.ORDER,...wheres);
    
    const orders = objs.map((curr) => Order.toCls(curr));
    return orders;
  }
static async update(id, obj, table) {
    await fb.update(id, obj, table);
  }
  async updatePartial(obj) {
    await Order.update(this._id, obj, table);
  }
  // static async getById(sellerId) {
  //   const obj = await Seller.fb.selectFirst(Seller.TABLE, sellerId)
  //   const seller = await Seller.inflate(obj)
  //   return seller
  // }
  
  //   async getSellerByMobileNumber(number) {
  //     const wheres = [fb.where("mobile.number", "==", number)];
  //     const objs = await fb.select(table, ...wheres);
  //     if (objs.length > 0) {
  //       return Seller.inflate(objs[0])
  //     } else {
  //       return null;
  //     }
  //   }
  //   async getSellerByEmailId() {
  //     const wheres = [
  //       fb.where("profile.email._value", "==", this.profile.email.value),
  //     ];
  //     const objs = await fb.select(table, ...wheres);
  //     if (objs.length > 0) {
  //       return Seller.inflate(objs[0])
  //     } else {
  //       return null;
  //     }
  //   }
  async updateAccept() {
    await this.updatePartial({
      isAccepted: true
    });
  }
  async updateReject() {
    await this.updatePartial({
      isRejected: true
    });
  }
  async updatePaid() {
    await this.updatePartial({
      isPaid: true
    });
  }
  async updateisOutDelivered() {
    await this.updatePartial({
      isOutForreached: true
    });
  }
  async updateDelivered() {
    await this.updatePartial({
      isReached: true
    });
  } 
  async uploadInvoice(file,orderNumber) {
    return fb.uploadPDF(file,orderNumber);
  }
  async downloadUrl(file) {
    return await fb.getInvoice(file);
  }
}

export default Order;
