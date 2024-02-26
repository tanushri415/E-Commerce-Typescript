import React, { useEffect, useState } from 'react';
import { Order } from '../model';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { productApi } from '../api';

interface Props {
  order: Order;
}

const OrderComponent: React.FC<Props> = ({ order }) => {
  const [data, setData] = useState<Order>();
  useEffect(() => {
    Promise.all(order?.products?.map((cartItem) => productApi.getProductByid(cartItem.productId)))
      .then((products) => {
        const cartVar = { ...order };
        cartVar.products = [];
        order?.products?.map((cartItem, cartItemIndex) => {
          const productFound = products.filter((product) => product.id === cartItem.productId)[0];
          cartVar.products[cartItemIndex] = {
            ...cartItem,
            product: { ...productFound },
          };
        });
        setData(cartVar);
      })
      .catch(console.error);
  }, [order]);
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ fontWeight: 'bold' }}>
        Order Placed -{' '}
        {new Date(order?.date).toLocaleDateString(undefined, {
          dateStyle: 'long',
        })}{' '}
        -{' $'}
        {data?.products?.reduce((total, cartItem) => total + cartItem.product?.price * cartItem.quantity, 0)}
      </AccordionSummary>
      <AccordionDetails>
        {data?.products?.map((cartItem) => (
          <Box key={cartItem.productId} sx={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
            <a href={`/product/${cartItem.productId}`} aria-label={cartItem.productId.toString()}>
              <Box
                component='img'
                src={cartItem.product.image}
                sx={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: '90px',
                  height: '90px',
                  display: 'inherit',
                }}></Box>
            </a>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
              }}>
              <Typography variant='h6'>{cartItem.product.title}</Typography>
              <Typography variant='body2'>{cartItem.product.description}</Typography>
              <Typography variant='caption'>Quantity: {cartItem.quantity}</Typography>
              <Typography variant='caption'>Price: ${cartItem.product.price}</Typography>
            </Box>
          </Box>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default OrderComponent;
