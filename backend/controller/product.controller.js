import mongoose from 'mongoose';
import Product from "../model/product.model.js";

export const getProduct= async(req,res)=>{
    try{
        const products=await Product.find({});
        res.status(200).json({success:true,data:products});
    }catch(error){
        console.log("error in fetching products:",error.message);
        res.status(500).json({success:false, message:"server error"})
    }
     
};

export const createProduct= async(req,res)=>{
    const product= req.body; //user will send this data
    if(!product.name || !product.image || !product.price){
        return res.status(400).json({success:false,message:"please provide all fields"});
    }
    const newProduct= Product(product); //it has name,price,image that we got from user

   try{
    await newProduct.save() //save product data from user
    res.status(201).json({success:true,data:newProduct});
   }
   catch(error){ //to debugg if any error
    console.error("error in creating product:",error.message);
    res.status(500).json({success:true,message:"server created"});
   }
};

export const updateProduct=async(req,res)=>{ 

    const {id} =req.params;
    const product= req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Invalid product Id"});
    } 

    try{
        const updatedProduct=await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({success:true, data: updatedProduct})
    }catch(error){
        res.status(500).json({success:false,message:"server error"});
    }
};

export const deleteProduct=async(req,res)=>{
    const {id}= req.params; 
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Product deleted"});
        
    } catch (error) {
        console.log("error in deleting product:", error.message);
        res.status(404).json({success:false,message:"server error"});
    }
};