import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    productname: { type: String, required: true },
    category: { type: String, required: true },
    condition: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
},
    {
        collection: "Cart",
        timestamps: true,
    });

export const Cart = mongoose.model('Cart', cartSchema);
