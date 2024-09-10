import express from "express";
import { addProduct, listProduct, removeProduct } from "../controllers/productController.js";
import multer from 'multer';
import Product from '../models/productModel.js'; // Assure-toi que ce chemin est correct
import fs from 'fs';

const productRouter = express.Router();

// image storage engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

productRouter.post("/add", upload.array("images"), addProduct);
productRouter.get("/list", listProduct);
productRouter.post('/remove', removeProduct);

// Route pour récupérer un produit par ID
productRouter.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

productRouter.put('/update/:id', upload.array("images"), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Mise à jour des informations du produit
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    
    // Gestion des images
    if (req.files) {
      // Supprime les anciennes images
      product.images.forEach(image => {
        fs.unlink(`uploads/${image}`, (err) => {
          if (err) console.log(err);
        });
      });

      // Ajoute les nouvelles images
      const newImages = req.files.map(file => file.filename);
      product.images = newImages;
    }

    await product.save();
    res.status(200).json({ success: true, message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


export default productRouter;
