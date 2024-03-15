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
import { SnackbarProvider, useSnackbar } from 'notistack';
import base_url from '../config';

const CartItem = ({ item }) => {
  const theme = useTheme();
  const { user , removeFromCart , cart , addToCart} = useContext(UserContext)
  const { enqueueSnackbar } = useSnackbar();

   const prodId = item.product._id
    const userId = user._id

  const handleRemove = async() => {
    try{
      const res = await axios.delete(`${base_url}/users/${userId}/cart/remove/${prodId}`)
      removeFromCart(prodId)
      enqueueSnackbar(`${item.product.name} removed from the cart`, { variant: 'success' });
    }
    catch{
      (err)=>{
        enqueueSnackbar('Error in removing product from cart', { variant: 'error' });
        addToCart(prodId)

      }
    }
    
    if(res.status == 200)
    {
      
        console.log("Item removed from cart")
    }
  };

  return (
    <Card sx={{ display: 'flex', m : 1, maxWidth : '600px' , justifyContent : 'space-between'}}>
      <Box sx={{ display: 'flex', flexDirection: 'column' , maxWidth : '600px'}}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {item.product.name} 
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Price: ${item.product.price} 
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Quantity: {item.quantity}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="remove from cart" onClick={handleRemove}>
            <RemoveCircleIcon />
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={item.product.image} 
        alt={item.product.name} 
      />
    </Card>
  );
};

export default CartItem;
