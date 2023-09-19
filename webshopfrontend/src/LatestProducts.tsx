import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { rem } from '@mantine/core';
import { Product } from "./App";

interface Props{
    products: Product[];

}

export default function GetLatestProducts(props:Props){
    return(
        <div>
            <h2>Latest Products!</h2>
            
            
            <Carousel height={200}
            nextControlIcon={<IconArrowRight style={{ width: rem(16), height: rem(16) }} />}
            previousControlIcon={<IconArrowLeft style={{ width: rem(16), height: rem(16) }} />}
            withIndicators
            className='indicator'
            >
                {props.products.slice(-5).map((p)=>(

                    <Carousel.Slide>
                        <Card shadow="sm"  radius="md" >
      <Card.Section component="a" href="https://mantine.dev/">
        <Image
          src={p.image}
          height={160}
          alt="Norway"
          /><br/>
          {p.name} {p.price} SEK<br/>
          <Button>Order Now!</Button>
      </Card.Section>
        </Card>
          </Carousel.Slide>
                        ))}
                    </Carousel>
            
    
        </div>
    )
    }