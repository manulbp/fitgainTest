import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productname: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  condition: {type:String, required:true},
  quantity:{type:Number, required:true},
  price: { type: Number, required: true },
  guidance: { type: String, required: false },
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
