// productController.js
import productModel from "../models/productModel.js";
import fs from "fs";

// add product item
const addProduct = async (req, res) => {
  const image_filenames = req.files.map(file => file.filename);
  
  const product = new productModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    images: image_filenames
  });

  try {
    await product.save();
    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.error("Error in addProduct:", error); // Ajoute ce log pour voir l'erreur
    res.status(500).json({ success: false, message: "Error" });
  }
};


// Remove other functions as is...


//all product list
const listProduct = async(req,res)=>{
  try {
    const products = await productModel.find({})
    res.json({success:true,data:products})

  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
  }
}

//remove product
// productController.js
const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Supprimez tous les fichiers associés
    product.images.forEach(image => {
      fs.unlink(`uploads/${image}`, (err) => {
        if (err) console.log(err);
      });
    });

    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};


export { addProduct, listProduct, removeProduct };



// add product item
// const addProduct = async(req,res)=>{
//   let image_filename = ${req.file.filename}

//   const product = new productModel({
//     name:req.body.name,
//     description:req.body.description,
//     price:req.body.price,
//     category:req.body.category,
//     image:image_filename
//   })

//   try {
//     await product.save();
//     res.json({ success: true, message: "Product Added"});
//   } catch (error) {
//     console.log(error)
//     res.json({ succes:false, message: "Error"});
//   }
// };

// //all product list
// const listProduct = async(req,res)=>{
//   try {
//     const products = await productModel.find({})
//     res.json({success:true,data:products})

//   } catch (error) {
//     console.log(error)
//     res.json({success:false,message:"Error"})
//   }
// }

// //remove product
// const removeProduct = async (req, res)=>{
//   try {
//     const product = await productModel.findById(req.body.id)
//     fs.unlink(upload/${product.image},()=>{})

//     await productModel.findByIdAndDelete(req.body.id)
//     res.json({success:true,message:"Product Removed"})
//   } catch (error) {
//     console.log(error)
//     res.json({success:false,message:"Error"})
//   }
// }
// export {addProduct, listProduct, removeProduct};