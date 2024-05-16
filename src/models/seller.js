import FirebaseService, { Table } from "../utils/firebase";
import { nowiso } from "../utils/utils";
import { Email, Mobile, PaymentDetails, Profile } from "../utils/utils.model";
import * as dayjs from "dayjs";
import Rental from "./rental";
const fb = new FirebaseService();
const table = Table.SELLER;
class Seller {
  _id = null;
  sellerName = "";
  profile = new Profile();
  mobile = new Mobile();
  imageUrl = null;
  paymentDetails = new PaymentDetails();
  opportunityId = null
  createdAt = nowiso();
  updatedAt = nowiso();
  paidTill = null;
  constructor() {}
  static toCls(obj) {
    const cls = new Seller();
    cls._id = obj._id;
    cls.sellerName = obj.sellerName;
    cls.profile = Profile.toCls(obj.profile);
    cls.mobile = Mobile.toCls(obj.mobile);
    cls.paymentDetails = PaymentDetails.toCls(obj.paymentDetails);
    cls.createdAt = obj.createdAt;
    cls.updatedAt = obj.updatedAt;
    cls.paidTill = obj?.paidTill;
    cls.opportunityId = obj?.opportunityId 
    return cls;
  }
  static toObj(cls) {
    const obj = {};
    if (cls) {
      obj.sellerName = cls.sellerName ?? "";
      obj.profile = Profile.toObj(cls.profile);
      obj.mobile = Mobile.toObj(cls.mobile);
      obj.paymentDetails = PaymentDetails.toObj(cls.paymentDetails);
      obj.createdAt = cls.createdAt ?? "";
      obj.updatedAt = cls.updatedAt ?? "";
      obj.opportunityId = cls.opportunityId ?? null
      obj.paidTill = cls?.paidTill ?? null;
    }
    return obj;
  }
  get istheSubscriptionAvailable() {
    const ftd = nowiso()
    const ptd = this.paidTill
    if(ptd == null) return false
    if (ftd >= ptd) return false
    return true
  }
  static tensdays() {
    return new Date(dayjs().add(10, "day")).toISOString();
  }
  static months(date) {
    return new Date(dayjs(date).add(1, "month")).toISOString();
  }
  static async inflate(obj) {
    const seller = Seller.toCls(obj);
    seller.imageUrl = await fb.imageUrl(seller.paymentDetails.qrImage);

    return seller;
  }
  async create() {
    if (this._id != null) {
      return null;
    }
    this.paidTill = Seller.tensdays();
    
    const createdId = await fb.create(Seller.toObj(this), table);
    this._id = createdId;
    const rental = new Rental();
    rental.sellerId = this._id;
    rental.startDate = new Date().toISOString();
    rental.endDate = this.paidTill;
    rental.type = "Free"
    await rental.create();
    return this._id;
  }
  static async getById(sellerId) {
    
    const obj = await fb.selectFirst(Seller.TABLE, sellerId);
    const seller = await Seller.inflate(obj);
    return seller;
  }
  static async update(id, obj, table) {
    await fb.update(id, obj, table);
  }
  async updatePartial(obj) {
    await Seller.update(this._id, obj, table);
  }
  async getAllSellerData() {
    const objs = await fb.select(Table.SELLER);

    const sellers = objs.map((curr) => Seller.toCls(curr));
    return sellers;
  }
  async getSellerByMobileNumber() {
    const wheres = [fb.where("mobile.number", "==", this.mobile.number)];
    const objs = await fb.select(table, ...wheres);
    if (objs.length > 0) {
      return Seller.inflate(objs[0]);
    } else {
      return null;
    }
  }
  async getSellerByEmailId() {
    const wheres = [
      fb.where("profile.email._value", "==", this.profile.email.value),
    ];
    const objs = await fb.select(table, ...wheres);
    if (objs.length > 0) {
      return Seller.inflate(objs[0]);
    } else {
      return null;
    }
  }
  async updatePayment() {
    await this.updatePartial({
      paymentDetails: PaymentDetails.toObj(this.paymentDetails),
    });
  }
  async updateOpportunity() {
    await this.updatePartial({
      opportunityId: this.opportunityId
    });
  }
  async updateRental() {
    await this.updatePartial({
      paidTill: this.paidTill
    });
  }
  async updateProfile() {
    await this.updatePartial({
      profile: {
        address: this.profile.address,
        city: this.profile.city,
        state: this.profile.state,
        pincode: this.profile.pincode
      },
      sellerName: this.sellerName
    });
  }
  static async getById(sellerId) {
    if (sellerId == null) return null;
    const obj = await fb.selectFirst(Table.SELLER, sellerId);
    return Seller.toCls(obj);
  }
  async uploadImage(file) {
    return fb.uploadFile(file);
  }
  async downloadUrl(file) {
    return await fb.imageUrl(file);
  }
}

export default Seller;
