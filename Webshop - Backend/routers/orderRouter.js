const express=require('express');
const OrderModel=require("../models/orderModel");

const orderRouter=express.Router();

orderRouter
    .post("/", async function(req,res){
        const newOrder=await OrderModel.create(req.body);
        res.json(newOrder);
    });

    module.exports = orderRouter;