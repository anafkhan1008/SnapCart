const mongoose = require('mongoose');
const Product = require('./models/product');

const products = 
[
    {
      "name": "Trendy T-Shirt",
      "image": "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 19.99,
      "description": "Comfortable and stylish t-shirt for casual wear.",
      "category": "Fashion"
    },
    {
      "name": "Wireless Headphones",
      "image": "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 69.99,
      "description": "High-quality wireless headphones for immersive audio experience.",
      "category": "Electronics"
    },
    {
      "name": "Modern Desk Lamp",
      "image": "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 34.99,
      "description": "Sleek and energy-efficient LED desk lamp for modern workspaces.",
      "category": "Home and Decor"
    },
    {
      "name": "Yoga Mat",
      "image": "https://images.pexels.com/photos/4325462/pexels-photo-4325462.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 24.99,
      "description": "Premium quality yoga mat for comfortable workouts.",
      "category": "Health and Wellness"
    },
    {
      "name": "Car Seat Covers",
      "image": "https://images.pexels.com/photos/4480526/pexels-photo-4480526.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 49.99,
      "description": "Durable and stylish car seat covers for added comfort and protection.",
      "category": "Automotive"
    },
    {
      "name": "Bestseller Novel",
      "image": "https://images.pexels.com/photos/4170629/pexels-photo-4170629.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 14.99,
      "description": "Engaging novel that keeps you hooked till the last page.",
      "category": "Books"
    },
    {
      "name": "Classic Leather Jacket",
      "image": "https://example.com/leather_jacket.jpg",
      "price": 89.99,
      "description": "Timeless leather jacket for a rugged yet sophisticated look.",
      "category": "Fashion"
    },
    {
      "name": "Smartphone",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 599.99,
      "description": "Cutting-edge smartphone with advanced features and performance.",
      "category": "Electronics"
    },
    {
      "name": "Cozy Throw Blanket",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 29.99,
      "description": "Soft and warm throw blanket for chilly evenings.",
      "category": "Home and Decor"
    },
    {
      "name": "Organic Green Tea",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 9.99,
      "description": "Refreshing and antioxidant-rich green tea for a healthy lifestyle.",
      "category": "Health and Wellness"
    },
    {
      "name": "Car Care Kit",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 39.99,
      "description": "Complete car care kit for maintaining your vehicle's shine and cleanliness.",
      "category": "Automotive"
    },
    {
      "name": "Bestselling Mystery Novel",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 17.99,
      "description": "Intriguing mystery novel that keeps you guessing till the end.",
      "category": "Books"
    },
    {
      "name": "Stylish Sunglasses",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 29.99,
      "description": "Fashionable sunglasses that provide UV protection.",
      "category": "Fashion"
    },
    {
      "name": "Wireless Bluetooth Speaker",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 79.99,
      "description": "Portable Bluetooth speaker for high-quality audio on the go.",
      "category": "Electronics"
    },
    {
      "name": "Decorative Wall Art",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 49.99,
      "description": "Elegant wall art to add a touch of sophistication to your home.",
      "category": "Home and Decor"
    },
    {
      "name": "Essential Oil Diffuser",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 39.99,
      "description": "Aroma diffuser for creating a relaxing and invigorating ambiance.",
      "category": "Health and Wellness"
    },
    {
      "name": "Car Phone Holder",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 14.99,
      "description": "Convenient phone holder for safe and hands-free driving.",
      "category": "Automotive"
    },
    {
      "name": "Classic Novel Collection",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 79.99,
      "description": "Collection of timeless classics that every book lover must read.",
      "category": "Books"
    },
    {
      "name": "Chic Handbag",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 49.99,
      "description": "Stylish handbag to complete your everyday look.",
      "category": "Fashion"
    },
    {
      "name": "Wireless Gaming Mouse",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 59.99,
      "description": "High-performance wireless gaming mouse for competitive gaming.",
      "category": "Electronics"
    },
    {
      "name": "Rustic Wall Clock",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 34.99,
      "description": "Vintage-inspired wall clock to add charm to your living space.",
      "category": "Home and Decor"
    },
    {
      "name": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "image": "https://example.com/fitness_tracker.jpg",
      "price": 79.99,
      "description": "Track your fitness goals with this advanced fitness tracker.",
      "category": "Health and Wellness"
    },
    {
      "name": "Car Cleaning Wipes",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 9.99,
      "description": "Convenient cleaning wipes for quick and easy car cleaning.",
      "category": "Automotive"
    },
    {
      "name": "Cookbook",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 24.99,
      "description": "Collection of delicious recipes for every occasion.",
      "category": "Books"
    },
    {
      "name": "Sleek Wristwatch",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 99.99,
      "description": "Classic wristwatch with a sleek design for everyday wear.",
      "category": "Fashion"
    },
    {
      "name": "Smart Home Speaker",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 129.99,
      "description": "Voice-controlled smart speaker for home automation and entertainment.",
      "category": "Electronics"
    },
    {
      "name": "Cushion Covers Set",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 19.99,
      "description": "Set of decorative cushion covers to refresh your living room decor.",
      "category": "Home and Decor"
    },
    {
      "name": "Herbal Supplements",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 29.99,
      "description": "Natural herbal supplements for overall health and well-being.",
      "category": "Health and Wellness"
    },
    {
      "name": "Car Air Freshener",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 4.99,
      "description": "Long-lasting car air freshener for a fresh and pleasant driving experience.",
      "category": "Automotive"
    },
    {
      "name": "Travel Guidebook",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 19.99,
      "description": "Comprehensive travel guidebook for exploring your dream destinations.",
      "category": "Books"
    },
    {
      "name": "Designer Sunglasses",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 149.99,
      "description": "Luxurious designer sunglasses to elevate your style.",
      "category": "Fashion"
    },
    {
      "name": "Gaming Console",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 299.99,
      "description": "Next-gen gaming console for immersive gaming experiences.",
      "category": "Electronics"
    },
    {
      "name": "Wall Mirror",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 59.99,
      "description": "Stylish wall mirror to enhance the aesthetics of your home.",
      "category": "Home and Decor"
    },
    {
      "name": "Natural Supplements",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 39.99,
      "description": "Premium quality natural supplements for a healthier lifestyle.",
      "category": "Health and Wellness"
    },
    {
      "name": "Car Dashboard Camera",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 79.99,
      "description": "Dashcam for recording your driving journey and ensuring safety.",
      "category": "Automotive"
    },
    {
      "name": "Cooking Encyclopedia",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 49.99,
      "description": "Comprehensive cooking encyclopedia with recipes and techniques.",
      "category": "Books"
    },
    {
      "name": "Designer Handbag",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 299.99,
      "description": "Luxurious designer handbag for the fashion-forward.",
      "category": "Fashion"
    },
    {
      "name": "4K Ultra HD TV",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 999.99,
      "description": "Immersive 4K Ultra HD TV for an unparalleled viewing experience.",
      "category": "Electronics"
    },
    {
      "name": "Indoor Plant",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 24.99,
      "description": "Lush indoor plant to bring a touch of nature into your home.",
      "category": "Home and Decor"
    },
    {
      "name": "Fitness Equipment Set",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 149.99,
      "description": "Complete fitness equipment set for home workouts.",
      "category": "Health and Wellness"
    },
    {
      "name": "Car Wash Kit",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 29.99,
      "description": "Comprehensive car wash kit for a professional clean.",
      "category": "Automotive"
    },
    {
      "name": "Fantasy Novel Series",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 69.99,
      "description": "Captivating fantasy novel series for fans of epic adventures.",
      "category": "Books"
    },
    {
      "name": "Stylish Sneakers",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 79.99,
      "description": "Fashionable sneakers for a casual and trendy look.",
      "category": "Fashion"
    },
    {
      "name": "Smartwatch",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 199.99,
      "description": "Feature-packed smartwatch for tracking fitness and staying connected.",
      "category": "Electronics"
    },
    {
      "name": "Wall Art Prints Set",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 39.99,
      "description": "Set of artistic wall art prints to adorn your living space.",
      "category": "Home and Decor"
    },
    {
      "name": "Weight Loss Supplements",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 49.99,
      "description": "Natural supplements to support your weight loss journey.",
      "category": "Health and Wellness"
    },
    {
      "name": "Car Cleaning Brush",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 9.99,
      "description": "Durable cleaning brush for thorough car cleaning.",
      "category": "Automotive"
    },
    {
      "name": "Self-Help Book",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 14.99,
      "description": "Empowering self-help book for personal growth and development.",
      "category": "Books"
    },
    {
      "name": "Classic Leather Belt",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 39.99,
      "description": "Timeless leather belt to complement your outfits.",
      "category": "Fashion"
    },
    {
      "name": "Wireless Earbuds",
      "image": "https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&w=600",
      "price": 129.99,
      "description": "High-fidelity wireless earbuds for immersive audio experience.",
      "category": "Electronics"
    }
  ]
  

  

async function seedDB(){
    // await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("data seeded successfully")
}

module.exports = seedDB;