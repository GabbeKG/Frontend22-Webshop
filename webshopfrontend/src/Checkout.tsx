import { useContext, useEffect, useState } from 'react';
import {
    Stepper,
    Button,
    Group,
    TextInput,
    Box,
    Radio,
    Table,
    Accordion, 
    List,
    Title,
    Flex,
    ListItem,
    Input,
    Text
} from '@mantine/core';

import { FormProvider,useCustomerForm } from './FormContext';
import { CartContext } from './CartContext';
import Catbox from '/icons8-cat-in-a-box-96.png'





export function Checkout() {
    const { cart, totalCost,removeFromCart,addToCart,reduceOneFromCart, emptyCart } = useContext(CartContext);
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState('');
    const [accordionValue, setAccordionValue] = useState<string>('Swish')
    //TEST
    
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [orderId, setOrderId] = useState(null);
    const tHead = (
        <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Product name</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Quantity</Table.Th>
            <Table.Th>Total: { totalCost() } SEK</Table.Th>
        </Table.Tr>
    );
    const reviewCart=cart.map((p) => (
        <Table.Tr key={p._id}>
            <Table.Td><img className="listImg" src={p.image}></img></Table.Td>
            <Table.Td>{p.name}</Table.Td>
            <Table.Td >{p.price} x {p.quantity} SEK</Table.Td>
<Table.Td><Button style={{marginRight:'1rem'}} onClick={()=>reduceOneFromCart(p)}>-</Button>{p.quantity}<Button style={{marginLeft:'1rem'}} onClick={()=>addToCart(p)}>+</Button></Table.Td>
<Table.Td><Button onClick={()=>removeFromCart(p._id)}>Remove from cart</Button></Table.Td>
        </Table.Tr>
    ))
    const currCart=cart.map((p) => (
                                <Table.Tr key={p._id}>
                                    <Table.Td><img className="listImg" src={p.image}></img></Table.Td>
                                    <Table.Td>{p.name}</Table.Td>
                                    <Table.Td >{p.price} SEK</Table.Td>
            <Table.Td>{p.quantity}</Table.Td>
            <Table.Td><Button onClick={()=>removeFromCart(p._id)}>Remove from cart</Button></Table.Td>
                                </Table.Tr>
                            ))
    
    const deliveryFee = () => {
        if (totalCost() >= 500 || selectedDeliveryMethod==='PostNord') {
            return 0
        }
        if (totalCost() < 500 && selectedDeliveryMethod === 'Instabox'||totalCost() < 500 && selectedDeliveryMethod === 'Budbee') {
            if (selectedDeliveryMethod === 'Instabox') {
                return 59;
            } {
                return 89;
            }
        }

    }
    const totalCostWithDelivery = () => {
        const tc = totalCost();
        const fee = deliveryFee() ?? 0;
        return tc + fee;
    }
    
    const [orderData, setOrderData] = useState({
    customerInfo: {
      fName: '',
      lName: '',
      email: '',
      cPhone: '',
      street: '',
      city: '',
      zipcode: '',
    },
    deliveryMethod: '',
    paymentMethod: '',
    cartItems: [],
    });
    const handleSubmit = async () => {
  try {
    
    const customerInfo = cForm.values;

    const order = {
        "cFirstname": customerInfo.fName,
        "cLastname": customerInfo.lName,
        "cEmail": customerInfo.email,
        "cPhone": parseInt(customerInfo.cPhone),
        "cAdress": [{
            "street": customerInfo.street,
            "city": customerInfo.city,
            "zipcode":parseInt(customerInfo.zipcode)
        }],
        "totalCost":totalCost(),
        "deliveryOption": selectedDeliveryMethod,
        "shipped": false,
      "paymentOption": selectedPaymentMethod,
      "products":cart,
    };
   
    // Send a POST request to the server with the order data using fetch
    const response = await fetch('http://localhost:3000/order/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    if (response.ok) {
      const responseData = await response.json();
        console.log('Order placed successfully:', responseData);
        setOrderId(responseData._id);
        emptyCart();
        nextStep();
        
    } else {
      console.error('Error placing order:', response.statusText);
    }
  } catch (error) {
    console.error('Error placing order:', error);
  }
};

    const [active, setActive]=useState(1);
    const nextStep = () => {
         if (active === 1) {
         const isValid = cForm.validate().hasErrors;
         if (!isValid) {
             setActive((current) => (current < 5 ? current + 1 : current));
             console.log(cForm)
    } else {
      setActive((current) => current);
    }
  } else {
             setActive((current) => (current < 5 ? current + 1 : current));
             console.log(orderData)
  }
};
    const prevStep=()=> setActive((current)=>(current >0? current-1:current));
    
const cForm=useCustomerForm ({
        initialValues:{
            fName:'',
            lName:'',
            email:'',
            cPhone:'',
            street:'',
            city:'',
            zipcode:'',
        },
        validate:{
            fName:(value)=>(/^([^0-9]*)$/.test(value) && value.length>1 ? null : "This can't be empty"),
            lName:(value)=>(/^([^0-9]*)$/.test(value) && value.length>1 ? null : "This can't be empty"),
            email:(value)=>(/^\S+@\S+$/.test(value) && value.length>1 ? null : 'Invalid email'),
            cPhone:(value)=>(/^\d+$/.test(value) && value.length==10 ? null : "This can't be empty"),
            street:(value)=>(/^\S/.test(value) && value.length>1 ? null : "This can't be empty"),
            city:(value)=>(/^([^0-9]*)$/.test(value) && value.length>1 ? null : "This can't be empty"),
            zipcode:(value)=>(/^\d+$/.test(value) && value.length==5 ? null : 'Invalid ZIP code'),
        }

}); 
    const isCartEmpty = cart.length > 0;
    
    const isPayStep = active === 4;
    useEffect(() => {
    // Reset the active step when the component unmounts
    return () => {
      setActive(0);
    };
    }, []); // Empty dependency array ensures this effect runs only once
    useEffect(() => {
        if (accordionValue === 'Swish') {
          setSelectedPaymentMethod('Swish');
        } else if (accordionValue === 'Card') {
          setSelectedPaymentMethod('Card');
        }
      }, [accordionValue]);

    const handleAccordionChange = (value: string) => {
        setAccordionValue(value);
        console.log(value)
      };
    
    
        
        return (
            
            
            <div className='checkoutStepper'>
                        
                    <Stepper active={active} onStepClick={setActive} size='md' allowNextStepsSelect={false} >
                    <Stepper.Step label="Your Cart">
                {!isCartEmpty ? (
                    
                    <>
            <h1>Your Cart is empty!</h1>
            <img src={Catbox} style={{height:'96px',width:'auto', margin:'0 auto'}}></img>
            </>
                        ) : (
                                <div className='tableWrapper'>

                                <Table>
                                    <Table.Thead>

                        { tHead }
                                    </Table.Thead>
                            <Table.Tbody>
                                
                            {reviewCart}
                            </Table.Tbody>
                            
                        </Table>
                                </div>
                            )}
                    </Stepper.Step>
            <Stepper.Step label="Personal information" >
            <FormProvider form={useCustomerForm()}>
            <Box maw={340} mx="auto">
        <form onSubmit={cForm.onSubmit=()=>console.log}>
          <TextInput
            withAsterisk
            label="First Name"
            placeholder="Enter first name..."
            {...cForm.getInputProps('fName')}
            />
            <TextInput
            withAsterisk
            label="Lastname"
            placeholder="Enter lastname..."
            {...cForm.getInputProps('lName')}
            />
            <TextInput
            withAsterisk
            label="email"
            placeholder="Enter email..."
            {...cForm.getInputProps('email')}
            />
            <TextInput
            withAsterisk
            label="Phonenumber"
            placeholder="Enter your phonenumber..."
            {...cForm.getInputProps('cPhone')}
            />
            <TextInput
            withAsterisk
            label="Street adress"
            placeholder="Enter your street adress..."
            {...cForm.getInputProps('street')}
            />
            <TextInput
            withAsterisk
            label="City"
            placeholder="Enter your city..."
            {...cForm.getInputProps('city')}
            />
            <TextInput
            withAsterisk
            label="Zip code"
            placeholder="Enter your zip code..."
            {...cForm.getInputProps('zipcode')}
            />
            

        
        </form>
        </Box>
        </FormProvider>
        </Stepper.Step>
        <Stepper.Step label="Delivery option" >
                        
                        <Radio.Group 
                            name='delivery'
                            label='Which delivery service do you prefer?'
                            value={selectedDeliveryMethod}
                            onChange={(value) => {                                
                                setSelectedDeliveryMethod(value);
                                console.log(value)
                            }}
                            >

                            <Group mt='md' style={{display:'flex', flexDirection:'column'}}>
                                <ul>
                                    <li>
                                        <Radio value='PostNord' label={`Postnord (0 SEK)`}
                                            checked={selectedDeliveryMethod=== 'PostNord'}
                                        />
                                    </li>
                                    <li>
                                        <Radio value='Instabox' label={`Instabox (${totalCost()>500? '0':'59'} SEK)`}
                                            checked={selectedDeliveryMethod === 'Instabox'}
                                        />
                                    </li>
                                    <li>
                                        <Radio value='Budbee' label={`Budbee (${totalCost()>500? '0':'89'} SEK)`}
                                        checked={selectedDeliveryMethod==='Budbee'}
                                        />
                                    </li>
                            </ul>
                            </Group>
                        </Radio.Group>

        </Stepper.Step>
        
                    <Stepper.Step label="Review you order" >
                        <Box display={Flex}>

                        <div style={{display:'flex', textAlign:'left'}} >
                            <List listStyleType='none' withPadding>
                                <List.Item>{cForm.values.fName }</List.Item>
                                <List.Item>{cForm.values.lName }</List.Item>
                                <List.Item>{cForm.values.cPhone }</List.Item>
                                <List.Item>{cForm.values.street }</List.Item>
                                <List.Item>{cForm.values.zipcode }</List.Item>
                                <List.Item>{cForm.values.city }</List.Item>
                            </List>
                                <List listStyleType='none' withPadding style={{marginLeft:'5rem'}}>
                                    
                                    <List.Item>Delivery option: {selectedDeliveryMethod}</List.Item>
                                    </List>
                        </div>
                            <Group>

                            </Group>
                                
                        </Box>
                            
                        <Table>
                            <Table.Thead>
                            <Table.Tr>                                
                            <Table.Th>
                                
                            </Table.Th>
                            <Table.Th>
                                Product
                                </Table.Th>
                                <Table.Th>
                                Cost
                                </Table.Th>
                                <Table.Th>
                                Quantity
                                </Table.Th>
                                <Table.Th>                                
                            </Table.Th>
                            </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {reviewCart}
                            </Table.Tbody>
                            <Table.Tfoot>
                                <Table.Tr>
                                    <Table.Th></Table.Th>
                                    <Table.Th></Table.Th>
                                    <Table.Th></Table.Th>
                                    <Table.Th>Delivery fee: {deliveryFee() } SEK</Table.Th>
                                    <Table.Th>{ totalCostWithDelivery() } SEK (moms:{totalCost()/1.25} SEK)</Table.Th>
                                </Table.Tr>
                            </Table.Tfoot>
        </Table>
                    </Stepper.Step>
                    <Stepper.Step label="Payment method" >
                        <form>
                            
                            <Accordion defaultValue={accordionValue} onChange={handleAccordionChange}>
                            <Accordion.Item value='Swish'>
                                <Accordion.Control>
                                    <Text>Swish</Text>
                                </Accordion.Control>
                                <Accordion.Panel>
                                <form style={{  margin: '0 auto' }}>
                                        <Table>
                                            <Table.Tbody>
                                                <Table.Tr>
                                                    <Table.Td><TextInput {...cForm.getInputProps('cPhone')}></TextInput></Table.Td>
                                                </Table.Tr>
                                            </Table.Tbody>
                                        
                                        </Table>
                                </form>
                                </Accordion.Panel>
                            </Accordion.Item>
                            <Accordion.Item value='Card'>
                                <Accordion.Control>
                                    <Text>Card</Text>
                                    </Accordion.Control>
                               
                                <Accordion.Panel>
     <form>
                                        <TextInput label="Name of card owner :" placeholder='Name of card owner...'></TextInput>
                                        <TextInput label="Card No. :" placeholder='Enter you card number...'></TextInput>
                                        <TextInput label="Valid until:" placeholder='MM/YY'></TextInput>
                                        <TextInput label="CVV:" placeholder='Enter CVV'></TextInput>
                                        
                                    </form>
                                </Accordion.Panel>
                                </Accordion.Item>
                    </Accordion>
                    </form>
                       
                        
        </Stepper.Step>
            <Stepper.Completed>
                        <p>Thank you for your order!</p>
                        <p>OrderID: { orderId}</p>
                </Stepper.Completed>
                </Stepper>
                {isPayStep &&(
               
               <Group justify="center" mt="xl">
               <Button variant="default" onClick={prevStep}>Back</Button>
               <Button onClick={handleSubmit}>Pay</Button>
               </Group>
               )}
                {!isPayStep && active!==5 &&(
                    
                    <Group justify="center" mt="xl">
                    <Button variant="default" onClick={prevStep}>Back</Button>
                    <Button onClick={nextStep}>Next step</Button>
                    </Group>
                    )}
                    
                    </div>
                    
                    )
                    
                }
                
                
            
            