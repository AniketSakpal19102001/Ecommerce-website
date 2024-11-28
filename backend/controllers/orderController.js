import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

const findUserById = async (userId) => {
  return await User.findById(userId);
};

export async function handleGetOrder(req, res) {
  try {
    const userId = req.user.userId;
    const orders = await Order.find({ user: userId });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching orders" });
  }
}

export async function handlePostOrder(req, res) {
  try {
    const userId = req.user.userId;

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Your cart is empty. Add items before placing an order.",
      });
    }

    // Validate user
    const user = await findUserById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Loop through the cart items and create an order for each distinct product
    const createdOrders = [];
    for (const item of cart.items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${item.product} not found` });
      }

      // Create the new order for this product
      const newOrder = new Order({
        user: userId,
        products: [
          {
            product: item.product,
            quantity: item.quantity,
            price: product.price, // Price for this particular product
          },
        ],
        totalAmount: item.quantity * product.price, // Total price for this product
        paymentMethod: "Cash on delivery", // Payment method will be provided in the request body
        shippingAddress: req.body.shippingAddress, // Shipping address will be provided in the request body
        status: "pending", // The status of the order will initially be 'pending'
      });

      // Save the order
      await newOrder.save();
      createdOrders.push(newOrder);
    }

    // Optionally, clear the user's cart after creating orders
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    // Return all created orders
    res.status(201).json(createdOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating orders" });
  }
}

export async function handleCancelOrder(req, res) {
  try {
    const { orderId } = req.params;
    const userId = req.user.userId;

    // Find the order and ensure it's the user's order
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to cancel this order" });
    }

    // Cancel only if it's still pending
    if (order.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending orders can be cancelled" });
    }

    // Update the order status to 'cancelled'
    order.status = "cancelled";
    await order.save();

    res.json({ message: "Order cancelled successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error cancelling order" });
  }
}
const generateTrackingNumber = () => {
  const prefix = "TRK"; // Prefix for tracking number
  const randomPart = Math.random().toString(36).substring(2, 12).toUpperCase(); // Random alphanumeric string
  return `${prefix}-${randomPart}`;
};

export async function handleUpdateStatus(req, res) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const userId = req.user.userId;

    // Ensure the status is valid
    const validStatuses = ["pending", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Find the order and ensure it's the user's order
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this order" });
    }

    // Update the status of the order
    order.status = status;

    // If the status is 'shipped', generate a tracking number and set the shipping date
    if (status === "shipped") {
      order.trackingNumber = generateTrackingNumber(); // Generate and assign a tracking number
      order.shippingDate = Date.now(); // Set the shipping date when the order is shipped
    }

    // Save the updated order
    await order.save();

    res.json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating order status" });
  }
}
