import { useState, useEffect } from 'react'
import {  MantineProvider, createTheme } from '@mantine/core';
import './App.css'
import './mantine_custom.css'

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
  cFirstname: string,
  cLastname: string,
  cEmail: string,
  cPhone:number,
    cAdress: [{
        street: string,
        city: string,
        zipcode:number
    }],
  products: [{
    name: string,
    price: number,
    _id:string
    }],
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
const theme = createTheme({
  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  },
});
function App() {
  
  
  return (
    <>
    <MantineProvider theme={theme}>
    <CollapseDesktop/>
    </MantineProvider>
   
    </>
  )
}

export default App
