import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <Container className='main-container'>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Container>
  );
}

export default App;
