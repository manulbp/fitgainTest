import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/product.route.js'; 
import authRoutes from './routes/auth.route.js';

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




app.listen(5050, () => {
    console.log('Server listening on port 5050');
});


app.use('/backend/product', productRoutes);
app.use("/backend/auth", authRoutes);

