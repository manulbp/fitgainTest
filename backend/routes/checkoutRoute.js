import express from 'express';
import { addCheckout, getCheckout, deleteCheckout, statusupdate } from '../controllers/checkoutController.js';
const Checkout = express.Router();

Checkout.post('/addCheckout', addCheckout);
Checkout.get('/Checkout', getCheckout);
Checkout.post('/deleteCheckout', deleteCheckout);
Checkout.post('/statusupdate', statusupdate);

export default Checkout;