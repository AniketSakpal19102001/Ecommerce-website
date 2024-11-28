import mongoose, { Schema } from 'mongoose';  

const reviewSchema = new Schema({
  username: { type: String, required: true },
  id: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const productSchema = new Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  theme: { type: String, default: "none" }, 
  detail: { type: String, required: true },
  reviews: [reviewSchema]  
}, {
  timestamps: true 
});

const Product = mongoose.model('Product', productSchema);

export default Product;  
