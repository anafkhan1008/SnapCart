# SnapCart

SnapCart is a MERN-based eCommerce platform that enables users to buy and sell products with ease, similar to OLX. This repository contains the source code for SnapCart.

## Features

- **User Authentication**: Secure user authentication and authorization system.
- **Product Listings**: Easily list products for sale with detailed descriptions and images.
- **Search Functionality**: Intuitive search functionality to find products quickly.
- **Razorpay Integration**: Seamless integration with Razorpay payment gateway for secure transactions.
- **AWS S3 Integration**: Utilizes AWS S3 bucket for storing product images, ensuring reliability and scalability.

## Technologies Used

- MongoDB: Database for storing user and product information.
- Express.js: Web application framework for Node.js.
- React.js: JavaScript library for building user interfaces.
- Node.js: JavaScript runtime environment.
- Razorpay: Payment gateway for secure transactions.
- AWS S3: Cloud storage service for storing product images.

## Installation

1. Clone the repository:

git clone https://github.com/anafkhan1008/SnapCart.git

Install dependencies for the backend:

cd snapcart/server
npm install

Install dependencies for the frontend:
cd ../client
npm install

Create a .env file in the backend directory and add your MongoDB connection URI and Razorpay API key:

MONGODB_URI=your-mongodb-uri
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret



