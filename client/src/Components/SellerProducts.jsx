import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import axios from 'axios';
import base_url from '../config';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({  }) => ({
    borderRadius: '10px',
    textAlign: 'center',
    position: 'relative', 
    color: '#fff', 
    fontSize : '32px',
    fontWeight: 'bold', 
    zIndex: 1,
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center', 

}));

export default function SellerProducts({ userId }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
 

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${base_url}/products/user/${userId}`);
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

 

  return (
    <Container sx={{ flexGrow: 1 , marginTop : '20px' , justifyContent : 'center'}}>
      <h2>All products</h2>
      <Grid container spacing={2}>
        {products.map((product, index) => (
         <Grid key={index} item xs={6} sm={3}>
         <Item sx={{ 
           height: 200, 
           backgroundImage: `url(${product.image})`,
           backgroundSize: 'cover', 
           backgroundPosition: 'center', 
           cursor : 'pointer'
         }} onClick={()=>{ navigate(`/product/${product._id}`)}} >
           {product.name}
         </Item>
       </Grid>
        ))}
      </Grid>
    </Container>
  );
}
