const express= require('express');
const mongoose=require('mongoose');
const app=express();
const port=3000;
const dotenv=require('dotenv')
const cors=require('cors');
const productRouter = require('./routers/productRouter');
const orderRouter = require('./routers/orderRouter')

dotenv.config();

mongoose.connect(process.env.DB_URI, {useNewUrlParser:true})
.then(()=> {
    console.log("connected to db");
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    app.use(cors())
    app.use('/product', productRouter)
    app.use('/order', orderRouter)
    app.listen(port,()=>console.log(`listening to port: ${port}...`))
})
.catch((error)=>{
    console.log(error);
})