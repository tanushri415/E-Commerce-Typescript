import { useParams } from 'react-router-dom';
import Header from './Header';
import { useEffect, useState } from 'react';
import ProductComponent from './ProductComponent';
import { productApi } from '../api';
import { Box } from '@mui/material';
import './Product.css';
import { Product } from '../model';

const ProductDetails = () => {
  const [product, setProduct] = useState<Product>();

  const { productId } = useParams<{ productId: string | undefined }>();

  useEffect(() => {
    async function getProduct(_productId: number) {
      setProduct(await productApi.getProductByid(_productId));
    }
    if (productId !== null && productId !== undefined) getProduct(Number(productId));
  }, [productId]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
      }}>
      <Header />
      <Box
        sx={{
          backgroundColor: '#EAEDED',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '100px',
        }}>
        {product && <ProductComponent detailMode={true} key={product?.id} item={product} />}
        {/* <button className='backToProducts'>Back to Products</button> */}
      </Box>
    </Box>
  );
};

export default ProductDetails;
