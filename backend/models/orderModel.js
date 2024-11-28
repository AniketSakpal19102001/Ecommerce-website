import mongoose, { Schema } from 'mongoose';

// Order Schema
const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to User model
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to Product model
      quantity: { type: Number, required: true, min: 1 },  // Quantity of the product in the order
      price: { type: Number, required: true },  // Price of the product at the time of purchase
    }
  ],
  totalAmount: { type: Number, required: true },  // Total price of the order
  paymentMethod: { type: String, required: true },  // Payment method (e.g., 'credit card', 'paypal', etc.)
  status: { type: String, enum: ['pending', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  shippingAddress: { type: String, required: true },  // Shipping address for the order
  shippingDate: { type: Date, default: null },  // Shipping date
  orderDate: { type: Date, default: Date.now },  // Date the order was placed
  trackingNumber: { type: String, default: '' },  // Tracking number for the shipment
}, {
  timestamps: true  // Adds createdAt and updatedAt fields
});

// Order model
const Order = mongoose.model('Order', orderSchema);

export default Order;
