
import express from "express" ;
import {connectDB} from './config/db.js';
import dotenv from "dotenv";
import Product from "./model/product.model.js";

dotenv.config();

const app = express();

app.use(express.json()); //allows to accept json data in req.body

app.post("/products",async(req,res)=>{
    const product= req.body; //user will send this data
    if(!product.name || !product.image || !product.price){
        return res.status(400).json({sucess:false,message:"please provide all fields"});
    }
    const newProduct= Product(product); //it has name,price,image that we got from user

   try{
    await newProduct.save() //save product data from user
   }
   catch(error){ //to debugg if any error
    console.error("error in creating product:",error.message);
    res.status(500).json({sucess:true,message:"server created"});
   }
});

console.log(process.env.MONGO_URI);
app.listen(8000, () => {
    connectDB();
    console.log("server started at http://localhost:8000");
});

// DUXiZjLGkk3TXo4L