import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Box,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import { useParams } from "react-router-dom";
import axios from "axios";
import base_url from "../config";
import { useEffect } from "react";
import Navbar from "../Components/Navbar";
import SellerProducts from "../Components/SellerProducts";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState();

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${base_url}/user?userId=${id}`);
      setUser(res.data);
    } catch (error) {
      console.log("Error in fetching user data", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Box>
      <Navbar />
      <Box>
         {user ? (
           <Paper  sx={{display : "flex" , flexDirection : "row" , justifyContent : 'center' , background: 'linear-gradient(0deg, rgba(178,195,240,1) 0%, rgba(0,0,0,1) 100%)' }}   >
            <Box sx={{display : 'flex' , flexDirection : 'column' , alignContent : 'center' , justifyContent : 'center'}} mt={5}>
                <Avatar sx={{ width: 100, height: 100}}  alt={user.username} />
           <Typography variant="h4" sx={{m : 'auto' , color : 'white'}}>{user.username}</Typography>
            </Box>
         </Paper>
         ) 
         : "Loading"}
      
      </Box>
      <SellerProducts userId = {id} />
     
     
    </Box>
  );
};

export default Profile;
