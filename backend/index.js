import express from "express";
import config from "./config/config.js";
import connectDB from "./config/dbConnect.js";
import auth from "./routes/auth.js"
import product from "./routes/products.js"
import Product from "./models/productModel.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import Cart from "./models/cartModel.js";
import cartRoute from "./routes/cart.js"
import morgan from "morgan";
import orderRoute from "./routes/order.js"
const app = express();
const port = config.port;
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, 
  };
connectDB();
// app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", auth)
app.use("/products", product)
app.use("/cart", cartRoute)
app.use("/order", orderRoute)
app.get("/", (req, res)=>{
    res.send("Server running...")
})
// async function add() {
//     const product = new Product({
//         name: "Ted The Stoner: Baby Terry",
//   img: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1724133527_9635508.jpg?format=webp&w=480&dpr=1.3",
//   category: "Oversized T-Shirts",
//   price: 1299,
//   mrp: 1500,
// //   theme: "DC",
//   detail: "Material & Care: Premium Heavy Gauge Fabric 100% Cotton Machine Wash Country of Origin: India (and proud) Manufactured & Sold By: The Souled Store Pvt. Ltd. 224, Tantia Jogani Industrial Premises J.R. Boricha Marg Lower Parel (E) Mumbai - 400 011 connect@thesouledstore.com Customer care no. +91 22-68493328",
//     })

//     const result = await product.save();
//     console.log(result);
    
    
// }
// add();

// async function getCart(id) {
//     const cart = await Cart.find({user: id}).populate('items.product');
//     console.log(cart[0]);
//     // console.log(cart[0].items.map(i=> i.product.name));
// }
// getCart("672dd97539ca3f6ad8710fb5")

// async function totalAmount(id){
//     const cart = await Cart.find({user: id}).populate('items.product');
//     console.log(cart[0].items.reduce((totalAmount, item) => {
//         // Ensure product is populated and price is available
//         if (item.product && item.product.price) {
//           return totalAmount + (item.quantity * item.product.price);
//         } else {
//           console.log(`Product or price not found for item: ${item._id}`);
//           return totalAmount;  // Don't add to total if product or price missing
//         }
//       }, 0))
// }
// totalAmount("672dd97539ca3f6ad8710fb5");

// async function addProductToCart(userId, productId, quantity) {
//     // Ensure that quantity is at least 1
//     if (quantity < 1) {
//       throw new Error('Quantity must be at least 1');
//     }
  
//     // Find the product to get its price and details
//     const product = await Product.findById(productId);
//     if (!product) {
//       throw new Error('Product not found');
//     }
  
//     // Find the cart for the user
//     let cart = await Cart.findOne({ user: userId });
  
//     // If the cart does not exist, create a new cart
//     if (!cart) {
//       cart = new Cart({ user: userId, items: [], totalAmount: 0 });
//     }
  
//     // Check if the product already exists in the cart
//     const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);
  
//     if (existingItemIndex > -1) {
//       // Product already exists, update the quantity and totalPrice
//       const existingItem = cart.items[existingItemIndex];
//       existingItem.quantity += quantity;  // Increase quantity
//       existingItem.totalPrice = existingItem.quantity * product.price; // Recalculate totalPrice
//     } else {
//       // Product does not exist, add it to the cart
//       cart.items.push({
//         product: productId,
//         quantity,
//         totalPrice: quantity * product.price
//       });
//     }
  
//     // Recalculate the totalAmount of the cart
//     cart.totalAmount = cart.items.reduce((acc, item) => acc + item.totalPrice, 0);
  
//     // Save the cart
//     await cart.save();
  
//     return cart;
//   }

// addProductToCart("672dd97539ca3f6ad8710fb5", "672dd0dc39713dd7027b7480", 1);


app.listen(port, ()=>{
    console.log("server runnning at port ", port);
})