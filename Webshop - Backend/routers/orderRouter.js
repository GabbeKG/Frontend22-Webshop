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
        const orderId={_id:req.body._id};
        try {
            const order= await OrderModel.findOneAndUpdate(orderId, {shipped:req.body.shipped}, {
                new:true
            });
            
            res.json(order)
        } catch (error) {
            console.log(error)
        }
    })
orderRouter
    .patch('/:id', async function (req, res) {
        const orderId = { _id: req.body._id };
        const updateData={shipped:req.body.shipped}
         try {
            const order= await OrderModel.findByIdAndUpdate(orderId, updateData, {
                new:true
            });
            
            res.json(order)
        } catch (error) {
            console.log(error)
        }
    })

    module.exports = orderRouter;