const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    userEmail: String,  // Store the user's email
    userName: String,   // Store the user's name
    cartItems: [
      {
        productName: String,
        imageUrl: String,
        rating: Number,
        price: String,
        quantity: Number,
      },
    ],
  });
  
const CartModel = mongoose.model("Cart", CartSchema);

module.exports = CartModel;
