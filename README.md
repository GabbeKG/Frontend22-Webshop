# Frontend22-Webshop
School assignment to make a webshop with the help of React, TypeScript, Node, MongoDB and react componentlibrary of my own choosing.

## Development
Althought the assignment was meant to be a group assignement, circumstance led me to tackle this on my own.
I choose Mantine as my component library of choice since it seem interesting and was considering MUI due to it being perhaps the most common used component library when it comes to e-commerce websites.
So i took this opportunity to pick a known but less popular component library: Mantine.

I started of making sketches gor the layout and later in the development i realise that I haven't taken in consideration that how mantine is used, which made me need to pivot on my initial design and make some compromises. Which ended up saving me a lot of time when I started playing by mantines rules.

The website is divided by 2 parts, the webshop and the admin page.
At the webshop you can either add products to your cart and on the product list on the "/" or "/products" url extension you can also click on an a product to activate a modal to view more information regarding the product and also add it to the cart.
Latest products utilizes mantine-carousel togethe with mantine Cards components.

On the checkout I've utilized the Stepper component provided by mantine/core that let you first see your cart and make adjustments to whether you wish to increase or decrease the quantity of a certain product or remove it completely.
Next step is you personal information with some validators using mantines useform hook. The validators are made with regex and checks that no numbers or special symbols are present in the name fields, that the email is valid, and zipcode and phonenumber is numbers and won't allow any letters or special characters.

Next step is your choice of delivery, if the total cost in your cart is 500 or more the delivery is free otherwise there's a delivery cost that will be added.

Next step will provide a summary of your order and what the total cost will be including delivery and VAT.

Then you can choose to pay and you made your purchase!

## Teckstack

### Backend techstack:

-Express
-Mongoose
-dotenv
-mongodb

### Frontend techstack
-Vite.js
-React
-Mantine
-TypeScript

## How to install:

### Webshop - Backend

    npm i 
    npm i express
    npm i mongoose
    npm i cors
    npm i dotenv

You'll need to create the .env file and add DB_URI ="your-mongodb-URI"

## webshopfrontend

    npm i
    npm i vite@latest
    npm install @mantine/core @mantine/hooks @mantine/form @mantine/carousel embla-carousel-react @mantine/modals
    npm i react-router-dom

Mantine docs: 
https://mantine.dev/getting-started/ 

## How to run

### Backend
    npm start

### Frontend
    npm run dev