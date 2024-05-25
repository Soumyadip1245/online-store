
export const paymentCommands = (updateFormData, handleSubmit) => [
    {
      command: 'update bank name *',
      callback: (name) => updateFormData('bankName', name),
    },
    {
      command: 'update account number *',
      callback: (number) => updateFormData('accountNumber', number),
    },
    {
      command: 'update IFSC code *',
      callback: (code) => updateFormData('ifscCode', code),
    },
    {
      command: 'update branch *',
      callback: (branch) => updateFormData('branch', branch),
    },
    {
      command: 'update UPI link *',
      callback: (link) => updateFormData('upiLink', link),
    },
    {
      command: 'submit form',
      callback: handleSubmit,
    },
  ];
  