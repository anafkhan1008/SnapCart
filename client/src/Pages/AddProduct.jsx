import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import base_url from "../config";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Box, MenuItem, Select, FormControl, InputLabel , IconButton } from "@mui/material";
import { Label, Room, EmojiEmotions, Cancel } from "@mui/icons-material";
export default function AddProduct() {
  const { user } = useContext(UserContext);
  const [file , setFile] = React.useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: "",
    category: "",
    price: "",
    image: "", 
    description: "",
    author: user._id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file selection for image upload
  const handleImageChange = async(e) => {
    const file = e.target.files[0];
    setFile(file);
    const filename = Date.now() + "-" + file.name;

    const data = new FormData();
    data.append("name" , filename);
    data.append("image", file);
    data.append('Content-Type' , 'image/png')

    try {
      const res = await axios.post(`${base_url}/upload` , data ,  { headers: {'Content-Type': 'multipart/form-data'}})
       setFormData((prevData) => ({
      ...prevData,
      image: res.data.imageUrl,
    }));

    } catch (error) {
      console.log(error)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${base_url}/addproducts`, formData);

      setFormData({
        name: "",
        category: "",
        price: "",
        image: "", 
        description: "",
        author: user._id,
      });

    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <Box>
      <Navbar />
      <Container maxWidth="md" >
        <form onSubmit={handleSubmit} >
          <Grid container spacing={3} m={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="category-label">Select category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category-select"
                  value={formData.category}
                  label="Category"
                  onChange={handleChange}
                  name="category"
                >
                  <MenuItem value="Electronics">Electronics</MenuItem>
                  <MenuItem value="Home and Decor">Home and Decor</MenuItem>
                  <MenuItem value="Fashion">Fashion</MenuItem>
                  <MenuItem value="Health and Wellness">Health and Wellness</MenuItem>
                  <MenuItem value="Automotive">Automotive</MenuItem>
                  <MenuItem value="Books">Books</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                name="price"
                label="Price"
                type="number"
                value={formData.price}
                onChange={handleChange}
              />
            </Grid>
            {file && (
            <Grid container alignItems="center" sx={{padding : '20px'}} >
              <Grid item>
                <img
                  className="shareImg"
                  src={URL.createObjectURL(file)}
                  alt=""
                  style={{ maxWidth: '600px', height: 'auto' }}
                />
              </Grid>
              <Grid item>
                <IconButton onClick={() => setFile(null)}>
                  <Cancel  />
                </IconButton>
              </Grid>
            </Grid>
          )}
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="description"
                label="Description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sx={{margin : 'auto'}} >
              <Button type="submit" variant="contained" color="primary" className="StyledButton" >
                Add Product
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
}
