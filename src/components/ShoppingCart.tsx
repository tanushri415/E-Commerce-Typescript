import { Box, Button, Stack, Typography } from '@mui/material';
import Header from './Header';
import { useContext } from 'react';
import ShoppingCartItem from './ShoppingCartItem';
import DeleteIcon from '@mui/icons-material/Delete';
import OrderSummary from './OrderSummary';
import SupportedPayments from './SupportedPayments';
import { CartContext, CartContextType } from './context/cart';

const ShoppingCart = () => {
  const { cartItems, clearCart } = useContext(CartContext) as CartContextType;
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
          marginLeft: '50px',
          marginRight: '50px',
          marginBottom: '15px',
          marginTop: '100px',
        }}>
        <Typography variant='h4' align='center' gutterBottom>
          My Shopping Cart
        </Typography>
        {cartItems?.length > 0 ? (
          <>
            <Button endIcon={<DeleteIcon />} onClick={() => clearCart()}>
              Clear Cart
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginRight: '50px',
                  gap: '25px',
                  width: '66.66%',
                }}>
                {cartItems?.map((cartItem) => (
                  <ShoppingCartItem key={cartItem.productId} cartItem={cartItem} />
                ))}
              </Box>
              <Stack sx={{ gap: '15px', width: '33.34%', maxWidth: '450px' }}>
                <OrderSummary showChkoutBtn={true} />
                <SupportedPayments />
              </Stack>
            </Box>
          </>
        ) : (
          <Typography variant='h6' align='left' gutterBottom>
            Your Shopping Cart is empty
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ShoppingCart;
