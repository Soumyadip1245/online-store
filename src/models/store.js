import FirebaseService, { Table } from "../utils/firebase";
import { nowiso } from "../utils/utils";
import { Email, Mobile, PaymentDetails, Profile } from "../utils/utils.model";
import Seller from "./seller";
const fb = new FirebaseService();
const table = Table.STORE;
class Store {
  _id = null;
  storeName = "";
  storeImage = "";
  imageUrl = null
  isVerified = false
  storeAddress = '';
  sellerId = ''
  gstNumber = ''
  number = 0
  isEnabled = false
  uniqueName = ''
  isPaynow = false
  isPaylater = false
  seller = new Seller();
  createdAt = nowiso();
  updatedAt = nowiso();
  constructor() {}
  static toCls(obj) {
    const cls = new Store();

    cls._id = obj._id;
    cls.uniqueName = obj?.uniqueName
    cls.isPaynow = obj?.isPaynow
    cls.isPaylater = obj?.isPaylater
    cls.isEnabled = obj.isEnabled
    cls.storeName = obj.storeName;
    cls.storeImage = obj.storeImage;
    cls.sellerId = obj.sellerId;
    cls.storeAddress = obj.storeAddress
    cls.createdAt = obj.createdAt;
    cls.updatedAt = obj.updatedAt;
    cls.gstNumber = obj?.gstNumber
    cls.number = obj.number
    cls.isVerified = obj.isVerified
    return cls;
  }
  static toObj(cls) {
    const obj = {};
    if (cls) {
      obj.storeName = cls.storeName ?? "";
      obj.isEnabled = cls.isEnabled ?? false;
      obj.storeImage = cls.storeImage ?? "";
      obj.sellerId = cls.sellerId ?? "";
      obj.createdAt = cls.createdAt ?? "";
      obj.updatedAt = cls.updatedAt ?? "";
      obj.gstNumber = cls?.gstNumber ?? ""
      obj.number = cls.number ?? 0
      obj.storeAddress = cls.storeAddress ?? ""
      obj.isVerified = cls.isVerified ?? false
      obj.uniqueName = cls?.uniqueName ?? ""
      obj.isPaynow = cls?.isPaynow ?? false
      obj.isPaylater = cls?.isPaylater ?? false
    }
    return obj;
   
  }
  get isShow(){
    return this.isEnabled && this.seller.istheSubscriptionAvailable
  }
  get storeUrl(){
    const store = window.location.origin + '/store/' + this.uniqueName
    return store
  }
  static async inflate(obj) {
    const store = Store.toCls(obj)
    store.imageUrl = await fb.imageUrl(store.storeImage)
    store.seller = await Seller.getById(store.sellerId)
    
    return store
  }
  static async getById(storeId) {
    const obj = await fb.selectFirst(Store.TABLE, storeId)
    const store = await Store.inflate(obj)
    return store
  }
  async updateStore() {
    
    await this.updatePartial({
      storeAddress: this.storeAddress,
      storeImage: this.storeImage,
      storeName: this.storeName,
      gstNumber: this.gstNumber,
      uniqueName: this.uniqueName,
      isPaylater: this.isPaylater,
      isPaynow: this.isPaynow
    });
  }
  async updateEnabled() {
    await this.updatePartial({
      isEnabled: this.isEnabled
    });
  }
  async create() {
    if (this._id != null) {
      return null;
    }
    const createdId = await fb.create(Store.toObj(this), table);
    this._id = createdId;

    return this._id;
  }
  static async update(id, obj, table) {
    await fb.update(id, obj, table);
  }
  async updatePartial(obj) {
    await Store.update(this._id, obj, table);
  }
  async getAllStoreData() {
    const objs = await fb.select(Table.STORE);
    const store = objs.map((curr) => Store.toCls(curr));
    return store;
  }
  static async getById(storeId) {
    if (storeId == null) return null
    const obj = await fb.selectFirst(Table.STORE, storeId)
    return Store.toCls(obj)
  }

  async uploadImage(file) {
    return fb.uploadFile(file);
  }
  async downloadUrl(file) {
    return await fb.imageUrl(file);
  }
  async getStoreBySeller(sellerId) {
    const wheres = [fb.where("sellerId", "==", sellerId)];
    const objs = await fb.select(table, ...wheres);
    
    if (objs.length > 0) {
      return Store.inflate(objs[0])
    } else {
      return null;
    }
  }
  static async getStoreByunique(unique) {
    const wheres = [fb.where("uniqueName", "==", unique)];
    const objs = await fb.select(table, ...wheres);
    
    if (objs.length > 0) {
      return Store.inflate(objs[0])
    } else {
      return null;
    }
  }
}

export default Store;
