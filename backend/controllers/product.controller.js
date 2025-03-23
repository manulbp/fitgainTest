import Product from "../models/product.model.js";


export const test = (req, res) => {
    res.json({
        message:'API is working!',

    });



};

//Data insertion

export const addproducts = async (req, res) => {
    const { productname, description, category,condition, quantity, price, guidance } = req.body;
  
    if (!productname || !description || !category || !quantity || !price) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }
  
    try {
      const product = new Product({ productname, description, category,condition, quantity, price, guidance });
      await product.save();
      return res.status(201).json({ success: true, message: "Product added successfully", product });
    } catch (err) {
      console.error("Error adding product:", err);
      return res.status(500).json({ success: false, message: "Unable to add product", error: err.message });
    }
};


//Get by id

export const getbyId = async (req,res, next) => {

    const pid = req.params.pid;

    let product;

    try{

        product = await Product.findById(pid);



    }catch(err){
        console.log(err);

    }

    if(!product){
        return res.status(404).json({message:"Product not found"});


    }

    return res.status(200).json({product});
};

// Update user details

export const updateProduct = async(req,res,next) => {

    const pid = req.params.pid;

    const {productname, description, category, condition, quantity, price, guidance} = req.body;

    let productu;

    try{
        productu = await Product.findByIdAndUpdate(pid,

        {productname:productname, description:description, category:category, condition:condition, quantity:quantity, price:price, guidance:guidance});

        productu = await productu.save();


    }catch(err){

        console.log(err);
    }

    if(!productu){
        return res.status(404).json({message:"Unable to update product details"});


    }

    return res.status(200).json({productu});

};

//Delete product details

export const deleteProduct = async(req,res,next) => {

    const pid = req.params.pid;

    let productd;

    try{
        productd = await Product.findByIdAndDelete(pid);


    }catch(err){
        console.log(err);

        }

        if(!productd){
            return res.status(404).json({message:"Unable to delete product details"});
    
    
        }
    
        return res.status(200).json({productd});
    



}
