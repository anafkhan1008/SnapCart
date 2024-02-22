import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Grid } from '@mui/material';
import HeroImage from "../assets/images/home3.jpg"
import axios from 'axios';
import Product from '../Components/Product';
import Footer from '../Components/Footer';
import base_url from '../config';

function Category() {
  const { name } = useParams();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${base_url}/category/${name}`);
      setData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          backgroundColor: '#f4f4f4',
          padding: '50px 0',
          textAlign: 'center',
          backgroundImage: `url(${HeroImage})`,
          marginBottom : 3
        }}
      >
        <Container maxWidth="md" sx={{color : 'white'}}>
          <Typography variant="h2" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            vehicula, nisi ac posuere sodales, augue nisi tincidunt quam, nec
            pharetra enim urna eu eros. Morbi tincidunt aliquet lacus id
            cursus.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
          <Grid container spacing={3}>
            {data.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                <Product
                  id = {item._id}
                  image={item.image}
                  price={item.price}
                  name = {item.name}
                  description={item.description}
                />
              </Grid>
            ))}
          </Grid>
        </Container>

    <Footer/>
    </div>
  );
}

export default Category;
