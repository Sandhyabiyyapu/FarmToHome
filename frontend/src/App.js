import { BrowserRouter,Routes,Route,Router } from 'react-router-dom';
import './App.css';
import RegisterCustomer from './Pages/RegisterCustomer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Pages */}
        <Route path="/register-customer" element={<RegisterCustomer />} />
        {/* <Route path="/login" element={<Login />} /> */}

        {/* Customer Dashboard */}
        {/* <Route path="/customer/home" element={<CustomerHome />} /> */}

        {/* Farmer, Admin, Delivery - You’ll add these later */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
