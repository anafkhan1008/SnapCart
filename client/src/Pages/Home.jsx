import React, { useContext, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import { Box, Typography, Container, Grid } from '@mui/material';
import Category from '../Components/Category';
import fashionImage from '../assets/images/fashion.jpg';
import electronicsImage from '../assets/images/electronics.jpg';
import decorImage from '../assets/images/decor.jpg';
import healthImage from '../assets/images/health.jpg';
import carImage from '../assets/images/automotive.jpg';
import bookImage from '../assets/images/books.jpg';
import UserContext from '../context/UserContext';

import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import Footer from '../Components/Footer';


function Home() {
  const {user , setUser } = useContext(UserContext)

  
  return (
    <Box>
      <Navbar />
      <Hero />
      <Box sx={{m : 2 , display : 'flex' , justifyContent : 'center'}} >
        <Typography sx={{fontFamily : 'Chakra Petch' , fontWeight : 700 , fontSize : '33px'}} >
        Shop by category ,  {user ? user.username : ""}
      </Typography>
      </Box>
      
     
      <Container maxWidth="lg" sx={{margin : 'auto'}}  >
      <Grid container spacing={3} sx={{margin : 'auto'}}>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <Category data={{ image: fashionImage, name: "Fashion" }} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <Category data={{ image: electronicsImage, name: "Electronics" }} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <Category data={{ image: decorImage, name: "Home and Decor" }} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <Category data={{ image: healthImage, name: "Health and Wellness" }} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <Category data={{ image: carImage, name: "Automotive" }} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <Category data={{ image: bookImage, name: "Books" }} />
        </Grid>
      </Grid>
    </Container>
    <Footer/>
    </Box>
  );
}

export default Home;
