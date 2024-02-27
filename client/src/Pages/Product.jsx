import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import { SnackbarProvider, useSnackbar } from 'notistack';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import homeImage from "../assets/images/home2.jpg";
import Navbar from "../Components/Navbar";
import axios from "axios";
import UserContext from "../context/UserContext";
import Footer from "../Components/Footer";
import base_url from "../config";

const Product = () => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { user, addToCart, removeFromCart, addToWishList, removeFromWishlist } = useContext(UserContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1)

  const isProductInCart = user && user.cart && user.cart.includes(id);
  const isProductInWishlist = user && user.wishlist && user.wishlist.includes(id);

  const handleCart = () => {
    if (!isProductInCart) {
      addToDBCart();
    } else {
      removeFromCartDB();
    }
  };

  const handleWishlist = () => {
    if (!isProductInWishlist) {
      addWishlistItemToDB();
    } else {
      removeWishlistItemToDB();
    }
  }

  const addToDBCart = async () => {
    try {
      addToCart(id);
      const response = await axios.post(
        `${base_url}/users/${user._id}/cart/add`,
        { productId: id, quantity }
      );
      if (response.status === 200) {
        enqueueSnackbar('Product added to cart', { variant: 'info' });
      }
      else{
        throw new Error('Unexpected status code');
      }
    } catch (error) {
      removeFromCart(id)
      console.error("Error adding product to cart:", error);
      enqueueSnackbar('Error adding product to cart', { variant: 'warning' });
    }
  };

  const removeFromCartDB = async () => {
    try {
      removeFromCart(id);
      const res = await axios.delete(
        `${base_url}/users/${user._id}/cart/remove/${id}`
      );
      if (res.status === 200) {
        enqueueSnackbar('Product removed from cart', { variant: 'warning' });
      }
      else{
        throw new Error('Unexpected status code');
      }
    } catch (error) {
        addToCart(id)
      console.error("Error removing product from cart:", error);
      enqueueSnackbar('Error removing product from cart', { variant: 'error' });
    }
  };

  const addWishlistItemToDB = async () => {
    try {
      addToWishList(id);
      const response = await axios.post(`${base_url}/wishlist/add`, {
        userId: user._id,
        productId: id,
      });
      if (response.status === 200) {
        enqueueSnackbar('Product added to wishlist', { variant: 'info' });
      } else {
        throw new Error('Unexpected status code');
      }
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      removeFromWishlist(id);
      enqueueSnackbar('Error adding product to wishlist', { variant: 'error' });
    }
  };
  

  const removeWishlistItemToDB = async () => {
    try {
      removeFromWishlist(id);
      const response = await axios.delete(
        `${base_url}/wishlist/remove`,
        {
          data: {
            userId: user._id,
            productId: id,
          },
        }
      );
      if (response.status === 200) {
        enqueueSnackbar('Product removed from wishlist', { variant: 'success' });
      }
      else{
        throw new Error('Unexpected status code');
      }
    } catch (error) {
      addToWishList(id)
      console.error("Error removing product from wishlist:", error);
      enqueueSnackbar('Error removing product from wishlist', { variant: 'error' });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchData();
  }, [id]);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };


  return (
    <Box sx={{ color: "black" }}>
      <Navbar />
      <Container
        maxWidth="xl"
        sx={{ marginTop: "50px", display: "flex", justifyContent: "center" }}
      >
        <Grid container sx={{ p: "20px" }}>
          <Grid item xs={12} md={6} sx={{ padding: "20px" }}>
            <Box sx={{}}>
              <Typography variant="h5" color="initial">
                {product ? product.category : "category"}
              </Typography>
              <img
                src={product?.image || homeImage}
                alt={product?.name || "Product Image"}
                style={{ width: "100%", maxHeight: "700px" }}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ textAlign: "left", maxWidth: "400px" }}>
              <Typography variant="h4" gutterBottom>
                {product?.name || "Sample Product"}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Price: ${product?.price || 19.99}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {product?.description ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={decreaseQuantity} variant="outlined">
                  <RemoveIcon />
                </IconButton>
                <Typography variant="body1" sx={{ margin: "0 10px" }}>
                  {quantity}
                </Typography>
                <IconButton onClick={increaseQuantity} variant="outlined">
                  <AddIcon />
                </IconButton>
              </Box>
              <Button
                variant="contained"
                color="primary"
                className="StyledButton"
                sx={{ mr: 2, mt: 2 }}
                onClick={handleCart}
              >
                {user && user.cart && user.cart.includes(id)
                  ? "Remove from Cart"
                  : "Add to Cart"}
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="StyledButton"
                sx={{ mr: 2, mt: 2 }}
                onClick={handleWishlist}
              >
                {user && user.wishlist && user.wishlist.includes(id)
                  ? "Remove from wishlist"
                  : "Add to wishlist"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
      
    </Box>
  );
};

const ProductWithSnackbar = () => (
  <SnackbarProvider maxSnack={3}>
    <Product />
  </SnackbarProvider>
);

export default ProductWithSnackbar;

