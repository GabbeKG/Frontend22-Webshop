import { Product } from "./App";
import {useContext, useState} from "react";
import { CartContext } from "./CartContext";
import { useDisclosure } from '@mantine/hooks';
import {Button,Text, Grid, Pill, Table, Modal} from '@mantine/core';
import Cart from "./Cart";
import ProductView from "./ProductView";

interface Props{
    products: Product[];

}

export default function GetProducts(props:Props){
    const {addToCart,isCartOpen}=useContext(CartContext);
    const tHead=(
        <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Product name</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th></Table.Th>
        </Table.Tr>
    )
    const [opened, {open, close}] =useDisclosure(false);
    const [selectedProduct, setSelectedProduct] = useState<Product>();
    const handleRowClick = (product: Product) => {
        setSelectedProduct(product);
        open();
      };

    
    
return(
    <div id="Products">
        
            <h2>Our products</h2>
        <Table>
            <Table.Thead>{tHead}</Table.Thead>
            <Table.Tbody>{props.products.map((p)=>(

                <Table.Tr key={p._id}>
                <Table.Td onClick={()=>handleRowClick(p)}><img className="listImg" src={p.image}></img></Table.Td>
      <Table.Td onClick={()=>handleRowClick(p)}>{p.name}</Table.Td>
      <Table.Td onClick={()=>handleRowClick(p)}>{p.price} SEK</Table.Td>
      <Table.Td><Button onClick={()=>addToCart(p)}>Add to Cart</Button></Table.Td>
    </Table.Tr>
    ))}
    
    </Table.Tbody>
        </Table>
       
           <Modal opened={opened} onClose={close} style={{zIndex:500}} size="70%">
            <div>

            <Grid columns={20} style={{display:'flex'}}>
            <Grid.Col offset={1} span={6}>
                <img style={{height:'380px', width:'auto', margin:'0 auto'}} src={selectedProduct?.image}></img>
            </Grid.Col>
            <Grid.Col offset={4} span={5}>

                <h2>{selectedProduct?.name}</h2>

                <p>{selectedProduct?.desc}</p>
                <div style={{margin:'5rem auto'}}>
                <p>

                <span style={{marginRight:'4rem'}}>

                {selectedProduct?.price} SEK
                </span>
                <Button onClick={()=>addToCart(selectedProduct)}>Add to Cart</Button>
                </p>
                </div>
           <span>
            {selectedProduct?.tags?.map((t)=>(
                <Pill style={{marginLeft:'0.3rem', backgroundColor:'rgb(42, 157, 165)', color:'#fff', fontSize:'14px'}}>{t}</Pill>
                ))}
                </span> 
                
            </Grid.Col>
            <Grid.Col offset={12} span={18}>

            </Grid.Col>
            <Grid.Col></Grid.Col>
            
            </Grid>
            </div>
           </Modal>         

        {isCartOpen}
    </div>
)
}