import express from "express";
import cors from "cors";
import 'dotenv/config.js'
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

// App Config
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

// API End Points
app.use("/api/user",userRoutes)
app.use("/api/ticket",ticketRoutes)
app.use("/api/chat",chatRoutes)
app.use("/api/review",reviewRoutes)

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log(`listening on localhost:${port}`));
