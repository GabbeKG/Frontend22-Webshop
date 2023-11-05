import { Carousel } from '@mantine/carousel';
import { Card, Image, Text, Button } from '@mantine/core';
import '@mantine/carousel/styles.css';
import { Product } from "./App";
import './HeaderSimple.module.css';
import './mantine_custom.css';
import {useContext} from 'react';
import {CartContext} from './CartContext';

interface Props{
    products: Product[];

}

export default function GetLatestProducts(props:Props){
    const {addToCart,isCartOpen}=useContext(CartContext);
    return(
        <div className='latest'>
            <h2>Latest Products!</h2>
            
            <div style={{ height: 450, }}>
            <Carousel height={400} style={{flex:1}}            
            withIndicators            
            className='indicator'
            slideGap={{ xs: 'xs', sm: 'xs', md: 'lg' }}
            slideSize={{ base: '100%', sm: '50%', md: "33%"}}
            controlSize={50}
            loop
            >
                {props.products.slice(-5).map((p)=>(

                    <Carousel.Slide key={p._id}>
                        <Card shadow="md" padding="lg" radius="md"  key={p._id} withBorder>
                            <Card.Section component="a" /*href="https://mantine.dev/"*/>
                                <Image
                                    src={p.image}
                                    
                                    style={{margin:"15px auto",height:"260px", width:"auto" }}
                                    key={p._id}
                                />
                                
                            </Card.Section>
                                  <Text>

                                    {p.name} 
                                  </Text>
                                    <Text>

                                    {p.price} SEK
                                    </Text>
                                
                                <Button onClick={()=>addToCart(p)}>Order Now!</Button>
                        </Card>
                    </Carousel.Slide>
                        ))}
            </Carousel>
            </div>
    
        </div>
    )
    }