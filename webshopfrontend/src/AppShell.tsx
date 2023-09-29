import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Group, Text, Button,Modal } from '@mantine/core';
import '@mantine/core/styles.css'
import GetLatestProducts from './LatestProducts';
import { useContext, useEffect,useState } from 'react';
import { Order, Product } from './App';
import {CartContext} from './CartContext';
import GetProducts from './GetProducts';
import Catbox from '/icons8-animal-creatype-flat-32.png';
import { BrowserRouter as Router,Route,Link,Routes } from 'react-router-dom';
import { Checkout } from './Checkout';
import CatLogo from '/icons8-cat-64.png';
import { Content } from './Content';
import Admin from './Admin';



export function CollapseDesktop() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

    const { cart, toggleCart, isCartOpen, totalProducts } = useContext(CartContext);
  const getOrders = () => {
    fetch("http://localhost:3000/order/")
      .then((res) => res.json())
      .then((data: Order[]) => {
        setOrders(data)
      })
      .catch((error) =>{
        console.log(error);
        throw new Error("Couldn't get any orders :(")
        })
}
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
    getOrders();
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
          <img  src={CatLogo} style={{paddingLeft:'5rem', height: '62px', width:'auto'}}></img>
          <h2>iFits E-shop</h2>
        
        </Group>
      </AppShell.Header>
      <AppShell.Navbar id={'navbar'} p="xl">
      
          <Button id={"cartBtn"} leftSection={<img id={'logo'} style={{height: '32px', width:'auto'}} src={Catbox}></img>}  onClick={toggleCart}> {isCartOpen ? "Close Cart" : "View Cart"} { cart.length>0?`(${totalProducts()})`:""}  </Button>
        
    <div id={'navlist'} style={{display:'flex', flexDirection:'column'}}>

        
        <Text component={Link} variant='link' to='/'>Home</Text>
        <Text component={Link} variant='link' to='/products'>Products</Text>
        <Text  component={Link} variant='link' to='/latest'>Latest</Text>
        <Text component={Link} variant='link' to='/checkout'>Checkout</Text>
    </div>
        
        <Button component={Link} variant='link' to='/admin'><Text >Admin</Text></Button>
        </AppShell.Navbar>
      <AppShell.Main style={{width:'1280px', margin:'0 auto'}}>
      <Routes>
        <Route path='/' element={<Content/>}></Route>
        <Route path='/products' element={<GetProducts products={products}/>}></Route>
        <Route path='/latest' element={<GetLatestProducts products={products}/>}></Route>
            <Route path='/checkout' element={<Checkout />}></Route>
            <Route path='/admin' element={<Admin products={products} orders={orders} getProducts={getProducts} getOrders={getOrders}/>}></Route>
        
      </Routes>
    </AppShell.Main>

    </AppShell>
        </Router>
  );
}