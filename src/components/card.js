import React, { useState, useEffect, useRef } from 'react';
import { useCartDispatch, useCart } from './ContextReducer';

export default function Card(props) {
  const dispatch = useCartDispatch();
  const data = useCart();
  const priceRef = useRef();

  
  const options = props.options || {};
  const priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0] || '');
  const [sizeType, setSizeType] = useState('full'); 

  useEffect(() => {
    if (priceRef.current) {
      setSize(priceRef.current.value);
    }
  }, [priceOptions]);

  const handleAddToCart = async () => {
    const price = parseInt(options[size]?.[sizeType] || 0); 
    if (price > 0) {
      await dispatch({
        type: 'ADD_TO_CART',
        payload: {
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: price * qty,
          qty,
          size,
          sizeType,
        },
      });
      console.log(data);
    } else {
      console.log('Invalid price for this item');
    }
  };

  const finalPrice = qty * parseInt(options[size]?.[sizeType] || 0); // Correct final price calculation

  return (
    <div className="card mt-3 bg-dark text-light border-secondary" style={{ width: '18rem', maxHeight: '360px' }}>
      <img
        src={props.foodItem.img}
        className="card-img-top"
        alt={props.foodItem.name}
        style={{ objectFit: 'cover', height: '180px' }}
      />
      <div className="card-body">
        <h5 className="card-title">{props.foodItem.name}</h5>

        <div className="d-flex justify-content-between align-items-center gap-2">
          <select
            className="form-select btn-success bg-dark text-light border-secondary"
            value={qty}
            onChange={(e) => setQty(parseInt(e.target.value))}
          >
            {Array.from({ length: 5 }, (_, i) => ( // Quantity from 1 to 5
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <select
            className="form-select btn-success bg-dark text-light border-secondary"
            ref={priceRef}
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            {priceOptions.map((sizeOption) => (
              <option key={sizeOption} value={sizeOption}>
                {sizeOption}
              </option>
            ))}
          </select>

          <select
            className="form-select btn-success bg-dark text-light border-secondary"
            value={sizeType}
            onChange={(e) => setSizeType(e.target.value)}
          >
            <option value="full">Full</option>
            <option value="half">Half</option>
          </select>

          <div className="fs-6" style={{ width: '40%' }}>
            ₹{finalPrice}/-
          </div>
        </div>

        <hr />
        <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
