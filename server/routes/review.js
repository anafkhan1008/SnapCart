const express = require("express");
const Product = require("../models/product");
const Review = require("../models/review");

const router = express.Router();

router.post("/products/:productId/review", async (req, res) => {
  console.log("review route hit");
  try {
    const { productId } = req.params;
    const { rating, comment, userId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    const review = new Review({ rating, comment, user: userId });

    product.reviews.push(review);

    await review.save();
    await product.save();
    res.status(200).send("Product review added");
  } catch (e) {
    res.status(500).render("error", { err: e.message });
  }
});

router.get("/products/:productId/review", async (req, res) => {
        console.log("review all hitted");
        let { productId } = req.params;
        try {
          const product = await Product.findById(productId).populate({
            path: "reviews",
            populate: { path: "user" }
          });
          res.send(product).status(200);
        } catch (error) {
          console.log(error);
          res.status(500).send("Error retrieving reviews for the product");
        }
      });
      

module.exports = router;
