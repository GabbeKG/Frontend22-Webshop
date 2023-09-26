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
productRouter
    .delete("/:id", async function (req, res) {
        const productId = { _id: req.body._id };
        try {
            
            const deletedProduct = await ProductModel.findByIdAndDelete(productId);
            
            if (!deletedProduct) {
                // If the product with the provided id was not found, return an error response
                return res.status(404).json({ error: 'Product not found' });
            }
            
            // If the product was successfully deleted, return a success response
            res.status(200).json({ message: 'Product deleted successfully' });
        
    } catch (error) {
        // Handle any errors that occur during the delete operation
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }     
        
    })



module.exports =productRouter;