import 'bootstrap/dist/css/bootstrap.min.css';
import Container from '@mui/material/Container';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ProductDetails from './components/ProductDetails';
import Orders from './components/Orders';

const App: React.FC = () => {
  return (
    <Container maxWidth={false} disableGutters sx={{ backgroundColor: '#EAEDED', minHeight: '100vh' }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/product/:productId' element={<ProductDetails />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default App;
