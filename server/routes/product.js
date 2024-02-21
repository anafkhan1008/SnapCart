const express = require('express')
const Product = require('../models/product')
const router = express.Router()



router.get('/all' , async (req , res)=>{

    const products = await Product.find()
    res.json(products).status(200)

})

router.get('/product/:id' , async (req , res)=>{
    const {id} = req.params;
    try{
        const product = await Product.findById(id)
        res.json(product).status(200)
    }
    catch{(err)=>{
        console.log(err)
    }}

})

router.get('/category/:name' , async(req , res) =>{
    const {name} = req.params;
    console.log("category route hitted")
    const products = await Product.find({category : name})
    res.json(products).status(200)
})


module.exports = router;