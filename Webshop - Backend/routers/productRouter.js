const express =require('express');
const ProductModel=require("../models/productModel");

const productRouter=express.Router();

productRouter
    .post("/", async function(req,res){
        const newProduct=await ProductModel.create(req.body)
        res.json(newProduct)
    });

productRouter
    .get("/", async function(req,res){
        const products=await ProductModel.find();

        res.json(products)
    })
productRouter
    .put("/:id", async function (req,res){
        const productId={_id:req.body._id};
        console.log(productId)
        try {
            const product=await ProductModel.findOneAndUpdate(productId, {name:req.body.name, price:req.body.price},{
                new:true
            });
            res.json(product)
        } catch (error) {
            console.log(error);
        }
    })



module.exports =productRouter;