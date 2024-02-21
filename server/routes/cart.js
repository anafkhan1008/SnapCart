const express = require("express");
const User = require("../models/user");
const Product = require("../models/product");
const router = express.Router();


router.post("/users/:userId/cart/add", async (req, res) => {
  console.log("add cart route hitt")
  const { userId } = req.params;
  const { productId , quantity } = req.body;
  console.log(productId , userId , quantity)
  try {
    const user = await User.findById(userId);
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await Product.findById(productId);
    console.log(product)
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newCart = {product : productId , quantity : quantity}

    user.cart.push(newCart);
    await user.save();
    res.status(200).json(user.cart);
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message });
  }
});


router.delete("/users/:userId/cart/remove/:productId", async (req, res) => {
  const { userId, productId } = req.params;
  console.log( userId , productId )
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(user)

      const index = user.cart.findIndex((item) => item.product == productId);
      console.log(index)
    if (index === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    user.cart.splice(index, 1);
    await user.save();
    res.json(user.cart).status(200);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/users/:userId/cart", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("cart.product");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
