import mongoose from "mongoose";
 // Import the Product model if not already imported

const { Schema } = mongoose;

const cartSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product', // Reference to the Product model
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1 // Ensure quantity is at least 1
        },
        size: {
          type: String,
          required: true,
          default: "L" // Ensure quantity is at least 1
        },
        totalPrice: {
          type: Number,
          required: true,
          default: 0 // Default to 0, but will be calculated dynamically
        }
      }
    ],
    totalAmount: {
      type: Number,
      default: 0,
      required: true
    },
}, { timestamps: true });

// Virtual for totalAmount based on items' totalPrice and product price
cartSchema.virtual('calculatedTotalAmount').get(function() {
    return this.items.reduce((acc, item) => {
      return acc + (item.quantity * (item.product.price || 0)); // Get price from populated product
    }, 0);
});
cartSchema.post('save', function() {
  this.totalAmount = this.calculatedTotalAmount;
  this.save();
});
// Pre-save hook removed since the total amount will be calculated on fetch
const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
