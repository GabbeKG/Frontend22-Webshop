import { ReactNode, createContext, useState } from "react";

export interface OrderValue{
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