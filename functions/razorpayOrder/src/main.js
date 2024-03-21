import Razorpay from "razorpay";

export default async ({ req, res, log, error }) => {
  const jsonBody = JSON.parse(req.body)
  const rzpy = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
  });
  
  const TRANSFERS = jsonBody.account_id == null ? [] : [{
    account: jsonBody.account_id,
    amount: jsonBody.tr_amount,
    currency: "INR",
  }];

  const options = {
    amount: jsonBody.amount,
    currency: "INR",
    receipt: jsonBody.receipt,
    transfers: TRANSFERS,
  };

  const createOrder = () => {
    return new Promise((resolve, reject) => {
      rzpy.orders.create(options, (err, order) => {
        if (order) {
          resolve(order);
        } else {
          reject("No Order");
        }
      });
    });
  };
  try {
    const order = await createOrder();
    return res.json({ data: order });
  } catch (error) {
    return res.json({ data: error });
  }
};
