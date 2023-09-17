const express =require('express');
const ProductModel=require("../models/productModel");

const productRouter=express.Router();

productRouter
    .post("/", async function(req,res){
        const newProduct=await ProductModel.create(req.body)
        res.json(newProduct)
    });



module.exports =productRouter;