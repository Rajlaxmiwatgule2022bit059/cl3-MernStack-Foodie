import React from 'react';
import { useCart, useCartDispatch } from '../components/ContextReducer'; 
import { FaTrashAlt } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart: cartData } = useCart(); // Get cart data from context
  const dispatch = useCartDispatch(); // Dispatch actions
  const navigate = useNavigate(); // For navigation

  console.log("Cart Data:", cartData); // Debugging log

  // Handle item removal from the cart
  const handleDelete = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  // Function to calculate total cart price
  const calculateTotal = () => {
    return cartData.reduce((acc, item) => acc + parseFloat(item.price), 0);
  };

  const total = calculateTotal();
  const gst = total * 0.18; // 18% GST
  const discount = total * 0.20; // 20% discount
  const grandTotal = total + gst - discount;

  // Function to handle order placement
  const handleOrder = () => {
    console.log("Placing Order..."); // Debugging log
    const orderDate = new Date().toLocaleDateString(); // Get today's date
    const arrivalTime = '12:00 PM'; // Fixed arrival time

    // Map cart data to order details
    const orderDetails = cartData.map(item => ({
      name: item.name,
      qty: item.qty,
      size: item.size,
      sizeType: item.sizeType,
      price: item.price,
    }));

    // Create the order object
    const order = {
      orderDate,
      orderDetails,
      arrivalTime,
    };

    console.log("Order Object:", order); // Debugging log

    // Save order in localStorage
    const previousOrders = JSON.parse(localStorage.getItem('myOrders')) || [];
    previousOrders.push(order); // Append new order
    localStorage.setItem('myOrders', JSON.stringify(previousOrders));

    // Clear the cart after order
    dispatch({ type: 'CLEAR_CART' });

    // Redirect to the My Orders page
    navigate('/my-orders');
  };

  return (
    <div className="bg-dark text-white">
      <div className="container m-auto mt-5 table-responsive">
        <table className="table table-hover text-white">
          <thead className="bg-darkblue text-light fs-4">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Option</th>
              <th>Amount</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartData.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">Your cart is empty</td>
              </tr>
            ) : (
              cartData.map((food, index) => (
                <tr key={food.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{food.name}</td>
                  <td>{food.qty}</td>
                  <td>{food.size} ({food.sizeType})</td>
                  <td>₹{food.price}/-</td>
                  <td>
                    <button className="btn p-0 text-danger" onClick={() => handleDelete(food.id)}>
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {cartData.length > 0 && (
          <div className="mt-4">
            <h5>Total: ₹{total.toFixed(2)}</h5>
            <h6>GST (18%): ₹{gst.toFixed(2)}</h6>
            <h6>Discount (20%): -₹{discount.toFixed(2)}</h6>
            <h4 className="text-success">Grand Total: ₹{grandTotal.toFixed(2)}</h4>
            <button onClick={handleOrder} className="btn btn-success mt-3">
              Order Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
