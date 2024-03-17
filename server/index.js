const express = require('express');
const app = express();
const mongoose = require('mongoose');
const seedDB = require('./seed');
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth')
const cartRoutes = require('./routes/cart')
const wishlistRoutes = require('./routes/wishlist')
const paymentRoutes = require('./routes/payment')
const reviewRoutes = require('./routes/review')

const AWS = require('aws-sdk');

require('aws-sdk/lib/maintenance_mode_message').suppress = true;

const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 4000

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('DB connected');
    })
    .catch((err) => {
        console.log('Error in connecting to DB', err);
    });

const s3 = new AWS.S3();


app.use(express.json())
app.use(cors());
 

app.use(productRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(wishlistRoutes);
app.use(reviewRoutes);
app.use(paymentRoutes)

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});














