import { Client, Functions } from "appwrite";
export const pay = async (tr, by, success, failure, account_id = null) => {
  const payload = {
    amount: Math.ceil(tr.amount),
    tr_amount: Math.ceil(tr.amount),
    receipt: by.contact,
    account_id: account_id,
  };
  const rzpyOrder = await createOrder(payload);
  
  const core_options = {
    key: process.env.REACT_APP_RAZORPAY_KEY_ID,
    currency: "INR",
    handler: (response) => {
      success()
    },
    theme: {
      "color": "#000000",
    },
    config: {
      display: {
        hide: [
          {
            method: "wallet",
          },
          {
            method: "paylater",
          },
        ],
        preferences: {
          show_default_blocks: true,
        },
      },
    },
  };
  core_options.order_id = rzpyOrder.id
  const options = {
    modal: { escape: false, ondismiss: function(){
      failure()
     }},
    ...core_options,
    ...tr,
    prefill: {
      name: by.name,
      email: by.email,
      contact: by.contact,
    },
    notes: {
      address: by.address,

    },
  }
  const rzp1 = new window.Razorpay(options);
  rzp1.on('payment.failed', (response) => {
    failure()
  });
  rzp1.open()
  return rzp1
};
export const createOrder = async (payload) => {
  const client = new Client()
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT)
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT);

const functions = new Functions(client)

try {
  const execution = await functions.createExecution(
      '659d24451959c708c491',
      JSON.stringify(payload),
  )
  return JSON.parse(execution.responseBody).data
} catch (err) {
  console.error(err.message)
}
};
