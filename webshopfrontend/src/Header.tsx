import { useContext, useState } from 'react';
import { Container, Group, Burger, Badge,Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderSimple.module.css';
import '@mantine/core/styles.css';
import{FiShoppingCart} from 'react-icons/fi';
import {CartContext} from './CartContext';
import Cart from './Cart';
import {
  Link,
  Route,
  Routes,
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Router,
} from "react-router-dom";
import GetLatestProducts from './LatestProducts';
import App from './App';
import { Checkout } from './Checkout';

const links = [
    { link:'/', label: 'Home'},
    { link: '/GetLatestProducts', label: 'Latest' },
    { link: 'Products', label: 'Products' },
    { link: '/my-order', label: 'My order' },
    {link:'/Checkout', label:'Checkout'}
  ];

  export function Header() {
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);
    const { cart, toggleCart, isCartOpen, totalCost } = useContext(CartContext);
    
  
    return (
      
      <header className={classes.header}>
      
        <Container size="md" className={classes.inner}>
          
          <Group gap={8} visibleFrom="xs">

            {links.map((link)=>(
              <Link
              key={link.label}
              to={link.link}
              className={classes.link}
              data-active={active === link.link || undefined}
              onClick={(event) => {
                event.preventDefault();
                setActive(link.link);
              }}
              >
              {link.label}
            </Link>
            ))}
            <Button leftSection={<FiShoppingCart/>} onClick={toggleCart}> {isCartOpen ? "Close Cart" : "View Cart"} {totalCost()} SEK </Button>
          </Group>
  
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        </Container>
      
            <Routes>
              
              <Route path='./GetLatestProducts' element={<GetLatestProducts products={[]}/>}/>
              <Route path='./Checkout' element={<Checkout/>}/>
            </Routes>
      
      </header>
      
    );
  }