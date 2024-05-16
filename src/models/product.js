import FirebaseService, { Table } from "../utils/firebase";
import { nowiso } from "../utils/utils";
import { Email, Mobile, PaymentDetails, Profile } from "../utils/utils.model";
import Seller from "./seller";
import Store from "./store";
const fb = new FirebaseService();
const table = Table.PRODUCT;
class Product {
  _id = null;
  productName = "";
  imageUrl = null;
  productImage = "";
  productPrice = 0;
  productCategory = "";
  storeId = "";
  sellerId = "";
  isAdded = false;
  seller = new Seller();
  store = new Store();
  createdAt = nowiso();
  updatedAt = nowiso();
  constructor() {}
  static toCls(obj) {
    const cls = new Product();
    cls._id = obj._id;
    cls.productName = obj.productName;
    cls.productImage = obj.productImage;
    cls.productPrice = obj.productPrice;
    cls.productCategory = obj.productCategory;
    cls.storeId = obj.storeId;
    cls.sellerId = obj.sellerId;
    cls.isAdded = obj.isAdded;
    cls.createdAt = obj.createdAt;
    cls.updatedAt = obj.updatedAt;
    return cls;
  }
  static toObj(cls) {
    const obj = {};
    if (cls) {
      obj.productName = cls?.productName;
      obj.productImage = cls?.productImage;
      obj.productPrice = cls?.productPrice;
      obj.productCategory = cls?.productCategory;
      obj.storeId = cls?.storeId;
      obj.sellerId = cls?.sellerId;
      obj.isAdded = cls?.isAdded;
      obj.createdAt = cls?.createdAt;
      obj.updatedAt = cls?.updatedAt;
    }
    return obj;
  }
  static async getById(productId) {
    
    const obj = await fb.selectFirst(table, productId);
    const product = await Product.inflate(obj);
    return product;
  }
  static async inflate(obj) {
    const product = Product.toCls(obj);
    product.seller = await Seller.getById(product.sellerId);
    product.store = await Store.getById(product.storeId);
    return product;
  }
  async create() {
    if (this._id != null) {
      return null;
    }
    const createdId = await fb.create(Product.toObj(this), table);
    this._id = createdId;

    return this._id;
  }
  static async update(id, obj, table) {
    await fb.update(id, obj, table);
  }
  async updatePartial(obj) {
    await Product.update(this._id, obj, table);
  }
  // static async getById(sellerId) {
  //   const obj = await Seller.fb.selectFirst(Seller.TABLE, sellerId)
  //   const seller = await Seller.inflate(obj)
  //   return seller
  // }
    static async getAllProductsByStore(storeId) {
      const wheres = [fb.where("storeId", "==", storeId)];
      const objs = await fb.select(Table.PRODUCT,...wheres);
      const products = await Promise.all(objs.map(async (curr) => await Product.inflate(curr)));
      return products;
    }
    static async getAllProductsByActiveStore(storeId) {
      
      const wheres = [fb.where("storeId", "==", storeId)];
      wheres.push(fb.where("isAdded","==" ,true))
      const objs = await fb.select(Table.PRODUCT,...wheres);
      
      const products = await Promise.all(objs.map(async (curr) => await Product.inflate(curr)));
      return products;
    }
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
  async updateProduct() {
    
    await this.updatePartial({
      productName: this.productName,
      productCategory: this.productCategory,
      productImage: this.productImage,
      productPrice: this.productPrice,
      isAdded: this.isAdded,
      storeId: this.storeId,
      sellerId: this.sellerId,
    });
  }
   async updateAdded() {
    await this.updatePartial({
     isAdded: this.isAdded
    });
  }
 

  async uploadImage(file) {
    return fb.uploadFile(file);
  }
  async downloadUrl(file) {
    return await fb.imageUrl(file);
  }
}

export default Product;
