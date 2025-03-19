import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';


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

app.listen(3003, () => {
    console.log('Server listening on port 3003');
});
