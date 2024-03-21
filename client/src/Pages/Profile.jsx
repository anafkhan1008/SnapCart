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

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { styled } from "@mui/system";
import { useParams } from "react-router-dom";
import axios from "axios";
import base_url from "../config";
import { useEffect } from "react";
import Navbar from "../Components/Navbar";
import SellerProducts from "../Components/SellerProducts";
import UserContext from "../context/UserContext";
import { useContext } from "react";
import About from "../Components/About";

const Profile = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const { user } = useContext(UserContext);

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${base_url}/user?userId=${id}`);
      setData(res.data);
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
        {data ? (
          <Paper
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              background:
                "linear-gradient(0deg, rgba(178,195,240,1) 0%, rgba(0,0,0,1) 100%)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                justifyContent: "center",
              }}
              mt={5}
            >
              <Avatar
                sx={{ width: 100, height: 100, margin: 'auto' }}
                alt={user.username}
              />

              {user && user._id === data._id ? (
                <Typography variant="h4" sx={{ m: "auto", color: "white" }}>
                  {user.username}
                </Typography>
              ) : (
                <Typography variant="h4" sx={{ m: "auto", color: "white" }}>
                  {data.username}
                </Typography>
              )}
            </Box>
          </Paper>
        ) : (
          "Loading"
        )}
      </Box>
      <Container maxWidth="lg">
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} indicatorColor='secondary' textColor="black" aria-label="lab API tabs example">
              <Tab label="About"  textColor="black" value="1" />
              <Tab label="All products" value="2" />
              <Tab label="Item Three" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <About userId={id} />
          </TabPanel>
          <TabPanel value="2">
            <SellerProducts userId={id} />
          </TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Container>
    </Box>
  );
};

export default Profile;
