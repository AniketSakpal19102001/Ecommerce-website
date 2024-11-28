import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
export async function handleGetCart(req, res){
    try {
        const userId = req.user.userId;
        // console.log(userId);
        const cart = await Cart.find({ user: userId }).populate('items.product');
        if (cart.length > 0) {
            const productNames = cart[0].items.map(i => i.product.name);
            // console.log(productNames);
            res.status(200).json({ cart, productNames });
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


export async function handleAddCart(req, res){
    try {
        const { productId, quantity, size } = req.body;  // Get productId and quantity from the request body
        const userId = req.user.userId;             // Get userId from the authenticated user

        // Ensure that quantity is at least 1
        if (quantity < 1) {
            return res.status(400).json({ message: 'Quantity must be at least 1' });
        }

        // Find the product to get its price and details
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find the cart for the user
        let cart = await Cart.findOne({ user: userId }).populate('items.product');

        // If the cart does not exist, create a new cart
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        // Check if the product already exists in the cart
        const existingItemIndex = cart.items.findIndex(item => item.product._id == productId);

        

        if (existingItemIndex > -1) {
            // Product already exists, update the quantity and totalPrice
            const existingItem = cart.items[existingItemIndex];
            existingItem.quantity += Number(quantity);// Increase quantity
            existingItem.totalPrice = existingItem.quantity * product.price; // Recalculate totalPrice
        } else {
            // Product does not exist, add it to the cart
            cart.items.push({
                product: productId,
                quantity,
                size,
                totalPrice: quantity * product.price
            });
        }
        await cart.save();

        const populatedCart = await Cart.find({user: userId}).populate('items.product');

        populatedCart[0].totalAmount = populatedCart[0].items.reduce((totalAmount, item) => {
            // Ensure product is populated and price is available
            // console.log(item)
            if (item.product && item.product.price) {
                return totalAmount + (item.quantity * item.product.price);
            } else {
                console.log(`Product or price not found for item: ${item._id}`);
                return totalAmount;  // Don't add to total if product or price missing
            }
        }, 0)


        await populatedCart[0].save();
        

        // Re-populate the cart and get the calculated total amount using the virtual field
        // const populatedCart = await Cart.findById(cart._id).populate('items.product');
        
       
        // Send the updated cart with calculated total amount
        res.status(200).json({
            message: 'Product added to cart',
            cart : populatedCart
            // cart: populatedCart,
            // totalAmount: populatedCart.calculatedTotalAmount // Get the calculated total amount using the virtual field
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


export async function handleEditCart(req, res) {
    try {
        const { productId, updatedQuantity } = req.body;  // Get productId and updatedQuantity from the request body
        const userId = req.user.userId;                    // Get userId from the authenticated user

        // Ensure that updatedQuantity is at least 1
        if (updatedQuantity < 1) {
            return res.status(400).json({ message: 'Quantity must be at least 1' });
        }

        // Find the product to get its price and details
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find the user's cart
        let cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the product in the cart
        const existingItemIndex = cart.items.findIndex(item => item.product._id.toString() === productId);
        if (existingItemIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        // Update the quantity of the product in the cart
        const existingItem = cart.items[existingItemIndex];
        existingItem.quantity = updatedQuantity; // Update quantity
        existingItem.totalPrice = updatedQuantity * product.price; // Recalculate totalPrice for this item

        // Recalculate totalAmount of the cart
        cart.totalAmount = cart.items.reduce((totalAmount, item) => {
            return totalAmount + item.totalPrice;
        }, 0);

        // Save the updated cart
        await cart.save();

        // Re-populate the cart items to include the product data
        const populatedCart = await Cart.findById(cart._id).populate('items.product');

        // Send the updated cart
        res.status(200).json({
            message: 'Cart updated successfully',
            cart: populatedCart
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export async function handleDeleteItem(req, res) {
    try {
        // console.log(req.body.productId.id)
        const productId  = req.body.productId.id;  // Get productId from the request body
        const userId = req.user.userId;  // Get userId from the authenticated user

        // console.log(productId)
        // Find the user's cart
        let cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the product in the cart
        const existingItemIndex = cart.items.findIndex(item => item.product._id.toString() === productId);
        if (existingItemIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        // Remove the product from the cart
        cart.items.splice(existingItemIndex, 1); // Remove the item from the array

        // Recalculate the totalAmount of the cart
        cart.totalAmount = cart.items.reduce((totalAmount, item) => {
            return totalAmount + item.totalPrice;
        }, 0);

        // Save the updated cart
        await cart.save();

        // Re-populate the cart items to include the product data
        const populatedCart = await Cart.findById(cart._id).populate('items.product');

        // Send the updated cart
        res.status(200).json({
            message: 'Product removed from cart successfully',
            cart: populatedCart
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
