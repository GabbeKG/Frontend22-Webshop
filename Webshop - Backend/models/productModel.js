const mongoose=require('mongoose');

const productSchema= new mongoose.Schema({
    name:{type: String, require:true},
    price:{type: Number,require:true},
    desc:{type:String},
    image:{String},
    createdAt:{type: Date, require:true},
    tags:[String],
});

const ProductModel=mongoose.model('product', productSchema);

module.exports=ProductModel;