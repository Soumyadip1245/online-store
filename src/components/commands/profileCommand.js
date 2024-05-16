const voiceCommands = (speakMessage, updateFormData, handleSubmit) => [
    {                   
      command: "set seller name to *",
      callback: (sellerName) => {
        speakMessage(`Setting seller name to ${sellerName}`);
        updateFormData("sellerName", sellerName);
      },
    },
    {
      command: "set address to *",
      callback: (address) => {
        speakMessage(`Setting address to ${address}`);
        updateFormData("address", address);
      },
    },
    {
      command: "set city to *",
      callback: (city) => {
        speakMessage(`Setting city to ${city}`);
        updateFormData("city", city);
      },
    },
    {
      command: "set state to *",
      callback: (state) => {
        speakMessage(`Setting state to ${state}`);
        updateFormData("state", state);
      },
    },
    {
      command: "set pin code *",
      callback: (pincode) => {
        speakMessage(`Setting pincode to ${pincode}`);
        updateFormData("pincode", pincode);
      },
    },
    {
      command: "save profile",
      callback: () => {
        handleSubmit()
      },
    },
  ];
  export default voiceCommands;