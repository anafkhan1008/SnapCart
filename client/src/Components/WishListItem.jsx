import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import UserContext from '../context/UserContext'
import { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import base_url from '../config';


const WishListItem = ({ item }) => {
  const theme = useTheme();
  const { user , removeFromWishlist , cart } = useContext(UserContext)

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${item._id}`);
  };

  const removeWishlistItemToDB = async () => {
    try {
      const response = await axios.delete(`${base_url}/wishlist/remove`, {
        data: {
          userId: user._id,
          productId: item._id,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        removeFromWishlist(item._id);
        console.log("Product removed from wishlist");
      }
    } catch (error) {
      console.error("Error removing wishlist item:", error);
    }
  };
  

  return (
    
    <Card sx={{ display: 'flex', m : 1, maxWidth : '600px' , justifyContent : 'space-between'}}>
      <Box sx={{ display: 'flex', flexDirection: 'column' , maxWidth : '600px'}}>
        <CardContent sx={{ flex: '1 0 auto' , cursor : 'pointer' }} onClick={handleClick}>
          <Typography component="div" variant="h5">
            {item.name} 
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Price: ${item.price} 
          </Typography>
          <Typography variant="subtitle3" color="text.secondary" component="div">
            {item.description} 
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="remove from cart" onClick={removeWishlistItemToDB} >
            <RemoveCircleIcon />
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={item.image} 
        alt={item.name} 
      />
    </Card>
    
  );
};

export default WishListItem;
