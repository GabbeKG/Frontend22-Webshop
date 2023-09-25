import { useState, useContext, useEffect } from "react";
import {Grid} from '@mantine/core';
import { Product } from "./App";
interface Props{
    products: Product[];

}

export default function ProductView(products:Props){


    return(
        <>
        <Grid columns={24}>
            <Grid.Col span={12}>
                <img src={products.products[0].image}></img>
            </Grid.Col>
        </Grid>
        </>
    )
}