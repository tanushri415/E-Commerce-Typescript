import 'bootstrap/dist/css/bootstrap.min.css';
import Container from '@mui/material/Container';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Login1 from './components/Login1';
import Register1 from './components/Register1';

const App: React.FC = () => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ backgroundColor: '#EAEDED', minHeight: '100vh' }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login1 />} />
          <Route path='/register' element={<Register1 />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default App;
