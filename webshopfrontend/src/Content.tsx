import GetProducts from "./GetProducts";
import { Product } from "./App";
import { useEffect, useState } from "react";
import GetLatestProducts from "./LatestProducts";
export function Content(){
      
  const [products, setProducts ]= useState<Product[]>([]);

  const getProducts=()=>{
    fetch("http://localhost:3000/product/")
      .then((res)=>res.json())
      .then((data: Product[])=>{
        setProducts(data);
      })
      .catch((error)=>{
        console.log(error);
        throw new Error("Couldn't get products :(");

        
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

    return(
        <>
        <GetLatestProducts products={products}/>
    <GetProducts products={products}/>
    </>
)
}