import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { Box, Container, Grid, Slider, Typography, MenuItem, Select, FormControl, InputLabel, Paper } from '@mui/material';
import Product from '../Components/Product';
import axios from 'axios';
import base_url from '../config';

function AllProducts() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]); // Default price range

  const fetchData = async () => {
    let url = `${base_url}/all`;
    if (category || priceRange[0] !== 0 || priceRange[1] !== 1000) {
      url += '?';
      if (category) url += `category=${category}&`;
      if (priceRange[0] !== 0) url += `minPrice=${priceRange[0]}&`;
      if (priceRange[1] !== 1000) url += `maxPrice=${priceRange[1]}&`;
    }
    const res = await axios.get(url);
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [category, priceRange]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Box>
      <Navbar />
        <Box m={3} >
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Paper elevation={1} sx={{borderRadius : '20px' , background : ' linear-gradient(0deg, rgba(178,188,217,1) 0%, rgba(255,255,255,1) 100%) ' }} >
              <Box p={5}>
                <Box mt={5}>
                  <Typography variant="h6" gutterBottom>Price Range</Typography>
                  <Slider
                    value={priceRange}
                    sx={{color : 'black'}}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={100}
                    max={1000}
                    step={10}
                  />
                </Box>
                <Box mt={3}>
                  <Typography variant="h6" gutterBottom>Category</Typography>
                  <FormControl fullWidth>
                    <Select
                      labelId="category-select-label"
                      id="category-select"
                      value={category}
                      onChange={handleCategoryChange}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="Electronics">Electronics</MenuItem>
                      <MenuItem value="Fashion">Fashion</MenuItem>
                      <MenuItem value="Home and Decor">Home and Decor</MenuItem>
                      <MenuItem value="Books">Books</MenuItem>
                      <MenuItem value="Health and Wellness">Health and Wellness</MenuItem>
                      <MenuItem value="Automotive">Automotive</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>
              {data.map((item) => (
                <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
                  <Product
                    id={item._id}
                    image={item.image}
                    price={item.price}
                    name={item.name}
                    description={item.description}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
 </Box>
    </Box>
  );
}

export default AllProducts;
