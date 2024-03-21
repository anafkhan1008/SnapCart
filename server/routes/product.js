const express = require('express')
const Product = require('../models/product')
const router = express.Router()
require('dotenv').config();

const { S3Client } = require('@aws-sdk/client-s3')
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
//create a post
//image upload for s3
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId,
    secretAccessKey
  }
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'snapcart',
    acl: 'public-read',
    key: function (req, file, cb) {
      const filename = req.body.name;
      cb(null, filename);
    },
  }),
});


router.get('/all', async (req, res) => {
  try {
      let query = {};
      if (req.query.category) {
          query.category = req.query.category;
      }

      if (req.query.minPrice || req.query.maxPrice) {
          query.price = {};
          if (req.query.minPrice) {
              query.price.$gte = parseInt(req.query.minPrice);
          }
          if (req.query.maxPrice) {
              query.price.$lte = parseInt(req.query.maxPrice);
          }
      }

      const products = await Product.find(query);
      console.log(products);
      res.json(products).status(200);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/upload', upload.single('image'), async (req, res) => {
  console.log("upload route hitt")
  try {
    res.status(200).json({ imageUrl: req.file.location });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/product/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const product = await Product.findById(id)
          .populate({
              path: 'reviews',
              populate: {
                  path: 'user'
              }
          });
      res.json(product).status(200);
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Error retrieving product' });
  }
});



router.get("/products/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  
  try {
    const products = await Product.find({ author: userId });
    console.log(products)
    res.json(products).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});


router.post('/addproducts', async (req, res) => {
    console.log("add product route")
    console.log(req.body)
    try {
      const { name, image, price, category , description, author } = req.body;
    console.log(req.body)
      await Product.create({ name, image, price, category , description, author });
        
      res.sendStatus(200);
    } catch (e) {
        console.log(e)
      res.status(500);
    }
  });
  

router.get('/category/:name' , async(req , res) =>{
    const {name} = req.params;
    console.log("category route hitted")
    const products = await Product.find({category : name})
    res.json(products).status(200)
})




module.exports = router;