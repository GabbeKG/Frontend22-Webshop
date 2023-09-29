import { ReactNode, createContext,useState } from "react";
import { Product } from "./App";

export interface CartProduct extends Product{
    quantity:number;
}

export interface ContextValue{
    cart: CartProduct[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  toggleCart: () => void;
  isCartOpen: boolean;
  totalCost:()=>number;
  totalProducts: () => number;
  reduceOneFromCart: (product: Product) => void;
  emptyCart: () => void;
}
export const CartContext = createContext<ContextValue>({
    cart:[],
    addToCart:()=>{},
    removeFromCart:()=>{},
    toggleCart:()=>{},
    isCartOpen:false,
    totalCost:()=>0,
  totalProducts: () => 0,
  reduceOneFromCart: () => { },
  emptyCart: () => {},
});

interface Props{
    children: ReactNode;
}
export default function CartProvider({ children }: Props) {
    const [cart, setCart] = useState<CartProduct[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
  
    const toggleCart = () => {
      setIsCartOpen(!isCartOpen);
    };
  
    const addToCart = (product: Product) => {
      //setCart((prevState) => [...prevState, product]);
      const productInCart = cart.find(
        (cartProduct) => cartProduct._id === product._id
      );
      if (productInCart) {
        const updatedCart = cart.map((cartProduct) => {
          if (cartProduct._id === product._id) {
            return { ...cartProduct, quantity: cartProduct.quantity+1 };
          } else {
            return cartProduct;
          }
        });
        console.log(updatedCart);
        setCart(updatedCart);
      } else {
        const updatedCart = [...cart, { ...product, quantity: 1 }];
        setCart(updatedCart);
      }
  };
  const reduceOneFromCart = (product: Product) => {
    const productInCart =cart.find(
      (cartProduct) => cartProduct._id === product._id && cartProduct.quantity!==1);
    if (productInCart) {
      const updatedCart = cart.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return { ...cartProduct, quantity: cartProduct.quantity - 1 }
        } else {
          return cartProduct;
        }
      });
      setCart(updatedCart)
    }else {
      const updatedCart = cart.filter((p) => p._id !== product._id);
      setCart(updatedCart);
      
    }
  }
  
    const removeFromCart = (productId: string) => {
      const updatedCart = cart.filter((product) => product._id !== productId);
      setCart(updatedCart);
    };
    const totalCost=()=>{
      let total=0;
      cart.forEach((product)=>{
          const subtotal=product.price*product.quantity;
          total+= subtotal;
      })
      return total;
  };
  const emptyCart = () => {
    setCart([]);
  }
  const totalProducts=()=>{
    let total=0;
    cart.forEach((products)=>{
      total+=products.quantity
    })
    return total;
  }
    return (
      <CartContext.Provider
        value={{ cart, addToCart,reduceOneFromCart, removeFromCart, isCartOpen, toggleCart, totalCost, totalProducts,emptyCart }}
      >
        {children}
      </CartContext.Provider>
    );
  }