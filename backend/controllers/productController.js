import Product from "../models/productModel.js"

export const handleProducts = async(req, res) =>{
    try {
        const products = await Product.find({});
    res.json(products)
    } catch (error) {
        res.json({error: "Error fetching products"})
    }
    
}