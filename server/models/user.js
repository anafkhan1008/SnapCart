const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
  username : {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password : {
    type : String,
    trim : true,
    required : true
  },
  gender : {
    type : String,
    trim : true,
    required : true
  },
  role: {
    type: String,
    default: "buyer",
  },
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1  
      }
    }
  ]
});


let User = mongoose.model("User", userSchema);
module.exports = User;

