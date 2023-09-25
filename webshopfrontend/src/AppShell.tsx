import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Group, Skeleton, Text, Button, Popover } from '@mantine/core';
import '@mantine/core/styles.css'
import { Header } from './Header';
import{FiShoppingCart} from 'react-icons/fi';
import GetLatestProducts from './LatestProducts';
import { useContext, useEffect,useState } from 'react';
import { Product } from './App';
import {CartContext} from './CartContext';
import GetProducts from './GetProducts';
import Catbox from '../public/Web/icons8-animal-creatype-flat-32.png';
import { BrowserRouter as Router,Route,Link,Routes } from 'react-router-dom';
import { Checkout } from './Checkout';
import CatLogo from '../public/icons8-cat-64.png';



export function CollapseDesktop() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [products, setProducts ]= useState<Product[]>([]);

  const [opened, { toggle }] = useDisclosure(false);
    const { cart, toggleCart, isCartOpen, totalCost } = useContext(CartContext);

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
    <Router>

    <AppShell
      header={{ height: 60 }}
      navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
      >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
          <img src={CatLogo} style={{paddingLeft:'5rem', height: '62px', width:'auto'}}></img>
          <h2>iFits E-shop</h2>
        
        </Group>
      </AppShell.Header>
      <AppShell.Navbar id={'navbar'} p="xl">
      <Popover width={200} position="bottom" withArrow shadow="md" clickOutsideEvents={['mouseup', 'touchend']}>
      <Popover.Target>
          <Button id={"cartBtn"} leftSection={<img id={'logo'} style={{height: '32px', width:'auto'}} src={Catbox}></img>}  onClick={toggleCart}> {isCartOpen ? "Close Cart" : "View Cart"} {totalCost()} SEK </Button>
          </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">This is uncontrolled popover, it is opened when button is clicked</Text>
      </Popover.Dropdown>
    </Popover>
    <div id={'navlist'} style={{display:'flex', flexDirection:'column'}}>

        Navbar
        <Text component={Link} variant='link' to='/'>Home</Text>
        <Text component={Link} variant='link' to='/products'>Products</Text>
        <Text  component={Link} variant='link' to='/latest'>Latest</Text>
        <Text component={Link} variant='link' to='/checkout'>Checkout</Text>
    </div>
        
      </AppShell.Navbar>
      <AppShell.Main style={{width:'1280px', margin:'0 auto'}}>
      <Routes>
        <Route path='/' element=""></Route>
        <Route path='/products' element={<GetProducts products={products}/>}></Route>
        <Route path='/latest' element={<GetLatestProducts products={products}/>}></Route>
        <Route path='/checkout' element={<Checkout/>}></Route>
        
      </Routes>
    </AppShell.Main>

    </AppShell>
        </Router>
  );
}