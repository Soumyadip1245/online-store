import FirebaseService, { Table } from "../utils/firebase";
import { nowiso } from "../utils/utils";
import { Email, Mobile, PaymentDetails, Profile } from "../utils/utils.model";
import * as dayjs from "dayjs";
import Rental from "./rental";
const fb = new FirebaseService();
const table = Table.BUYER;
class Buyer {
  _id = null;
  buyerName = "";
  profile = new Profile();
  mobile = new Mobile();
  createdAt = nowiso();
  updatedAt = nowiso();
  constructor() {}
  static toCls(obj) {
    const cls = new Buyer();
    cls._id = obj._id;
    cls.buyerName = obj.buyerName;
    cls.profile = Profile.toCls(obj.profile);
    cls.mobile = Mobile.toCls(obj.mobile);
    cls.createdAt = obj.createdAt;
    cls.updatedAt = obj.updatedAt;
    return cls;
  }
  static toObj(cls) {
    const obj = {};
    if (cls) {
      obj.buyerName = cls.buyerName ?? "";
      obj.profile = Profile.toObj(cls.profile);
      obj.mobile = Mobile.toObj(cls.mobile);
      obj.createdAt = cls.createdAt ?? "";
      obj.updatedAt = cls.updatedAt ?? "";
    }
    return obj;
  }

 
  async create() {
    if (this._id != null) {
      return null;
    }
    
    const createdId = await fb.create(Buyer.toObj(this), table);
    this._id = createdId
    return this._id;
  }
  static async getById(buyerId) {
    
    const obj = await fb.selectFirst(Buyer.TABLE, buyerId);
    const buyer = await Buyer.toCls(obj);
    return buyer;
  }
  static async update(id, obj, table) {
    await fb.update(id, obj, table);
  }
  async updatePartial(obj) {
    await Buyer.update(this._id, obj, table);
  }
  
 
  async getBuyerByEmailId() {
    const wheres = [
      fb.where("profile.email._value", "==", this.profile.email.value),
    ];
    const objs = await fb.select(table, ...wheres);
    console.log(objs)
    if (objs.length > 0) {
      return Buyer.toCls(objs[0]);
    } else {
      const id = this.create()
      return {"_id": id, ...this};
    }
  }

  async updateProfile() {
    await this.updatePartial({
      profile: {
        address: this.profile.address,
        city: this.profile.city,
        state: this.profile.state,
        pincode: this.profile.pincode
      },
      buyerName: this.sellerName
    });
  }
 
}

export default Buyer;
