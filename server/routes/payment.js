const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require('crypto')
const Payment = require('../models/payment')
require("dotenv").config();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

router.post("/create-payment", async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.totalPrice * 100),
      currency: req.body.currency,
    };
    console.log(options);

    const order = await instance.orders.create(options);
    console.log(order);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/capture-payment", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;


  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.status(200).json({
        success : true,
        reference : razorpay_payment_id
    })
  } else {
    res.status(400).json({
      success: false,
    });
  }
});

module.exports = router;
