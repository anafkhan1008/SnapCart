import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Box, Paper, Button, CircularProgress, TextField, Select, MenuItem } from "@mui/material";
import UserContext from "../context/UserContext";
import base_url from "../config";

function About({ userId }) {
  const [data, setData] = useState(null);
  const [editMode, setEditMode] = useState(false); // State to track edit mode
  const { user , setUser } = useContext(UserContext);
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    gender: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      const res = await axios.put(`${base_url}/user/${userId}`, formData);
      console.log("User updated successfully:", res.data.user);
      setData(res.data.user)
      setFormData(res.data.user)
      setUser(res.data.user)
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${base_url}/user?userId=${userId}`);
        setData(res.data);
        setFormData(res.data)
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    handleSubmit();
    setEditMode(false); 
  };

  return (
    <Paper elevation={1}>
      {data ? (
        <Box p={5}>
          {editMode ? ( 
           <Box>
           <TextField
             label="Username"
             name="username"
             value={formData.username}
             onChange={handleChange}
             fullWidth
             sx={{ m: '10px' }}
           />
           <TextField
             label="Email"
             name="email"
             value={formData.email}
             onChange={handleChange}
             fullWidth
             sx={{ m: '10px' }}
           />
           <Select
             label="Role"
             name="role"
             value={formData.role}
             onChange={handleChange}
             fullWidth
             sx={{ m: '10px' }}
           >
             <MenuItem value="buyer">Buyer</MenuItem>
             <MenuItem value="seller">Seller</MenuItem>
           </Select>
           <Select
             label="Gender"
             name="gender"
             value={formData.gender}
             onChange={handleChange}
             fullWidth
             sx={{ m: '10px' }}
           >
             <MenuItem value="male">Male</MenuItem>
             <MenuItem value="female">Female</MenuItem>
             <MenuItem value="other">Other</MenuItem>
           </Select>
           <Button
             variant="contained"
             onClick={handleSave}
             className="StyledButton"
             sx={{ m: '10px' }}

           >
             Save
           </Button>
         </Box>
          ) : (
            <>
              <h3>Username: {data.username}</h3>
              <h3>Email: {data.email}</h3>
              <h3>Role: {data.role}</h3>
              <h3>Gender: {data.gender}</h3>
              {user && user._id === data._id && (
                <Button variant="contained" onClick={handleEdit} className="StyledButton">Edit</Button>
              )}
            </>
          )}
        </Box>
      ) : (
        <Box p={2} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
    </Paper>
  );
}

export default About;


