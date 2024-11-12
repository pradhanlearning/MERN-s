
import express from "express" ;
import {connectDB} from './config/db.js';
import dotenv from "dotenv";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express(); 
const PORT= process.env.PORT || 8000;

app.use(express.json()); //allows to accept json data in req.body (middleware)
app.use("/api/products", productRoutes)

console.log(process.env.MONGO_URI);
app.listen(PORT, () => {
    connectDB();
    console.log("server started at http://localhost:"+ PORT);
});

// DUXiZjLGkk3TXo4L