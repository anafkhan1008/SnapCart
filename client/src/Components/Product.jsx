import React, { useContext } from "react";
import { styled } from "@mui/system";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import homeImage from "../assets/images/books.jpg";
import UserContext from "../context/UserContext";
import axios from "axios";
import base_url from "../config";

const ProductCard = styled(Card)({
  maxWidth: 360,
  margin: "auto",
  marginBottom: 20,
  borderRadius: 16,
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
});

const ProductImage = styled("img")({
  objectFit: "cover",
  width: "100%",
  height: 300,
  borderRadius: "16px 16px 0 0",
});

const StyledCardContent = styled(CardContent)({
  textAlign: "center",
});

const PriceTypography = styled(Typography)({
  whiteSpace: "nowrap",
  textDecoration: "none",
  fontWeight: "bold",
  marginTop: 10,
});

const Product = ({ id, image, price, name }) => {
  const { user, addToWishList, removeFromWishlist } = useContext(UserContext);
  const isProductInWishlist =
    user && user.wishlist && user.wishlist.includes(id);

  const navigate = useNavigate();

  const addWishlistItemToDB = async () => {
    addToWishList(id);
    const response = await axios.post(`${base_url}/wishlist/add`, {
      userId: user._id,
      productId: id,
    });
    if (response.status == 200) {
      console.log("item added to wishlist")
    }
    else{
      removeFromWishlist(id)
    }
  };

  const removeWishlistItemToDB = async () => {
    try {
      removeFromWishlist(id);
      const response = await axios.delete(`${base_url}/wishlist/remove`, {
        data: {
          userId: user._id,
          productId: id,
        }
      });
      if (response.status === 200) {
        
      }
    } catch (error) {
      console.error("Error removing wishlist item:", error);
      addToWishList(id)
    }
  };

  const handleLike = async () => {
    if (!user) {
      navigate("/signin");
    }

    if (isProductInWishlist) {
      removeWishlistItemToDB();
    } else {
      addWishlistItemToDB();
    }
  };

  return (
    <ProductCard>
      <Link to={`/product/${id}`} className="LinkNoUnderline StyleTextBlack">
        <CardActionArea>
          <ProductImage src={image ? image : "Loading"} />
          <StyledCardContent>
            <PriceTypography
              variant="h6"
              color="textPrimary"
              className="StyleTextBlack"
            >
              ${price}
            </PriceTypography>
            <PriceTypography
              variant="h6"
              color="textPrimary"
              sx={{ textDecoration: "none" }}
            >
              {name}
            </PriceTypography>
          </StyledCardContent>
        </CardActionArea>
      </Link>
      <CardActions
        sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
      >
        {user && user.wishlist.includes(id) ? (
          <IconButton aria-label="" onClick={handleLike}>
            <FavoriteIcon sx={{ color: "red" }} />
          </IconButton>
        ) : (
          <IconButton aria-label="" onClick={handleLike}>
            <FavoriteBorderIcon />
          </IconButton>
        )}
      </CardActions>
    </ProductCard>
  );
};

export default Product;
