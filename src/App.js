import './App.css';
import Home from './screens/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Cart from './screens/cart'; 
import MyOrders from './screens/MyOrders';


import '../node_modules/bootstrap-dark-5/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { CartProvider } from './components/ContextReducer';


function App() {
  return (

    <CartProvider>
    <Router>
      {/* Apply Bootstrap dark theme styles globally */}
      <div className="bg-dark text-light min-vh-100">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/cart" element={<Cart />} /> 
          <Route path="/my-orders" element={<MyOrders />} />
          
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
