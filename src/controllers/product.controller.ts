import { Request, Response } from "express";
import { Product, IProduct } from "../models/product.model";

//Get all products
const getAllProducts = async (req: Request, res:Response) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Unable to fetch all products'})
    }
}

// Get products by productname
const getproductByName = async (req: Request<{},{},{},{ productName: string}>, res: Response) => {
    try {
        const { productName } = req.query
        const products = await Product.find({
            productName: {
                $regex: productName,
                $options: 'i'
            }
        })
        res.status(200).json(products)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Unable to fetch products by name'})
    }
}

// Create a new product 
const createProduct = async (req:Request<{},{}, IProduct>, res: Response) => {
    try {
        const { productName, productPrice } = req.body
        const product = await Product.create({ productName, productPrice})
        res.status(201).json(product)
    }catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Unable to create a product'})
    }
}

// update a product by Id
const updateProduct = async (req:Request<{ id: string },{}, Partial<IProduct>>, res: Response) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        res.status(200).json(product)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Unable to update a product'})
    }
}

// Delete product by ID
const deleteProductById = async(req:Request<{ id: string }>, res: Response) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        res.status(200).json(product)
    }catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Unable to delete a product'})
    }
}

export default {
    getAllProducts,
    getproductByName,
    createProduct,
    updateProduct,
    deleteProductById
}