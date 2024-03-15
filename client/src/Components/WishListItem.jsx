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
import { SnackbarProvider, useSnackbar } from 'notistack';

const WishListItem = ({ item }) => {
  const { user, removeFromWishlist, addToWishList } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${item._id}`);
  };

  const removeWishlistItemToDB = async () => {
    console.log("hellooo delete")
    try {
      removeFromWishlist(item._id);
      const response = await axios.delete(`${base_url}/wishlist/remove`, {
        data: {
          userId: user._id,
          productId: item._id,
        },
      });
      console.log(response)
      if (response.status == 200) {
 
        enqueueSnackbar('Product removed from wishlist', { variant: 'success' });
      } else {
        throw new Error('Unexpected status code');
      }
    } catch (error) {
      addToWishList(item._id);
      console.error("Error removing product from wishlist:", error);
      enqueueSnackbar('Error removing product from wishlist', { variant: 'error' });
    }
  };

  return (
    <Card sx={{ display: 'flex', m: 2, width: '80%', flexDirection: { xs: 'column-reverse', sm: 'row' } ,justifyContent: 'space-between' }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '700px', justifyContent: 'space-between' }}>
      <CardContent sx={{ flex: '1 0 auto', cursor: 'pointer' }} onClick={handleClick}>
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
        <IconButton aria-label="remove from cart" onClick={removeWishlistItemToDB}>
          <RemoveCircleIcon />
        </IconButton>
      </Box>
    </Box>
    <CardMedia
       onClick={handleClick}
       cursor = "pointer"
      component="img"
      sx={{ width: { xs: '100%', sm: 200 } }}
      image={item.image}
      alt={item.name}
    />
  </Card>
  );
};

export default WishListItem;

