import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Cart from '../screens/cart';
import { useCart } from '../components/ContextReducer';




export default function Navbar() {
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();
  const { cart } = useCart();
  const authToken = localStorage.getItem('authToken');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate("/login");
  };
  const toggleCart = () => {
    setShowCart(!showCart);  // Toggle the visibility of the cart
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">

      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="/">FOOD-PARADISE</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
            </li>
            {authToken && (
              <li className="nav-item">
                <Link className="nav-link active fs-5" to="/my-orders">My Orders</Link>
              </li>
            )}
          </ul>

          <div className="d-flex ms-auto">
            {!authToken ? (
              <>
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/signup">SignUp</Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/cart')}
                  className="btn bg-white text-success mx-2"
                >
                  My Cart {" "}
                  <Badge pill bg="danger">{cart.length}</Badge>
                </button>
                <button onClick={handleLogout} className="btn bg-white text-success mx-2">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Show Cart when visible */}
      {showCart && <Cart />}
    </nav>
  );
}
