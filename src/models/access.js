import FirebaseService, { Table } from "../utils/firebase";
import { nowiso } from "../utils/utils";
const fb = new FirebaseService();
const table = Table.ACCESS;
class Access {
  _id = null;
  staffName = ""
  sellerId = "";
  sellerMobile = "";
  sellerEmail = "";
  mobile = ""
  email = ""
  roles = []
  isFace = false
  createdAt = nowiso();
  updatedAt = nowiso();
  constructor() {}
  static toCls(obj) {
    const cls = new Access();

    cls._id = obj._id;
    cls.staffName = obj.staffName
    cls.sellerId = obj.sellerId;
    cls.sellerMobile = obj.sellerMobile;
    cls.sellerEmail = obj.sellerEmail;
    cls.mobile = obj.mobile;
    cls.email = obj.email;
    cls.createdAt = obj.createdAt;
    cls.updatedAt = obj.updatedAt;
    cls.type = obj.type
    cls.roles = obj?.roles
    cls.isFace = obj?.isFace
    return cls;
  }
  static toObj(cls) {
    const obj = {};
    if (cls) {
      obj.sellerId = cls.sellerId ?? "";
      obj.sellerMobile = cls.sellerMobile ?? "";
      obj.sellerEmail = cls.sellerEmail ?? ""; 
      obj.mobile = cls.mobile ?? ""; 
      obj.email = cls.email ?? ""; 
      obj.createdAt = cls.createdAt ?? "";
      obj.updatedAt = cls.updatedAt ?? "";
      obj.staffName = cls.staffName ?? ""
      obj.type = cls.type ?? ""
      obj.isFace = cls?.isFace ?? false
      obj.roles = cls?.roles ?? []
    }
    return obj;
   
  }
  async create() {
    if (this._id != null) {
      return null;
    }
    const createdId = await fb.create(Access.toObj(this), table);
    this._id = createdId;

    return this._id;
  }
  static async getAllAccessBySeller(sellerId) {
    const wheres = [fb.where("sellerId", "==", sellerId)];
    const objs = await fb.select(Table.ACCESS,...wheres);
    const access = await Promise.all(objs.map(async (curr) => await Access.toCls(curr)));
    return access;
  }
  static async getById(accessId) {
    
    const obj = await fb.selectFirst(table, accessId);
    const access = await Access.toCls(obj);
    return access;
  }
  async delete(){
    await fb.delete(this._id,Table.ACCESS)
  }
  async getAccessByEmailId() {
    const wheres = [
      fb.where("email", "==", this.email),
    ];
    const objs = await fb.select(table, ...wheres);
    if (objs.length > 0) {
      return Access.toCls(objs[0]);
    } else {
      return null;
    }
  }
  async getAccessByMobile() {
    const wheres = [
      fb.where("mobile", "==", this.mobile),
    ];
    const objs = await fb.select(table, ...wheres);
    
    if (objs.length > 0) {
      return Access.toCls(objs[0]);
    } else {
      return null;
    }
  }
//  static async getAllRentalBySeller(sellerId) {
//     const wheres = [fb.where("sellerId", "==", sellerId)];
//     wheres.push(fb.orderBy("createdAt","desc"))
//     const objs = await fb.select(Table.RENTAL,...wheres);

//     const rentals = objs.map((curr) => Rental.toCls(curr));
//     return rentals;
//   }
static async update(id, obj, table) {
    await fb.update(id, obj, table);
  }
  async updatePartial(obj) {
    await Access.update(this._id, obj, table);
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
  async updateAccess() {
    
    await this.updatePartial({
      staffName: this.staffName,
      email: this.email,
      mobile: this.mobile,
      roles: this.roles,
      isFace: this.isFace
    });
  }

}

export default Access;
