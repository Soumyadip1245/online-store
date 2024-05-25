
export const storeCommands = (updateFormData, handleSubmit) => [
    {
      command: `set store name to *`,
      callback: (name) => {
        updateFormData("storeName", name);
      },
    },
    {
      command: `set store address to *`,
      callback: (address) => {
        updateFormData("storeAddress", address);
      },
    },
    {
      command: `set GST number to *`,
      callback: (gstNumber) => {
        updateFormData("gstNumber", gstNumber);
      },
    },
    {
      command: "enable Pay Now for store",
      callback: () => {
        updateFormData("isPaynow", true);
      },
    },
    {
      command: "enable Pay Later for store",
      callback: () => {
        updateFormData("isPaylater", true);
      },
    },
    {
      command: "disable Pay Now for store",
      callback: () => {
        updateFormData("isPaynow", false);
      },
    },
    {
      command: "disable Pay Later for store",
      callback: () => {
        updateFormData("isPaylater", false);
      },
    },
    {
      command: "save details",
      callback: handleSubmit,
    },
  ];
  