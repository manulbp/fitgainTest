// controllers/cartController.js

import { Cart } from "../models/cart.Model.js"; // Update the path based on your project structure

// CREATE a new cart item
export const createCartItem = async (req, res) => {
    try {
        const newItem = new Cart(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// READ all cart items
export const getAllCartItems = async (req, res) => {
    try {
        const items = await Cart.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ a single cart item by ID
export const getCartItemById = async (req, res) => {
    try {
        const item = await Cart.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE only the quantity of a cart item by ID
export const updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;

        if (quantity === undefined) {
            return res.status(400).json({ message: "Quantity is required" });
        }

        const updatedItem = await Cart.findByIdAndUpdate(
            req.params.id,
            { quantity },
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE a cart item by ID
export const deleteCartItem = async (req, res) => {
    try {
        const deletedItem = await Cart.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
