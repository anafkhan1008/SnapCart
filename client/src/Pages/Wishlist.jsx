import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import UserContext from '../context/UserContext'
import axios from 'axios';
import Container from '@mui/material/Container'
import CartItem from '../Components/CartItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid, Button, Box } from '@mui/material';

import Footer from '../Components/Footer';
import WishListItem from '../Components/WishListItem';

function Cart() {
  const { user } = useContext(UserContext)
  const [data, setData] = useState([])


  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/wishlist/${user._id}`)
      setData(response.data)
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [user]);


  return (
    <div>
      <Navbar />
      {data.length > 0 ?
       <Container maxWidth="xl" sx={{display : 'flex' , flexDirection : 'column' , justifyContent : 'center' ,alignItems : 'center'}}>
        {data.map((item) => (
          <WishListItem item={item} />
        ))}
      </Container>
      :
      <Container>
      <Typography variant="h2" color="initial">
        No items are added in wishlist
      </Typography>

      </Container>
    }
     
    </div>
  )
}

export default Cart
