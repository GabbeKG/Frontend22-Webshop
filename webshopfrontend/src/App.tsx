import { useState, useEffect } from 'react'
import { AppShell, MantineProvider } from '@mantine/core';
import './App.css'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import GetProducts from './GetProducts';
import GetLatestProducts from './LatestProducts';
import { Header } from './Header';
import {Checkout} from './Checkout';
import { CollapseDesktop } from './AppShell';

export interface NewProduct{
  name: string;
  price:number;
  desc:string;
  image:string;
  createdAt:Date;
  tags?:[];
}
export interface Product extends NewProduct{
  _id:string;
}
function App() {
  
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

  return (
    <>
    <MantineProvider>
    <CollapseDesktop/>
    </MantineProvider>
   
    </>
  )
}

export default App
