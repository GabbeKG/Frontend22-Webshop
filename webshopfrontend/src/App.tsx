import { useState, useEffect } from 'react'
import {  MantineProvider } from '@mantine/core';
import './App.css'

import { CollapseDesktop } from './AppShell';

export interface NewProduct{
  name: string;
  price:number;
  desc:string;
  image:string;
  createdAt:Date;
  tags?:[];
}
export interface AllOrders{
  fName: string,
    lName: string,
    adress: [{
        street: string,
        city: string,
        zipcode:number
    }],
    products: [],
    totalCost: number,
    deliveryOption: string,
    freeShipping: boolean,
    shipped: boolean,
    paymentOption:string
}
export interface Order extends AllOrders{
  _id: string;
}
export interface Product extends NewProduct{
  _id:string;
}
function App() {
  
  
  return (
    <>
    <MantineProvider>
    <CollapseDesktop/>
    </MantineProvider>
   
    </>
  )
}

export default App
