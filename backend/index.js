import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/product.route.js'; 
import authRoutes from './routes/auth.route.js';
import routerL from './routes/loginRoutes.js';
import cors from 'cors';
import Checkout from './routes/checkoutRoute.js';
import cartRoutes from './routes/cartRoutes.js';
dotenv.config(); 
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", // Allow frontend
  credentials: true, // Allow cookies (if needed)
}));



app.listen(5050, () => {
    console.log('Server listening on port 5050');
});


app.use('/backend/product', productRoutes);
app.use("/backend/auth", authRoutes);
app.use("/api", routerL);
app.use("/api", Checkout);
app.use('/api', cartRoutes);