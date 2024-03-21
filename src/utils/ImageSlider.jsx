import React from "react";
import SimpleImageSlider from "react-simple-image-slider";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import Customers from "../components/assests/customers.png";
import Orders from "../components/assests/orders.png";
import Products from "../components/assests/products.png";
import Rentals from "../components/assests/rentals.png";
import Stores from "../components/assests/stores.png";
import Transaction from "../components/assests/transactions.png";
const ImageSlider = () => {
  const images = [
    { url: Customers },
    { url: Orders },
    { url: Products },
    { url: Rentals },
    { url: Stores },
  ];
  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <Carousel
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={5000}
      >
        
        {images.map((image, index) => (
          <div key={index} style={{ width: '100%', height: '100vh' }}>
            <img
              src={image.url}
              alt={`Slide ${index + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageSlider;
