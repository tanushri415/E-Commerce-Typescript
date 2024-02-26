import { useEffect, useState } from 'react';
import Header from './Header';
import { Box, Typography } from '@mui/material';
// import Order from './Order';
import { cartApi } from '../api';
import OrderComponent from './OrderComponent';
import { Order, User } from '../model';

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const user: User = JSON.parse(window.localStorage.getItem('user') || '""');
    if (user) {
      setUser(user);
    }
  }, []);

  useEffect(() => {
    if (user) {
      cartApi
        .getUserCarts(user.id)
        .then((json) => {
          setOrders(json);
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

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
          flexDirection: 'column',
          justifyContent: 'flex-start',
          marginLeft: '50px',
          marginRight: '50px',
          gap: '25px',
          marginBottom: '15px',
          marginTop: '100px',
        }}>
        {orders?.map((order) => (
          <OrderComponent order={order} key={order.id} />
        ))}
      </Box>
      {orders?.length === 0 ? (
        <Typography variant='h6' align='left' gutterBottom>
          You do not have any previous Orders!!
        </Typography>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Orders;
