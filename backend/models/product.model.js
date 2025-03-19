import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

     productname:{
        type: String,
        required: true,
        unique: true,

     },

     description:{
        type: String,
        required: true,
        

     },

     category:{
        type: String,
        required: true,
       

     },

     price:{
        type: double,
        required: true,
        
     },

     guidance:{
        type:String,
        required: true,


     }


}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

export default Product;