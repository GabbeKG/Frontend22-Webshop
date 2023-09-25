import {useContext} from 'react';
import { CartContext } from './CartContext';


export default function Cart(){
    const {cart, removeFromCart, totalCost}= useContext(CartContext);
    

    <div style={{ position: "fixed", top: "6rem", right: "2rem" }}>
    
    {cart.map((product, index) => (
      <div key={index}>
        <p>
          {product.quantity} st {product.name} á {product.price} SEK
        </p>
        <button onClick={() => removeFromCart(product._id)}>Remove</button>
      </div>
    ))}
    <h4>Total Cost: {totalCost()} SEK</h4>
  </div>
}