import 'bootstrap/dist/css/bootstrap.min.css';
import Container from '@mui/material/Container';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ProductDetails from './components/ProductDetails';
import Orders from './components/Orders';
import { CartProvider } from './components/context/cart';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';

const App: React.FC = () => {
  return (
    <Container maxWidth={false} disableGutters sx={{ backgroundColor: '#EAEDED', minHeight: '100vh' }}>
      <BrowserRouter>
        <CartProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/product/:productId' element={<ProductDetails />} />
            <Route path='/cart' element={<ShoppingCart />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/checkout' element={<Checkout />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </Container>
  );
};

export default App;
