import { BrowserRouter,Routes,Route,Router } from 'react-router-dom';
import './App.css';
import RegisterCustomer from './Pages/RegisterCustomer';
import RegisterFarmer from './Pages/RegisterFarmer';
import Login from './Pages/Login';
import DashboardOverview from './Pages/farmer/DashboardOverview';
import AddProduct from './Pages/farmer/AddProduct';
import ManageProducts from './Pages/farmer/ManageProducts';
import EditProduct from './Pages/farmer/EditProduct';
import ViewOrders from './Pages/farmer/ViewOrders';
import Earnings from './Pages/farmer/Earnings';
import AdminLogin from './Pages/AdminLogin';
import AdminDashboard from './Pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Pages */}
        <Route path="/register-customer" element={<RegisterCustomer />} />
        <Route path="/register-farmer" element={<RegisterFarmer />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/login" element={<Login />} /> */}

        {/* Farmer Dashboard */}
        <Route path="/farmer/dashboard" element={<DashboardOverview />} />
        <Route path="/farmer/add-product" element={<AddProduct />} />
        <Route path="/farmer/manage-products" element={<ManageProducts />} />
        <Route path="/farmer/edit-product/:productId" element={<EditProduct />} />
        <Route path="/farmer/view-orders" element={<ViewOrders />} />
        <Route path="/farmer/earnings" element={<Earnings />} />

        {/* Customer Dashboard */}
        {/* <Route path="/customer/home" element={<CustomerHome />} /> */}

        {/* Admin Dashboard */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Customer Dashboard */}
        {/* <Route path="/customer/home" element={<CustomerHome />} /> */}

        {/* Delivery - You'll add these later */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
