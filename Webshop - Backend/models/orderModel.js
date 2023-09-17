const mongoose=require ('mongoose');

const orderSchema= new mongoose.Schema({
    cFirstname:{type: String, require:true},
    cLastname:{type: String, require:true},
    cPhone:{type:Number, require:true},
    cAdress:[{
            street:{type:String, require:true},
            city:{type:String, require:true},
            zipcode:{type:Number,require:true}
    }],
    products:[{
            name:{type: String, require:true},
            price:{type: Number,require:true},
    }],
    totalCost:{type:Number, require:true},
    deliveryOption:{type:String, require:true},
    freeShipping:{type:Boolean, require: true},
    shipped:{type:Boolean, require:true},
    paymentOption:{type:String, require:true}


});

const OrderModel = mongoose.model("order", orderSchema);

module.exports=OrderModel;