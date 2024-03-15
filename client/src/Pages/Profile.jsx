import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { useParams } from "react-router-dom";
import axios from "axios";
import base_url from "../config";
import { useEffect } from "react";
import Navbar from "../Components/Navbar";

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
      <Box sx={{}} >

      </Box>
      <Container maxWidth="md">
         {user ? (
           <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
           <Avatar sx={{ width: 100, height: 100 }}  alt={user.username} />
           <Typography variant="h4" mt={2}>{user.username}</Typography>
           <Typography variant="body1" mt={1}>{user.email}</Typography>
           <Box mt={3}>
             <Button variant="contained" color="primary">Edit Profile</Button>
           </Box>
         </Box>
         
         
         ) 


         
         
         
         
         
         : "Loading"}
      </Container>
     
    </Box>
  );
};

export default Profile;
