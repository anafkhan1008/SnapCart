const express = require('express')
const Product = require('../models/product')
const router = express.Router()



router.get('/all' , async (req , res)=>{
    const products = await Product.find()
    res.json(products).status(200)
})

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


router.post('/addproducts', async (req, res) => {
    console.log("add product route")
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