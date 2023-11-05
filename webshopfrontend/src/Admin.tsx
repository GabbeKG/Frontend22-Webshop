import { Tabs, rem, Table, Button, Modal,Box, TextInput, Accordion } from '@mantine/core';
import { IconPhoto, IconMessageCircle,  } from '@tabler/icons-react';
import { Order, Product } from './App';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';




interface Props{
    products: Product[];
    orders: Order[];
    getProducts: () => void;
    getOrders: () => void;
}
export default function Admin(props:Props) {
    const iconStyle = { width: rem(12), height: rem(12) };
    const [selectedProduct, setSelectedProduct] = useState<Product>();
    const [orders, setOrders] = useState();
    const [openedAddProduct, { open: openAddProductModal, close: closeAddProductModal, toggle: toggleAddProductModal }] = useDisclosure(false);
    const [openedUpdateProduct, { open: openUpdateProductModal, close: closeUpdateProductModal, toggle: toggleUpdateProductModal }] = useDisclosure(false);
    
    const handleNewProductModal = () => {
        openAddProductModal();
    }
    const handleProductRowClick = (product: Product) => {
        setSelectedProduct(product);
        openUpdateProductModal();
    };
    const newProductForm = useForm({
        initialValues: {
            name: '',
            price: 0,
            desc: '',
            image: '',
        }
    })
    
    const productForm = useForm({
        initialValues: {
            _id: selectedProduct?._id,
            name: selectedProduct?.name,
            price: selectedProduct?.price,
            desc: selectedProduct?.desc,
            image: selectedProduct?.image,
            createdAt: selectedProduct?.createdAt,
            tags: selectedProduct?.tags,
        }
    });
    useEffect(() => {
        productForm.setValues( {
                _id: selectedProduct?._id,
                name: selectedProduct?.name,
                price: selectedProduct?.price,
                desc: selectedProduct?.desc,
                image: selectedProduct?.image,
                createdAt: selectedProduct?.createdAt,
                tags: selectedProduct?.tags,
            
        });
      }, [selectedProduct]);

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
                props.getOrders();
            console.log('Order :' + order._id + ' has been updated successfully')
            console.log(updateData.shipped);
            setOrders((prevOrders) =>
                prevOrders.map((o) =>
                    o._id === order._id ? { ...o, shipped: true } : o
                )
            );
            
        }else {
            console.error('Error updating field:', update.statusText);
        }
    } catch (error) {
        console.error('Error updating field:', error);
    }

    }
    const addProduct = async () => {
        try {
            const newProductData = {
                name: newProductForm.values.name,
                price: newProductForm.values.price,
                desc: newProductForm.values.desc,
                image: newProductForm.values.image,
                createdAt: Date.now()
            }
            const response = await fetch(`http://localhost:3000/product`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
              body: JSON.stringify(newProductData),
          });
    
          if (response.ok) {
              console.log('Product added successfully');
              props.getProducts();
            // Close the modal or perform any other actions needed
            closeAddProductModal();
          } else {
            console.error('Error adding product:', response.statusText);
          }
        } catch (error) {
            console.error('Error adding product:', error);
          }
    }
    const updateProduct = async () => {
        try {
            
          // Create an object with updated data
          const updatedData = {
            _id: productForm.values._id,
            name: productForm.values.name,
            price: productForm.values.price, // Ensure price is a number
            desc: productForm.values.desc,
            image: productForm.values.image,
            tags:  productForm.values.tags??''.split(',').map((tag) => tag.trim()).filter(Boolean)
            };
            console.log(typeof productForm.values.tags);
            
    
          // Make a PUT request to update the product
          const response = await fetch(`http://localhost:3000/product/${productForm.values._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
              body: JSON.stringify(updatedData),
          });
    
          if (response.ok) {
            console.log('Product updated successfully');
              // Close the modal or perform any other actions needed
              props.getProducts();
            close();
          } else {
            console.error('Error updating product:', response.statusText);
          }
        } catch (error) {
          console.error('Error updating product:', error);
        }
    };
    const deleteProduct = async (product: Product) => {
        console.log(product._id)
        try {
          const response = await fetch(`http://localhost:3000/product/${product._id}`, {
              method: 'DELETE',
              body: JSON.stringify({ _id:product._id }),
          });
      
          if (response.ok) {
            console.log('Product deleted successfully');
            // Update your product list by removing the deleted product
              props.getProducts();
          } else {
            console.error('Error deleting product:', response.statusText);
          }
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      };

    useEffect(() => {
        updateProduct();
        props.getOrders;
        props.getProducts;
        props.orders;
        props.products;
},[])
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
            <Table.Th>Customer Name</Table.Th>
            <Table.Th>Contact number</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Shipping adress</Table.Th>
            <Table.Th>Delivery Method</Table.Th>
            <Table.Th>Products</Table.Th>
            <Table.Th>Total Cost</Table.Th>
            <Table.Th>Paymentmethod</Table.Th>
            <Table.Th>Shipped</Table.Th>
            <Table.Th></Table.Th>
        </Table.Tr>
    )

  return (
      <Tabs color="teal" variant="pills" defaultValue="products" >          
      <Tabs.List>
        <Tabs.Tab value="products" leftSection={<IconPhoto style={iconStyle} />}>
                  Products
        </Tabs.Tab>
        <Tabs.Tab value="orders" leftSection={<IconMessageCircle style={iconStyle} />}>
          Orders
        </Tabs.Tab>
        
      </Tabs.List>

      <Tabs.Panel value="products">
        <p>Product management</p>
              <Button onClick={() => handleNewProductModal()}>Add product</Button>
              <div className='tableWrapper'>
                  
              <Table >
                  <Table.Thead>
                      
                  {pHead}
                  </Table.Thead>
                   <Table.Tbody>{props?.products?.map((p)=>(
                       
                       <Table.Tr key={p._id} >
                <Table.Td onClick={()=>handleProductRowClick(p)}><img className="listImg" src={p.image}></img></Table.Td>
      <Table.Td onClick={()=>handleProductRowClick(p)}>{p.name}</Table.Td>
      <Table.Td onClick={()=>handleProductRowClick(p)}>{p.price} SEK</Table.Td>
                           <Table.Td >
                           <Accordion>
                                      <Accordion.Item value='productList'>
                                          
                                      <Accordion.Control>
                                          <p>Description</p>
                                  </Accordion.Control>
                                      <Accordion.Panel onClick={() => handleProductRowClick(p)}>
                               {p.desc}
                                              
                                  </Accordion.Panel>
                                      </Accordion.Item>
                                  </Accordion>
                           </Table.Td>
                           <Table.Td onClick={()=>handleProductRowClick(p)}>{p.createdAt?.toString() }</Table.Td>
                           <Table.Td onClick={() => handleProductRowClick(p)}>{p.tags?.map((t) => (t + ' '))}</Table.Td>
                           <Table.Td><Button onClick={()=>deleteProduct(p)}>Delete</Button></Table.Td>
    </Table.Tr>
    ))}
    
    </Table.Tbody>
              </Table>
    </div>
              <Modal opened={openedAddProduct} onClose={closeAddProductModal} style={{ zIndex: 1500 }} size="70%">
                  <Box maw={340} mx="auto">
                      
                      <form onSubmit={newProductForm.onSubmit(addProduct)}>
                          <TextInput withAsterisk
                              label="Product name" placeholder='name'
                          {...newProductForm.getInputProps('name')}
                          />
                          <TextInput  withAsterisk
                              label="Price"
                              {...newProductForm.getInputProps('price')}
                          />
                          <TextInput withAsterisk
                              label="Description"
                              {...newProductForm.getInputProps('desc')}
                          />
                          <TextInput withAsterisk
                              label="Image URL"
                              {...newProductForm.getInputProps('image')}
                          />
                          <Button style={{margin:"2rem auto"}} type='submit' >Add Product</Button>
                      </form>
                  </Box>
              </Modal>
              <Modal opened={openedUpdateProduct} onClose={closeUpdateProductModal} style={{zIndex:500}} size="70%" title="Update product">
                  <Box maw={340} mx="auto">
                      
                  <form onSubmit={productForm.onSubmit(updateProduct)}>
                  <TextInput
          withAsterisk
                              label="Product name"
                              {...productForm.getInputProps('name')}
                              
                          />
                           <TextInput
          withAsterisk
                              label="Price"
                              {...productForm.getInputProps('price')}
                          />
                           <TextInput
          withAsterisk
                              label="Description"
                              {...productForm.getInputProps('desc')}
                          />
                           <TextInput
          withAsterisk
                              label="Image URL"
                              {...productForm.getInputProps('image')}
                          />
                          
                           <TextInput
          withAsterisk
                              label="Tags"
                              {...productForm.getInputProps('tags')}
                          />
                          <Button type='submit'>Save</Button>
     </form>
                  </Box>
     </Modal>   
      </Tabs.Panel>

      <Tabs.Panel value="orders">
              <p>Order management</p>
              <div className='tableWrapper'>
                  
              <Table><Table.Thead>
                  
                  {oHead}
              </Table.Thead>
                  <Table.Tbody>
                      {props?.orders?.map((o) => (
                          <Table.Tr key={o._id}>
                              <Table.Td>{o._id}</Table.Td>
                              <Table.Td>{`${o.cLastname}, ${o.cFirstname}` }</Table.Td>
                              <Table.Td>{"0" + o.cPhone}</Table.Td>
                              <Table.Td>{o.cEmail }</Table.Td>
                              <Table.Td>{ o.cAdress[0].street+", "+o.cAdress[0].zipcode+", "+ o.cAdress[0].city}</Table.Td>
                              <Table.Td>{o.deliveryOption}</Table.Td>
                              <Table.Td>
                                  <Accordion>
                                      <Accordion.Item value='productList'>
                                          
                                      <Accordion.Control>
                                          Product list
                                  </Accordion.Control>
                                      <Accordion.Panel>
                                              {o?.products?.map((p) => <ul><li><li>ProductID: {p._id}</li> <li>Product name: {p.name}</li><li>price: {p.price}</li></li>  </ul>)}
                                          
                                  </Accordion.Panel>
                                      </Accordion.Item>
                                  </Accordion>
                                          </Table.Td>
                              <Table.Td>{o.totalCost}</Table.Td>
                              
                              <Table.Td>{o.paymentOption }</Table.Td>
                              <Table.Td>{o.shipped? 'Shipped':'Pending' }</Table.Td>
                              <Table.Td><Button disabled={o.shipped? true:false} onClick={()=>{updateShipping(o)}}>Ship order</Button></Table.Td>
                          </Table.Tr>
                      )
                      
                      )}
                  </Table.Tbody>
              </Table>
                      </div>
              
      </Tabs.Panel>

      </Tabs>
    
  );
}