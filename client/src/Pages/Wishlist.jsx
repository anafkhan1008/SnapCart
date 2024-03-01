import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import UserContext from '../context/UserContext';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import WishListItem from '../Components/WishListItem';
import base_url from '../config';

function Wishlist() {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);


  const fetchData = async () => {
    try {
      const response = await axios.get(`${base_url}/wishlist/${user._id}`);
      setData(response.data);
      console.log(response)
    } catch (error) {
      console.error('Error fetching wishlist data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user , data]);

  return (
    <div>
      <Navbar />
      <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        { 
         data.length > 0 ? (
          data.map((item) => <WishListItem key={item._id} item={item} />)
        ) : (
          <Typography variant="h2" color="initial">
            No items are added in wishlist
          </Typography>
        )}
      </Container>
    </div>
  );
}

export default Wishlist;
