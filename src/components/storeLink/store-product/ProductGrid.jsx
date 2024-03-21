import React from 'react'
import StoreProduct from './StoreProduct';
import { Grid } from '@mui/material';
import './ProductGrid.css'
const ProductGrid = ({ products }) => {
    return (
      <div className="movie-container storelink">
           {products.map((product) => (
            <StoreProduct key={product._id} product={product} />
          ))}
      </div>
         
      );
    };
    

export default ProductGrid