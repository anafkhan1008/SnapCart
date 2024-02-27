const express = require('express');
const app = express();
const mongoose = require('mongoose');
const seedDB = require('./seed');
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth')
const cartRoutes = require('./routes/cart')
const wishlistRoutes = require('./routes/wishlist')
const cors = require('cors');
// const PORT = 5000;
require('dotenv').config();


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('DB connected');
    })
    .catch((err) => {
        console.log('Error in connecting to DB', err);
    });



app.use(express.json())
app.use(cors());
 

app.use(productRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(wishlistRoutes)

app.listen(process.env.PORT, () => {
    console.log(`App is listening on port ${process.env.PORT}`);
});














