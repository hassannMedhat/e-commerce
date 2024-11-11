import { Link, Route, Routes } from 'react-router-dom';
import DashboardOrders from './DashboardOrders';
import DashAddProduct from './DashAddProduct';
import DashboardUsers from './DashboardUsers';
import DashboardStock from './DashboardStock';



const Dashboard = () => {
  return (
    <div className="flex">
      <div className="w-64 bg-gray-800 min-h-screen p-4">
        <h2 className="text-white text-xl font-semibold mb-4">Dashboard</h2>
        <ul>
          <li><Link to="/dashboard/orders" className="text-gray-300 hover:text-white block py-2">Orders</Link></li>
          <li><Link to="/dashboard/products" className="text-gray-300 hover:text-white block py-2">Products</Link></li>
          <li><Link to="/dashboard/add-product" className="text-gray-300 hover:text-white block py-2">Add Product</Link></li>
          <li><Link to="/dashboard/users" className="text-gray-300 hover:text-white block py-2">Manage Users</Link></li>
          <li><Link to="/dashboard/stock" className="text-gray-300 hover:text-white block py-2">Stock</Link></li>
        </ul>
      </div>

      <div className="flex-1 p-8">
        <Routes>
          <Route path="orders" element={<DashboardOrders />} />
          <Route path="add-product" element={<DashAddProduct />} />
          <Route path="users" element={<DashboardUsers />} />
          <Route path="stock" element={<DashboardStock />} />
          <Route index element={<DashboardOverview />} />
        </Routes>
      </div>
    </div>
  );
};

const DashboardOverview = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard</h1>
      <p>Select an option from the sidebar to manage your store.</p>
    </div>
  );
};

export default Dashboard;
