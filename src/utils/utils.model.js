import { nanoid } from "nanoid";
import { auth } from "./firebase";
export class Mobile {
  number = 0;
  code = 91;

  static toCls(obj) {
    const cls = new Mobile();
    cls.number = obj?.number;
    cls.code = obj?.code;
    return cls;
  }

  static toObj(cls) {
    const obj = {
      number: cls?.number ?? 0,
      code: cls?.code ?? 91,
    };
    return obj;
  }
}
export class PaymentDetails {
  bankName = "";
  ifscCode = "";
  accountNumber = ""
  branch = ""
  upiLink = ""
  qrImage = ""
  isVerified = false
  razorpayId = ""
  isEntered = false
  static toCls(obj) {
    const cls = new PaymentDetails();
    cls.bankName = obj?.bankName;
    cls.ifscCode = obj?.ifscCode;
    cls.accountNumber = obj?.accountNumber;
    cls.branch = obj?.branch;
    cls.upiLink = obj?.upiLink;
    cls.qrImage = obj?.qrImage;
    cls.isVerified = obj?.isVerified
    cls.razorpayId = obj?.razorpayId
    cls.isEntered = obj?.isEntered
    return cls;
  }

  static toObj(cls) {
    const obj = {
      bankName: cls?.bankName ?? '',
      ifscCode: cls?.ifscCode ?? '',
      accountNumber: cls?.accountNumber ?? '',
      branch: cls?.branch ?? '',
      upiLink: cls?.upiLink ?? '',
      qrImage: cls?.qrImage ?? '',
      razorpayId: cls?.razorpayId ?? '',
      isVerified: cls?.isVerified ?? false,
      isEntered: cls?.isEntered ?? false
    };
    return obj;
  }
}
export class Cart {
  productName = "";
  productPrice = 0
  productQuantity = 0
  productId = ""
  static toCls(obj) {
    const cls = new Cart();
    cls.productName = obj?.productName;
    cls.productPrice = obj?.productPrice;
    cls.productQuantity = obj?.productQuantity;
    cls.productId = obj?.productId;
    return cls;
  }

  static toObj(cls) {
    const obj = {
      productName: cls?.productName ?? '',
      productPrice: cls?.productPrice ?? 0,
      productQuantity: cls?.productQuantity ?? 0,
      productId: cls?.productId ?? ''
    };
    return obj;
  }
}
export class DeliveryAddress {
  address = "";
  flat = ""
  landmark = ""
  pincode = ""
  city = ""
  state = ""
  gpsLongitude = ""
  static toCls(obj) {
    const cls = new DeliveryAddress();
    cls.address = obj?.address;
    cls.flat = obj?.flat;
    cls.landmark = obj?.landmark;
    cls.pincode = obj?.pincode;
    cls.city = obj?.city;
    cls.state = obj?.state;
    cls.gpsLongitude = obj?.gpsLongitude;
    return cls;
  }

  static toObj(cls) {
    const obj = {
      address: cls?.address ?? '',
      flat: cls?.flat ?? '',
      landmark: cls?.landmark ?? '',
      pincode: cls?.pincode ?? '',
      city: cls?.city ?? '',
      state: cls?.state ?? '',
      gpsLongitude: cls?.gpsLongitude ?? '',
    };
    return obj;
  }
}

export class Email {
  _value = null;
  _otp = null;

  get value() {
    return this._value;
  }

  set value(value) {
    if (value === "") {
      this._value = null;
      this._otp = null;
      return;
    }
    if (this._value === value) return;
    this._otp = hackid(4);
    this._value = value;
  }

  get isVerified() {
    return this._otp === null;
  }

  get verified() {
    return this.isVerified ? this.value : null;
  }

  get otp() {
    return this._otp;
  }

  set otp(value) {
    if (value && this._otp === value) {
      this._otp = null;
    }
  }

  static toCls(obj) {
    const cls = new Email();
    cls._value = obj?._value ?? null
    cls._otp = obj?._otp ?? null;
    return cls;
  }

  static toObj(cls) {
    const obj = {
      _value: cls?._value,
      _otp: cls?._otp,
    };
    return obj;
  }
}
export class Profile {
  address = "";
  state = "";
  city = "";
  pincode = "";
  email = new Email();

  static toCls(obj) {
    const cls = new Profile();
    cls.address = obj?.address ?? "";
    cls.state = obj?.state ?? "";
    cls.city = obj?.city ?? "";
    cls.pincode = obj?.pincode ?? "";
    cls.email = Email.toCls(obj?.email);
    return cls;
  }

  static toObj(cls) {
    const obj = {
      address: cls?.address ?? "",
      state: cls?.state ?? "",
      city: cls?.city ?? "",
      pincode: cls?.pincode ?? "",
      email: Email.toObj(cls?.email),
    };
    return obj;
  }
}

export const hackid = (number) => {
  let hash = nanoid();
  if (hash.length < number) {
    hash = hash.repeat(Math.ceil(number / hash.length));
  }
  return hash.substring(0, number);
};
