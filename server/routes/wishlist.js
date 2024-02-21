

const express = require("express");
const User = require("../models/user");
const router = express.Router();



router.post("/wishlist/add", async (req, res) => {
  const { userId, productId } = req.body;
  console.log(userId , productId)
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }
    user.wishlist.push(productId);
    await user.save();
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.delete("/wishlist/remove", async (req, res) => {
  const { userId, productId } = req.body;
  console.log(userId , productId)
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const index = user.wishlist.indexOf(productId);
    if (index === -1) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }
    user.wishlist.splice(index, 1);
    await user.save();
    res.json(user.wishlist).status(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/wishlist/:userId", async (req, res) => {
  const userId = req.params.userId;
  console.log(userId)
  try {
    const user = await User.findById(userId).populate("wishlist");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
