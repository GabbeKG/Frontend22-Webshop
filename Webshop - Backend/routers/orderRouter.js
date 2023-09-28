const express=require('express');
const OrderModel=require("../models/orderModel");

const orderRouter=express.Router();

orderRouter
    .post("/", async function(req,res){
        const newOrder=await OrderModel.create(req.body);
        res.json(newOrder);
    });
orderRouter
    .get("/", async function(req,res){
        const orders = await OrderModel.find();

        res.json(orders);
    })
orderRouter
    .put("/:id", async function(req,res){
        const orderId=req.body._id;
        try {
            const order= await OrderModel.findByIdAndUpdate(orderId, {shipped:true}, {
            
                new:true
            });
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
              }
            
            res.json(order);
            console.log(order);
        } catch (error) {
            console.log(error)
        }
    })
    module.exports = orderRouter;