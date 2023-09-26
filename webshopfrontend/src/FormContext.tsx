import { createFormContext } from '@mantine/form';


interface FormValues{
    fName:string,
    lName:string,
    email:string,
    cPhone:string,
    street:string,
    city:string,
    zipcode:string,
}

export const [FormProvider, useFormContext, useCustomerForm] = createFormContext<FormValues>();
