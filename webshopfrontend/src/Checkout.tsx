import { useContext, useEffect, useState } from 'react';
import {
    Stepper,
    Button,
    Group,
    Checkbox,
    TextInput,
    Box,
    Radio,
    Table,
    Accordion 
} from '@mantine/core';

import { FormProvider, useFormContext,useCustomerForm } from './FormContext';
import { CartContext } from './CartContext';
import Catbox from '/icons8-cat-in-a-box-96.png'




export function Checkout() {
    const { cart, totalCost,removeFromCart } = useContext(CartContext);
    
    const tHead = (
        <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Product name</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Quantity</Table.Th>
            <Table.Th>{ totalCost() } SEK</Table.Th>
        </Table.Tr>
    );    
    const currCart=cart.map((p) => (
                                <Table.Tr key={p._id}>
                                    <Table.Td><img className="listImg" src={p.image}></img></Table.Td>
                                    <Table.Td>{p.name}</Table.Td>
                                    <Table.Td >{p.price} SEK</Table.Td>
            <Table.Td>{p.quantity}</Table.Td>
            <Table.Td><Button onClick={()=>removeFromCart(p._id)}>Remove from cart</Button></Table.Td>
                                </Table.Tr>
                            ))
                           
    //const { useCustomerForm } = useContext(useFormContext);
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
    // Collect customer information from form context
    const customerInfo = cForm.values;

    // Collect selected delivery method
    const deliveryMethod = orderData.deliveryMethod;

    // Collect selected payment method
    const paymentMethod = orderData.paymentMethod;

    // Collect cart items
    const cartItems = cart.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    // Create the order object
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
        "deliveryOption": orderData.deliveryMethod,
        "shipped": false,
      "paymentOption": orderData.paymentMethod,
      "products":cart,
    };
    console.log(order)
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
    const isLastStep = active === 5;
    const isPayStep = active === 4;
    useEffect(() => {
    // Reset the active step when the component unmounts
    return () => {
      setActive(0);
    };
  }, []); // Empty dependency array ensures this effect runs only once
    
    
        
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
                    <Table>
                        { tHead }
                            <Table.Tbody>
                                
                            {currCart}
                            </Table.Tbody>
                            
                        </Table>
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
            <Checkbox
            mt="md"
            label="I agree to sell my privacy"
            {...cForm.getInputProps('termsOfService', { type: 'checkbox' })}
            />

        
        </form>
        </Box>
        </FormProvider>
        </Stepper.Step>
        <Stepper.Step label="Delivery option" >
                        
                        <Radio.Group 
                            name='delivery'
                            label='Which delivery service do you prefer?'
                            >

                            <Group mt='md' style={{display:'flex', flexDirection:'column'}}>
                                <ul>
                                    <li>
                                        <Radio value='PostNord' label={`Postnord (0 SEK)`}
                                            checked={orderData.deliveryMethod=== 'PostNord'}
                                            onChange={()=> setOrderData({ ...orderData, deliveryMethod:'PostNord'})}
                                        />
                                    </li>
                                    <li>
                                        <Radio value='Instabox' label={`Instabox (${totalCost()>500? '0':'59'} SEK)`}
                                            checked={orderData.deliveryMethod === 'Instabox'}
                                            onChange={()=> setOrderData({ ...orderData, deliveryMethod:'PostNord'})}
                                        />
                                    </li>
                                    <li>

                                        <Radio value='Budbee ' label='Budbee (40 SEK)'
                                        checked={orderData.deliveryMethod==='Budbee'}
                                        onChange={()=> setOrderData({...orderData, deliveryMethod:'PostNord'})}
                                        />
                                    </li>
                            </ul>
                            </Group>
                        </Radio.Group>

        </Stepper.Step>
        
        <Stepper.Step label="Review you order" >
                        <Table>
                            <Table.Tr>                                
                            <Table.Th>
                                Image
                            </Table.Th>
                            <Table.Th>
                                Product
                                </Table.Th>
                                <Table.Th>
                                Quantity
                                </Table.Th>
                                <Table.Th>
                                Cost
                                </Table.Th>
                                <Table.Th>
                                
                            </Table.Th>
                            </Table.Tr>
                            <Table.Tbody>

                            </Table.Tbody>
        </Table>
                    </Stepper.Step>
                    <Stepper.Step label="Payment method" >
                        <Radio.Group>

                            <Radio value='Swish' label='Swish' style={{ width: '100%' }} checked={orderData.paymentMethod==="Swish" } />
                                    <form style={{  margin: '0 auto' }}>
                                        <Table>
                                            <Table.Tbody>
                                                <Table.Tr>
                                                    <Table.Td><TextInput value={cForm.values.cPhone}></TextInput></Table.Td>
                                                </Table.Tr>
                                            </Table.Tbody>
                                        
                                       
                                        </Table>
                                </form>
                                <Radio value='Card' label='Card' checked={orderData.paymentMethod==="Card" }/>
                        </Radio.Group>
                        
        </Stepper.Step>
            <Stepper.Completed>
                Thank you for your order!
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
                
                
            
            