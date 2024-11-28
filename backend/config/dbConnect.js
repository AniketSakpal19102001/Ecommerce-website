import mongoose from "mongoose";
import config from "./config.js";
async function connectDB(){
mongoose.connect(config.dbUrl).then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
}

export default connectDB;