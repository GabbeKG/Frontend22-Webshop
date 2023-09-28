import { Tabs, rem, Table, Button } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import { Order, Product } from './App';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

interface Props{
    products: Product[];
    orders: Order[];
}
export default function Admin(props:Props) {
    const iconStyle = { width: rem(12), height: rem(12) };
    const [opened, {open, close}] =useDisclosure(false);
    const [selectedProduct, setSelectedProduct] = useState<Product>();
    const [selectedOrder, setSelectedOrder] = useState<Order>();
    const handleProductRowClick = (product: Product) => {
        setSelectedProduct(product);
        open();
    };
    const updateShipping = async (order:Order) => {
        console.log(order);
        console.log(order.products);
       
            
            const updateData = {
                _id:order._id,
                shipped:true,
            }
        try {
        const update = await fetch(`http://localhost:3000/order/${order._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData)
        });
        if (update.ok) {
            console.log('Order :' + order._id + ' has been updated successfully')
            console.log(updateData.shipped);
            
        }else {
            console.error('Error updating field:', update.statusText);
        }
    } catch (error) {
        console.error('Error updating field:', error);
    }

}



const pHead=(
    <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Product name</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Created At</Table.Th>
            <Table.Th>Tags</Table.Th>
        </Table.Tr>
    )
    const oHead = (
        <Table.Tr>
            <Table.Th>OrderId</Table.Th>
            <Table.Th>Shipped</Table.Th>
            <Table.Th></Table.Th>
        </Table.Tr>
    )

  return (
      <Tabs color="teal" variant="pills" defaultValue="gallery">          
      <Tabs.List>
        <Tabs.Tab value="products" leftSection={<IconPhoto style={iconStyle} />}>
                  Products
        </Tabs.Tab>
        <Tabs.Tab value="orders" leftSection={<IconMessageCircle style={iconStyle} />}>
          Orders
        </Tabs.Tab>
        
      </Tabs.List>

      <Tabs.Panel value="products">
        Product management
              <Table>
                  <Table.Thead>
                      
                  {pHead}
                  </Table.Thead>
                   <Table.Tbody>{props?.products?.map((p)=>(

                <Table.Tr key={p._id}onClick={()=>handleProductRowClick(p)}>
                <Table.Td onClick={()=>handleProductRowClick(p)}><img className="listImg" src={p.image}></img></Table.Td>
      <Table.Td onClick={()=>handleProductRowClick(p)}>{p.name}</Table.Td>
      <Table.Td onClick={()=>handleProductRowClick(p)}>{p.price} SEK</Table.Td>
                           <Table.Td>{p.desc}</Table.Td>
                           <Table.Td>{p.createdAt.toString() }</Table.Td>
                           <Table.Td>{p.tags?.map((t)=>(t+' '))}</Table.Td>
    </Table.Tr>
    ))}
    
    </Table.Tbody>
                  </Table>
      </Tabs.Panel>

      <Tabs.Panel value="orders">
              Order management
              <Table><Table.Thead>
                  
                  {oHead}
              </Table.Thead>
                  <Table.Tbody>
                      {props?.orders?.map((o) => (
                          <Table.Tr key={o._id}>
                              <Table.Td>{ o._id}</Table.Td>
                              <Table.Td>{o.shipped? 'Shipped':'Pending' }</Table.Td>
                              <Table.Td><Button disabled={o.shipped? true:false} onClick={()=>{updateShipping(o)}}>Ship order</Button></Table.Td>
                          </Table.Tr>
                      )
                          
                      )}
                  </Table.Tbody>
              </Table>
              
      </Tabs.Panel>

    </Tabs>
  );
}