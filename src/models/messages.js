import FirebaseService, { Table } from "../utils/firebase";
import { nowiso } from "../utils/utils";
const fb = new FirebaseService();
const table = Table.MESSAGE;
class Message {
  _id = null;
  isStaff = false
  text = "";
  sellerId = ""
  createdAt = nowiso();
  constructor() {}
  static toCls(obj) {
    const cls = new Message();

    cls._id = obj._id;
    cls.isStaff = obj.isStaff
    cls.text = obj.text;
    cls.sellerId = obj.sellerId;
    cls.createdAt = obj.createdAt;
    return cls;
  }
  static toObj(cls) {
    const obj = {};
    if (cls) {
      obj.sellerId = cls.sellerId ?? "";
      obj.text = cls.text ?? "";
      obj.createdAt = cls.createdAt ?? "";
      obj.isStaff = cls?.isStaff ?? false
    }
    return obj;
   
  }
  async create() {
    if (this._id != null) {
      return null;
    }
    const createdId = await fb.create(Message.toObj(this), table);
    this._id = createdId;

    return this._id;
  }
  static async getMessages(sellerId) {
    const wheres = [fb.where("sellerId", "==", sellerId)];
    wheres.push(fb.orderBy("createdAt", "desc"));

    return new Promise((resolve, reject) => {
        const unsubscribe = fb.realSelect(Table.MESSAGE, ...wheres);
        unsubscribe.then((objs) => {
            console.log("Message: ", objs);
            const messages = objs.map(async (curr) => await Message.toCls(curr));
            console.log(messages);
            resolve(messages);
        }).catch(reject);
    });
}

  
}

export default Message;
