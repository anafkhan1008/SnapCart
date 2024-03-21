import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  IconButton,
  Rating,
} from "@mui/material";
import { SnackbarProvider, useSnackbar } from "notistack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Navbar from "../Components/Navbar";
import axios from "axios";
import UserContext from "../context/UserContext";
import Footer from "../Components/Footer";
import base_url from "../config";
import Comments from "../Components/Comments";

import AddComment from "../Components/AddComment";
const Product = () => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { user, addToCart, removeFromCart, addToWishList, removeFromWishlist } =
    useContext(UserContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [value, setValue] = useState(2);
  const isProductInCart = user && user.cart && user.cart.includes(id);
  const isProductInWishlist =
    user && user.wishlist && user.wishlist.includes(id);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState([]);

  const navigate = useNavigate();

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
  };

  const addToDBCart = async () => {
    try {
      addToCart(id);
      const response = await axios.post(
        `${base_url}/users/${user._id}/cart/add`,
        { productId: id, quantity }
      );
      if (response.status === 200) {
        enqueueSnackbar("Product added to cart", { variant: "info" });
      } else {
        throw new Error("Unexpected status code");
      }
    } catch (error) {
      removeFromCart(id);
      console.error("Error adding product to cart:", error);
      enqueueSnackbar("Error adding product to cart", { variant: "warning" });
    }
  };

  const removeFromCartDB = async () => {
    try {
      removeFromCart(id);
      const res = await axios.delete(
        `${base_url}/users/${user._id}/cart/remove/${id}`
      );
      if (res.status === 200) {
        enqueueSnackbar("Product removed from cart", { variant: "warning" });
      } else {
        throw new Error("Unexpected status code");
      }
    } catch (error) {
      addToCart(id);
      console.error("Error removing product from cart:", error);
      enqueueSnackbar("Error removing product from cart", { variant: "error" });
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
        enqueueSnackbar("Product added to wishlist", { variant: "info" });
      } else {
        throw new Error("Unexpected status code");
      }
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      removeFromWishlist(id);
      enqueueSnackbar("Error adding product to wishlist", { variant: "error" });
    }
  };

  const removeWishlistItemToDB = async () => {
    try {
      removeFromWishlist(id);
      const response = await axios.delete(`${base_url}/wishlist/remove`, {
        data: {
          userId: user._id,
          productId: id,
        },
      });
      if (response.status === 200) {
        enqueueSnackbar("Product removed from wishlist", {
          variant: "success",
        });
      } else {
        throw new Error("Unexpected status code");
      }
    } catch (error) {
      addToWishList(id);
      console.error("Error removing product from wishlist:", error);
      enqueueSnackbar("Error removing product from wishlist", {
        variant: "error",
      });
    }
  };

  const handleSeller = () => {
    navigate(`/user/${product.author}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}/product/${id}`);
        setProduct(response.data);
        setReview(response.data.reviews);
        const totalRating = review.reduce(
          (acc, review) => acc + review.rating,
          0
        );
        setRating(totalRating / review.length);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchData();
  }, [product]);

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
                src={product?.image || " "}
                alt={product?.name || " "}
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
                {product?.name || " "}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Price: ${product?.price || " "}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {product?.description ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
              </Typography>
              <Rating name="read-only" value={rating} readOnly />
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
              {user && user._id ? (
                <Box
                  sx={{ display: "flex", flexDirection: "row", width: "100%" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    className="StyledButton"
                    sx={{ mr: 1, mt: 1, textWrap: "nowrap" }}
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
                    sx={{ mr: 1, mt: 1, textWrap: "nowrap" }}
                    onClick={handleWishlist}
                  >
                    {user && user.wishlist && user.wishlist.includes(id)
                      ? "Remove from wishlist"
                      : "Add to wishlist"}
                  </Button>
                </Box>
              ) : (
                ""
              )}

              <Button
                variant="contained"
                color="primary"
                className="StyledButton"
                sx={{ mr: 1, mt: 1, textWrap: "nowrap", borderRadius: "20px" }}
                onClick={handleSeller}
              >
                {product && product.author ? "View seller" : ""}
              </Button>
            </Box>
          </Grid>
          <Box>
            {user && user._id ? (
              <>
                <AddComment data={{ prodId: id, user }} />
                <Comments reviews={review} />
              </>
            ) : (
              <Comments reviews={review} />
            )}
          </Box>
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
