import Order from "../../../models/order"
import { Cart } from "../../../utils/utils.model"

export const prepareOrder = async (data) => {
  const order = new Order()
  order.sellerId = data.storeDetails.seller._id
  order.buyerId = data.storeDetails.buyer._id
  order.buyerName = data.buyerName
  order.buyerMobile = data.storeDetails.buyer.mobile.number
  data.cart.map((curr) => {
    const cart = new Cart()
    
    cart.productId = curr.id
    cart.productName = curr.productName
    cart.productPrice = curr.productPrice
    cart.productQuantity = curr.quantity
    order.cartItems.push(Cart.toObj(cart))
  })
  order.orderNumber = generateNumber()
  order.deliveryAddress.address = data.address
  order.deliveryAddress.flat = data.flatNumber
  order.deliveryAddress.landmark = data.landmark
  order.deliveryAddress.pincode = data.pincode
  order.isPaynow = data.paymentOption == "payNow" ? true : false
  order.instructions = data.instructions
  order.totalAmount = data.totalAmount
  if (!order.isPaynow) await order.create()
  return order
}
export const createOrder = async (order) => {
  const data = Order.toCls(order)
  data.isPaid = true
  data.isAccepted = true
  
  await data.create()
}
function generateNumber() {
  const prefix = 'ST';
  const randomNumber = Math.random().toString(36).substr(2, 5); 
  const orderNumber = `${prefix}${randomNumber}`; 
  return orderNumber;
}
