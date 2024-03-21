const sendMailer = async ()=>{
    await sendMail("bahubalicantlive@gmail.com","Ok","<p>Hello</p>")
  }
  const functionTesting = async () => {
    const handlePaymentSuccess = () => {
      
    };

    const handlePaymentFailure = () => {
      
    };

    const payerInfo = {
      name: "John Doe",
      email: "john.doe@example.com",
      contact: "1234567890",
      address: "123 Main St, City, Country",
    };

    const paymentInfo = {
      amount: 100,
      name: "Product Name",
      description: "Product Description",
      image: "https://example.com/product-image.jpg",
    };
    await pay(
      paymentInfo,
      payerInfo,
      handlePaymentSuccess,
      handlePaymentFailure
    );
  };