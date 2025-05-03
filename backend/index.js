import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/product.route.js'; 
import authRoutes from './routes/auth.route.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Add these lines for file path resolution (needed for static file serving)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use(cors());

// Add this line to serve static files from the Uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

app.listen(5080, () => {
    console.log('Server listening on port 5080');
});

app.use('/backend/product', productRoutes);
app.use("/backend/auth", authRoutes);
