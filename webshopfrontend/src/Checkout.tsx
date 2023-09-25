import { useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';
import { CustomerInfoForm } from './Form';


export function Checkout(){
    const [active, setActive]=useState(1);
    const nextStep=()=> setActive((current)=>(current <4? current+1:current));
    const prevStep=()=> setActive((current)=>(current >0? current-1:current));

    return(
        <div className='checkoutStepper'>
        <Stepper active={active} onStepClick={setActive} size='md' allowNextStepsSelect={false} >
            <Stepper.Step label="Personal information" >
                <CustomerInfoForm/>
            </Stepper.Step>
            <Stepper.Step label="Delivery option" >
                List of delivery options goes here
            </Stepper.Step>
            <Stepper.Step label="Payment method" >
                LIST OF PAYMENT METHODS
            </Stepper.Step>
            <Stepper.Step label="Review you order" >
                Order summery
            </Stepper.Step>
            <Stepper.Completed>
                Thank you for your order!
            </Stepper.Completed>
        </Stepper>
        <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
        
        </div>
    )

}