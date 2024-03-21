import FirebaseService, { Table } from "../utils/firebase";
import { nowiso } from "../utils/utils";
const fb = new FirebaseService();
const table = Table.RENTAL;
class Rental {
  _id = null;
  sellerId = "";
  startDate = null;
  endDate = null;
  type = ""
  createdAt = nowiso();
  updatedAt = nowiso();
  constructor() {}
  static toCls(obj) {
    const cls = new Rental();

    cls._id = obj._id;
    cls.sellerId = obj.sellerId;
    cls.startDate = obj.startDate;
    cls.endDate = obj.endDate;
    cls.createdAt = obj.createdAt;
    cls.updatedAt = obj.updatedAt;
    cls.type = obj.type
    return cls;
  }
  static toObj(cls) {
    const obj = {};
    if (cls) {
      obj.sellerId = cls.sellerId ?? "";
      obj.startDate = cls.startDate ?? null;
      obj.endDate = cls.endDate ?? null;
      obj.createdAt = cls.createdAt ?? "";
      obj.updatedAt = cls.updatedAt ?? "";
      obj.type = cls.type ?? ""
    }
    return obj;
   
  }
  async create() {
    if (this._id != null) {
      return null;
    }
    const createdId = await fb.create(Rental.toObj(this), table);
    this._id = createdId;

    return this._id;
  }

 static async getAllRentalBySeller(sellerId) {
    const wheres = [fb.where("sellerId", "==", sellerId)];
    wheres.push(fb.orderBy("createdAt","desc"))
    const objs = await fb.select(Table.RENTAL,...wheres);

    const rentals = objs.map((curr) => Rental.toCls(curr));
    return rentals;
  }
 

}

export default Rental;
