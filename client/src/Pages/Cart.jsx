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
import base_url from '../config';
function Cart() {
  const { user } = useContext(UserContext)
  const [data, setData] = useState([])
  const [totalPrice, setTotalPrice] = useState(0); 

  const fetchData = async () => {
    try {
      const response = await axios.get(`${base_url}/users/${user._id}/cart`)
      setData(response.data)
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [user]);

  useEffect(() => {
    if (data && data.length > 0) {
      const total = data.reduce((acc, item) => acc + item.product.price, 0);
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  }, [data]);

  return (
    <div>
      <Navbar />
      <Container maxWidth="xl">
      <Grid container spacing = {2} >
      <Grid item xs={12} md = {8} >
        {(data.length > 0 ? 
          <Container maxWidth="xl" sx={{display : 'flex' , flexDirection : 'column' , justifyContent : 'center'}}>
        {data.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </Container> :
      <Container>
      <Typography variant="h2" color="initial">
        No items added in cart
      </Typography>
      </Container>
        )}
    
      </Grid>
      <Grid item xs={12} md = {4} >
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Total Price:
            </Typography>
            <Typography variant="h6" component="div">
              ${totalPrice}
            </Typography>
            <Button variant="contained" className='StyledButton'>
              Proceed to checkout
            </Button>
          </CardContent>
        </Card>
      </Grid>
      </Grid> 
      </Container>
   
    </div>
  )
}

export default Cart
