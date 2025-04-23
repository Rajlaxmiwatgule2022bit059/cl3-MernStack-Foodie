import React from 'react';

export default function MyOrders() {
  const orders = JSON.parse(localStorage.getItem("myOrders")) || [];

  return (
    <div className="container text-white mt-5">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div>
          {/* Using forEach instead of map */}
          {orders.map((order, index) => (
            <div key={index} className="card bg-dark text-white mb-3 p-3">
              <h5>Order Date: {order.orderDate}</h5>
              {/* Check if orderDetails exists and is an array */}
              {order.orderDetails && Array.isArray(order.orderDetails) && order.orderDetails.length > 0 ? (
                order.orderDetails.map((item, idx) => (
                  <div key={idx}>
                    <h6>{item.name} ({item.size} - {item.sizeType})</h6>
                    <p>Qty: {item.qty}</p>
                    <p>Price: ₹{item.price * item.qty}</p>
                  </div>
                ))
              ) : (
                <p>No order details available</p>
              )}
              <p>Arrival Time: {order.arrivalTime}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
