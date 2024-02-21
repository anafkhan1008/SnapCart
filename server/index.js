const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const seedDB = require('./seed');
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth')
const cartRoutes = require('./routes/cart')
const wishlistRoutes = require('./routes/wishlist')
const cors = require('cors');


mongoose.connect('mongodb://127.0.0.1:27017/EcomGrull')
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

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});














