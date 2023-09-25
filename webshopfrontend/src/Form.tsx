import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';

export function CustomerInfoForm(){
    const cForm=useForm ({
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
    return(
        <Box maw={340} mx="auto">
        <form onSubmit={cForm.onSubmit((values) => console.log(values))}>
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

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
    )
}