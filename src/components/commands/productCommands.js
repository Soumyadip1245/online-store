

export const productCommands = (updateFormData, handleSubmit,handleVoiceResponse) => [
  {                   
    command: "*",
    callback: (sellerName) => {
      handleVoiceResponse(sellerName)
    },
  },
  {
    command: `update product name *`,
    callback: (name) => {
      updateFormData("productName", name);
    },
  },
  {
    command: `update product price *`,
    callback: (price) => {
      updateFormData("productPrice", Number(price));
    },
  },
  {
    command: `update product category *`,
    callback: (category) => {
      updateFormData("productCategory", category);
    },
  },
  {
    command: "submit product",
    callback: () => {
      handleSubmit()
    },
  }
];
